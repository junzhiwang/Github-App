import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl,
    DeviceEventEmitter,
} from 'react-native';
import RepositoryCell from '../../common/ReposityoryCell';
import DataRepository,{DATA_FLAG} from '../../expand/dao/DataRepository';
const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars';
export default class PopularTab extends Component{
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
                        title='Loading...'
                        refreshing={this.state.isLoading}
                        onRefresh={()=>this.loadData(true)}
                    />
                }
            >
            </ListView>
        </View>
    }
    componentDidMount(){
        this.loadData(false);
    }
    genFetchUrl(key){
        return URL + key + QUERY_STR;
    }
    loadData(again){
        this.setState({
            isLoading:true
        })
        let url = this.genFetchUrl(this.props.tabLabel);
        if(!again){
            this.dataRepository.fetchRepository(url)
                .then(result=>{
                    DeviceEventEmitter.emit('showToast',result.from);
                    this.setState({
                        dataSource:this.state.dataSource.cloneWithRows(result.items),
                        isLoading:false
                    });
                })
                .catch(err=>{
                    this.setState({
                        result:JSON.stringify(err),
                        isLoading:false
                    });
                });
        } else {
            this.dataRepository.fetchNetRepository(url)
                .then(result=>{
                    if(result && result.items && result.items.length > 0){
                        DeviceEventEmitter.emit('showToast',DATA_FLAG.NETWORK);
                        this.setState({
                            dataSource:this.state.dataSource.cloneWithRows(result.items),
                            isLoading:false
                        });
                    } else DeviceEventEmitter.emit('showToast',"No Internect connection");
                })
                .catch(err=>{
                    this.setState({
                        result:JSON.stringify(err),
                        isLoading:false
                    });
                });
        }
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