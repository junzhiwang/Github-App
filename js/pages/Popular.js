import React, { Component } from 'react';
import {
    StyleSheet,
    Navigator,
    Text,
    View,
    TextInput,
    ListView,
    RefreshControl,
} from 'react-native';
import ScrollableTabView,{ScrollableTabBar,} from 'react-native-scrollable-tab-view';
import NavigationBar from '../common/NavigationBar';
import HomePage from './HomePage';
import DataRepository from '../expand/dao/DataRepository';
import RepositoryCell from '../common/ReposityoryCell'
const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars';
export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            result:'',
        };
    }
    render() {
        return  <View style={styles.container}>        
                    <NavigationBar 
                        title="Hot"
                    />
                    <ScrollableTabView
                        tabBarBackgroundColor='#2196F3'
                        tabBarInactiveTextColor='mintcream'
                        tabBarActiveTextColor='white'
                        tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
                        initialPage={0}
                        renderTabBar={() => <ScrollableTabBar />}
                    >
                        <PopularTab tabLabel='Java'>Java</PopularTab>
                        <PopularTab tabLabel='JavaScript'>JavaScript</PopularTab>
                        <PopularTab tabLabel='iOS'>iOS</PopularTab>
                        <PopularTab tabLabel='Android'>Android</PopularTab>
                    </ScrollableTabView>
                </View>  
    }
}
class PopularTab extends Component{
    constructor(props) {
      super(props);
      this.dataRepository = new DataRepository();
      this.state = {
         result:'',
         isLoading:false,
         dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
      };
    }
    renderRow(data){
        return <RepositoryCell data={data} />
    }
    render(){
        return <View style={{flex:1}}>
            <ListView 
                dataSource={this.state.dataSource}
                renderRow={(data)=>this.renderRow(data)}
                refreshControl={
                    <RefreshControl
                        tintColor='#2196F3'
                        colors={['#2196F3']}
                        title='Loading'
                        refreshing={this.state.isLoading}
                        onRefresh={()=>this.loadData()}
                    />
                }
            >
            </ListView>
        </View>
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        this.setState({
            isLoading:true
        })
        let url=URL+this.props.tabLabel+QUERY_STR;
        this.dataRepository.fetchNetRepository(url)
            .then(result=>{
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(result.items),
                    isLoading:false
                });
            }).catch(err=>{
                this.setState({
                    result:JSON.stringify(err),
                    isLoading:false
                });
            });
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tips: {
        fontSize: 5,
    }
});