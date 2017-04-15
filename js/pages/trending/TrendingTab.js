import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    DeviceEventEmitter,
    ListView,
    RefreshControl,
} from 'react-native';
const API_URL = 'https://github.com/trending';
import FavoriteDao from '../../expand/dao/FavoriteDao';
import Utils from '../../util/Utils';
import ViewUtils from '../../util/ViewUtils';
import GitHubTrending from '../../util/trending/GitHubTrending';
import NavigationBar from '../../common/NavigationBar';
import TrendingCell from '../../common/TrendingCell';
import DataRepository,{FLAG_STORAGE} from '../../expand/dao/DataRepository';
import ProjectModel from '../../model/ProjectModel';
export default class TrendingTab extends Component{
    constructor(props){
        super(props);
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
        this.state = {
            result:[],
            err:'',
            isLoading:false,
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
            favoriteKeys:[]
        };
    }
    renderRow(projectModel){
        return (
            <TrendingCell
                {...this.props}
                key={projectModel.item.id}
                projectModel={projectModel}
                onFavorite = {(item, isFavorite)=>this.onFavorite(item, isFavorite)}
            />
        )
    }
    onFavorite(item, isFavorite){
        if(isFavorite){
            this.props.favoriteDao.saveFavoriteItems(item.id.toString(), JSON.stringify(item));
        }  else {
            this.props.favoriteDao.removeFavoriteItems(item.id.toString());
        }
    }
    getFavoriteKeys(){
        this.props.favoriteDao.getFavoriteKeys()
        .then(keys=>{
            if(keys) this.setState({favoriteKeys:keys});
            this.flushFavoriteState();
        }).catch(err=>{
            console.log(err);
        });
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
    componentDidMount(){
        this.loadData(this.props.timeSpan,false,true);
    }
    genFetchUrl(timeSpan){
        return API_URL + '/' + this.props.tabPath + '?' + timeSpan;
    }
    componentWillReceiveProps(nextProps){
        this.loadData(nextProps.timeSpan,false,false);
    }
    loadData(timeSpan,again,isShowLoading){
        let url = this.genFetchUrl(timeSpan.searchText);
        if(isShowLoading){
            this.setState({
                isLoading:true
            });
        }
        if(!again){
            this.dataRepository.fetchRepository(url)
            .then(data=>{
                this.items = data && data.items ? data.items : data ? data : [];
                if(data&&data.items){
                    DeviceEventEmitter.emit('showToast','Local data used');
                } else if(data) {
                    DeviceEventEmitter.emit('showToast','Network data fetched');
                } else DeviceEventEmitter.emit('showToast','No data available');
                this.getFavoriteKeys();
            })
            .catch(err=>{
                console.log(err);
            });
        } else {
            this.dataRepository.fetchNetRepository(url)
            .then(data=>{
                if(data){
                   this.items = data && data.items ? data.items : data ? data : [];
                   DeviceEventEmitter.emit('showToast','Network data fetched');
                   this.getFavoriteKeys();
                } else DeviceEventEmitter.emit('showToast','Network data unavailable');
            })
            .catch(err=>{
                console.log(err);
            })
        }
        this.setState({
            isLoading:false
        });
    }
    render(){
      return (
              <View style={{flex:1}}>
                  <ListView
                      dataSource={this.state.dataSource}
                      renderRow={(projectModel)=>this.renderRow(projectModel)}
                      refreshControl={
                          <RefreshControl
                              tintColor='#2196F3'
                              colors={['#2196F3']}
                              title='Loading...'
                              refreshing={this.state.isLoading}
                              onRefresh={()=>this.loadData(this.props.timeSpan,true,true)}
                          />
                      }
                  >
                  </ListView>
              </View>
      );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    title:{
        fontSize:16,
        marginBottom:2,
        color:'#212121',
    },
    description:{
        fontSize:14,
        marginBottom:2,
        color:'#757575',
    },
    cell_container:{
        backgroundColor:'white',
        padding:10,
        marginLeft:5,
        marginRight:5,
        marginVertical:3,
        borderWidth:0.5,
        borderRadius:2,
        borderColor:'#dddddd',
        shadowColor:'gray',
        shadowOffset:{width:0.5,height:0.5},
        shadowOpacity:0.4,
        shadowRadius:1,
        elevation:2,
    },
})
