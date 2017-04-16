import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl,
    DeviceEventEmitter,
} from 'react-native';
import FavoriteDao from '../expand/dao/FavoriteDao';
import ProjectModel from '../model/ProjectModel';
import RepositoryDetail from './RepositoryDetail';
import RepositoryCell from '../common/RepositoryCell';
import TrendingCell from '../common/TrendingCell';
import DataRepository,{FLAG_STORAGE} from '../expand/dao/DataRepository';
import Utils from '../util/Utils';
import ArrayUtils from '../util/ArrayUtils';
export default class FavoriteTab extends Component{
    constructor(props) {
        super(props);
        this.favoriteDao = new FavoriteDao(this.props.flag);
        this.unfavoriteItems = [];
        this.state = {
            isLoading:false,
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
        };
    }
    renderRow(projectModel){
        let CellComponent = this.props.flag === FLAG_STORAGE.flag_popular ? RepositoryCell : TrendingCell;
        return <CellComponent
            {...this.props}
            key={projectModel.item.id}
            projectModel={projectModel}
            onFavorite = {(item, isFavorite)=>this.onFavorite(item, isFavorite)}/>
    }
    componentWillReceiveProps(nextProps){
        //When return from repositoryDetail page or another scrollable view, remove the unfavorite item.
        this.loadData(false);
    }
    render(){
        return <View style={{flex:1}}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(projectModel)=>this.renderRow(projectModel)}
                enableEmptySections={true}
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
            />
        </View>
    }
    onFavorite(item, isFavorite){
        if(isFavorite){
            this.favoriteDao.saveFavoriteItems(item.id.toString(), JSON.stringify(item));
        }  else {
            this.favoriteDao.removeFavoriteItems(item.id.toString());
        }
        // Matain an array about unfavoriteItems, when
        ArrayUtils.updateArray(this.unfavoriteItems, item);
    }
    componentDidMount(){
        this.loadData(true);
    }
    componentWillUnmount(){
        if(this.unfavoriteItems.length > 0){
            DeviceEventEmitter.emit('favoriteChanged_popular');
        }
    }
    getDataSource(data){
        return this.state.dataSource.cloneWithRows(data);
    }
    loadData(isShowLoading){
        if(isShowLoading){
            this.setState({
                isLoading:true
            })
        }
        this.favoriteDao.getAllItems()
        .then(items=>{
            let resultData=[];
            items.forEach((element)=>{
                resultData.push(new ProjectModel(element, true));
            })
            this.setState({
                isLoading:false,
                dataSource:this.getDataSource(resultData)
            })
        }).catch(e=>{ console.log(e)});
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
