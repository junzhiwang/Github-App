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
const URL = 'https://github.com/trending';
import ViewUtils from '../util/ViewUtils';
import GitHubTrending from 'GitHubTrending';
import NavigationBar from '../common/NavigationBar';
import TrendingCell from '../common/TrendingCell';
export default class TrendingPage extends Component{
    constructor(props){
        super(props);
        this.githubTrending = new GitHubTrending();
        this.state = {
            result:[],
            err:'',
            isLoading:false,
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
        };
    }
    renderRow(data){
        return <TrendingCell 
            {...this.props} 
            key={data.id}
            data={data} />
    }
    componentDidMount(){
        this.githubTrending.fetchTrending(URL)
            .then(repoData=>{
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(repoData)
                })
            })
            .catch(err=>{
                this.setState({
                    err:JSON.stringify(err),
                })
            });
    }
    loadData(){
        this.setState({
            isLoading:true,
        });
        setTimeout(()=>{
            this.setState({
                isLoading:false,
            });
        },1500);
    }
    componentDidMount(){
        this.githubTrending.fetchTrending(URL)
            .then(repoData=>{
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(repoData)
                })
            })
            .catch(err=>{
                this.setState({
                    err:JSON.stringify(err),
                })
            });
    }
    render(){
      return (
          <View style={styles.container}>  
              <NavigationBar 
                  title='GitHubTrending'
                  style={{backgroundColor:'#6495ED'}}
              />
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
                              onRefresh={()=>this.loadData()}
                          />
                      }
                  >
                  </ListView>
              </View>
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