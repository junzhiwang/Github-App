import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl,
    DeviceEventEmitter,
} from 'react-native';
import FavoriteDao from '../../expand/dao/FavoriteDao';
import ProjectModel from '../../model/ProjectModel';
import RepositoryCell from '../../common/RepositoryCell';
import DataRepository,{FLAG_STORAGE} from '../../expand/dao/DataRepository';
import Utils from '../../util/Utils';
const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars';
export default class PopularTab extends Component{
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_popular);
        this.isFavoriteChanged = false;
        this.state = {
            result:'',
            isLoading:false,
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
            favoriteKeys:[]
        };
    }
    onFavorite(item, isFavorite){
        if(isFavorite){
            this.props.favoriteDao.saveFavoriteItems(item.id.toString(), JSON.stringify(item));
        }  else {
            this.props.favoriteDao.removeFavoriteItems(item.id.toString());
        }
    }
    componentWillReceiveProps(nextProps){
        this.getFavoriteKeys();
    }
    renderRow(projectModel){
        return (
            <RepositoryCell
                {...this.props}
                key={projectModel.item.id}
                projectModel={projectModel}
                onFavorite = {(item, isFavorite)=>this.onFavorite(item, isFavorite)}/>
        )
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
                        onRefresh={()=>this.loadData(false,true)}
                        progressBackgroundColor="#ffff00"
                    />
                }
            />
        </View>
    }
    componentDidMount(){
        this.loadData(false,true);
    }

    genFetchUrl(key){
        return URL + key + QUERY_STR;
    }
    /**
     * Update Item favorite state
     */
    getFavoriteKeys(){
        this.props.favoriteDao.getFavoriteKeys()
        .then(keys=>{
            if(keys) this.setState({favoriteKeys:keys});
            this.flushFavoriteState();
        }).catch(err=>{
            console.log(err);
        })
    }
    flushFavoriteState(){
        let projectModels = [];
        for (var i = 0; i < this.items.length; ++i){
            projectModels.push(new ProjectModel(this.items[i], Utils.checkFavorite(this.items[i], this.state.favoriteKeys)));
        }
        this.setState({
            isLoading:false,
            dataSource:this.getDataSource(projectModels)
        })
    }
    getDataSource(data){
        return this.state.dataSource.cloneWithRows(data);
    }
    loadData(again, isShowLoading){
        if(isShowLoading){
            this.setState({
                isLoading:true
            })
        }
        let url = this.genFetchUrl(this.props.tabLabel);
        if(!again){
            this.dataRepository.fetchRepository(url)
            .then(result=>{
                this.items = result && result.items ? result.items : result ? result : [];
                if(!result || !result.update_date || !this.dataRepository.checkDate(result.update_date)){
                    DeviceEventEmitter.emit('showToast','Local data deprecated');
                    return this.dataRepository.fetchNetRepository(url);
                } else {
                    this.getFavoriteKeys();
                    DeviceEventEmitter.emit('showToast','Local data used');
                }
            })
            .then(result=>{
                if(result && result.items && result.items.length > 0){
                    DeviceEventEmitter.emit('showToast','Network data fetched');
                    this.getFavoriteKeys();
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
                this.items = result && result.items ? result.items : result ? result : [];
                if(this.items && this.items.length > 0){
                    DeviceEventEmitter.emit('showToast','Network data fetched');
                    this.getFavoriteKeys();
                } else DeviceEventEmitter.emit('showToast',"No Internect connection");
            })
            .catch(err=>{
                this.setState({
                    result:JSON.stringify(err),
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
