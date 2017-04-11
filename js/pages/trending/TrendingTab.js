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
import ViewUtils from '../../util/ViewUtils';
import GitHubTrending from 'GitHubTrending';
import NavigationBar from '../../common/NavigationBar';
import TrendingCell from '../../common/TrendingCell';
import DataRepository,{FLAG_STORAGE} from '../../expand/dao/DataRepository';
export default class TrendingTab extends Component{
    constructor(props){
        super(props);
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
        this.state = {
            result:[],
            err:'',
            isLoading:false,
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
        };
    }
    renderRow(data){
        return (
            <TrendingCell
                {...this.props}
                key={data.id}
                data={data}
            />
        )
    }
    componentDidMount(){
        this.loadData(this.props.timeSpan,false);
    }
    genFetchUrl(timeSpan){
        return API_URL + '/' + this.props.tabLabel + '?' + timeSpan;
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.timeSpan!==this.props.timeSpan){
            this.loadData(nextProps.timeSpan,false);
        }
    }
    loadData(timeSpan,again){
        let url = this.genFetchUrl(timeSpan.searchText);
        this.setState({
            isLoading:true
        });
        if(!again){
            this.dataRepository.fetchRepository(url)
            .then(data=>{
                if(data&&data.items){
                    DeviceEventEmitter.emit('showToast','Local data used');
                } else if(data) {
                    DeviceEventEmitter.emit('showToast','Network data fetched');
                } else DeviceEventEmitter.emit('showToast','No data available');
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(data && data.items ? data.items : data ? data : []),
                });
            })
            .catch(err=>{
                console.log(err);
            });
        } else {
            this.dataRepository.fetchNetRepository(url)
            .then(data=>{
                if(data){
                   DeviceEventEmitter.emit('showToast','Network data fetched');
                   this.setState({
                       dataSource:this.state.dataSource.cloneWithRows(data)
                   });

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
                      renderRow={(data)=>this.renderRow(data)}
                      refreshControl={
                          <RefreshControl
                              tintColor='#2196F3'
                              colors={['#2196F3']}
                              title='Loading...'
                              refreshing={this.state.isLoading}
                              onRefresh={()=>this.loadData(this.props.timeSpan,true)}
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
