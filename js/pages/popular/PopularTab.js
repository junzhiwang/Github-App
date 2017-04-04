import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl,
    DeviceEventEmitter,
} from 'react-native';
import RepositoryDetail from '../RepositoryDetail';
import RepositoryCell from '../../common/RepositoryCell';
import DataRepository,{FLAG_STORAGE} from '../../expand/dao/DataRepository';
const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars';
export default class PopularTab extends Component{
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_popular);
        this.state = {
            result:'',
            isLoading:false,
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
        };
    }
    renderRow(data){
        return <RepositoryCell 
            {...this.props} 
            key={data.id}
            data={data} />
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
                        progressBackgroundColor="#ffff00"
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
                let items = result && result.items ? result.items : result ? result : [];
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(items)
                });
                if(!result || !result.update_date || !this.dataRepository.checkDate(result.update_date)){
                    DeviceEventEmitter.emit('showToast','Local data deprecated');
                    return this.dataRepository.fetchNetRepository(url);
                } else {
                    DeviceEventEmitter.emit('showToast','Local data used');
                }
            })
            .then(result=>{
                if(result && result.items && result.items.length > 0){
                    DeviceEventEmitter.emit('showToast','Network data fetched');
                    this.setState({
                        dataSource:this.state.dataSource.cloneWithRows(result.items),
                    });
                }
            })
            .catch(err=>{
                this.setState({
                    result:JSON.stringify(err),
                });
            });
        } else {
            this.dataRepository.fetchNetRepository(url)
            .then(result=>{
                if(result && result.items && result.items.length > 0){
                    DeviceEventEmitter.emit('showToast','Network data fetched');
                    this.setState({
                        dataSource:this.state.dataSource.cloneWithRows(result.items),
                    });
                } else DeviceEventEmitter.emit('showToast',"No Internect connection");
            })
            .catch(err=>{
                this.setState({
                    result:JSON.stringify(err),
                });
            });
        }
        this.setState({
            isLoading:false
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