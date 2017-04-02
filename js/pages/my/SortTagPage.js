import React, { Component } from 'react';
import {
    StyleSheet,
    Navigator,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Alert,
} from 'react-native';
import ArrayUtils from '../../util/ArrayUtils';
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import CustomTagPage from './CustomTagPage';
import NavigationBar from '../../common/NavigationBar';
import SortableListView from 'react-native-sortable-listview';
import ViewUtils from '../../util/ViewUtils';
export default class SortTagPage extends Component {
    constructor(props) {
        super(props);
        this.dataArray = [];
        this.sortedResultArray = [];
        this.originalSortedArray = [];
        this.state = {
            sortedArray:[],
        }
    }
    componentDidMount(){
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.loadData();
    }
    loadData(){
        this.languageDao.fetch()
            .then(result=>{
                this.getCheckedItems(result);
            })
            .catch(err=>{
                console.log(err);
            });
    }
    getCheckedItems(result){
        this.dataArray=result;
        let sortedArray = [];
        result.forEach((curVal)=>{
            if(curVal.checked) sortedArray.push(curVal);
        })
        this.setState({
            sortedArray:sortedArray
        })
        this.originalSortedArray = ArrayUtils.clone(sortedArray);
    }
    onSave(isChecked){
        if(!isChecked && ArrayUtils.isEqual(this.originalSortedArray, this.state.sortedArray))
            return;
        this.getSortedResult();
        this.languageDao.save(this.sortedResultArray);
        this.props.navigator.pop();
    }
    getSortedResult(){
        this.sortedResultArray = ArrayUtils.clone(this.dataArray);
        for(let i = 0; i < this.state.sortedArray.length; ++i){
            let item = this.originalSortedArray[i];
            let idx = this.dataArray.indexOf(item);
            this.sortedResultArray.splice(idx, 1, this.state.sortedArray[i]);
        }
    }
    onBack(){
        if(ArrayUtils.isEqual(this.originalSortedArray, this.state.sortedArray)){
            this.props.navigator.pop();
            return;
        } 
        Alert.alert(
            'Tips',
            'Save the modifications?',
            [
                {text:'Cancel', onPress:()=>{this.props.navigator.pop()}, style:'cancel'},
                {text:'OK', onPress:()=>{this.onSave(true)}}
            ]
        )
    }
    render() {
        
        let rightButton = <TouchableOpacity
                            onPress={()=>this.onSave(false)}>
                            <View style={{margin:10}}>
                                <Text style={styles.tips}>Save</Text>
                            </View>
                        </TouchableOpacity>
        return  <View style={styles.container}>        
                    <NavigationBar 
                        title="SortTag"
                        leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                        rightButton={rightButton}
                    />
                    <SortableListView
                        style={{flex:1}}
                        data={this.state.sortedArray}
                        order={Object.keys(this.state.sortedArray)}
                        onRowMoved={e => {
                            let tmpArray = this.state.sortedArray;
                            tmpArray.splice(e.to, 0, tmpArray.splice(e.from, 1)[0]);
                            this.setState({
                                sortedArray:tmpArray,
                            })
                        }}
                        renderRow={row => <SortCell data={row} />}
                    />
                </View> 
    }
}
class SortCell extends Component{
    render(){
        return <TouchableHighlight
            underlayColor={'#eee'}
            delayLongPress={200} 
            style={styles.item}
            {...this.props.sortHandlers}>
            <View style={{flex:1,flexDirection:'row'}}>
                <Image style={styles.image} 
                    source={require('../../../res/images/ic_sort.png')}/>    
                <Text style={styles.text}>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tips: {
        fontSize: 18,
    },
    item:{
        padding: 15,
        backgroundColor: "#F8F8F8",
        borderBottomWidth:1, 
        borderColor: '#eee',
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
    },
    text:{
        fontSize:16,
        color:'#2196F3',
    },
    image:{
        tintColor:'#2196F3',
        height:16,
        width:16,
        marginRight:10,
    },
    title:{
        fontSize:20,
    }
});