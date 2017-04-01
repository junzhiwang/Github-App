import React, { Component } from 'react';
import {
    StyleSheet,
    Navigator,
    Text,
    View,
    TextInput,
    ListView
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
                        title="hot"
                        style={{backgroundColor:'#6495ED'}}
                    />
                    <ScrollableTabView
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
         dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
      };
    }
    renderRow(data){
        return <RepositoryCell data={data} />
    }
    render(){
        return <View>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(data)=>this.renderRow(data)}
            >
            </ListView>
        </View>
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        let url=URL+this.props.tabLabel+QUERY_STR;
        this.dataRepository.fetchNetRepository(url)
            .then(result=>{
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(result.items)
                });
            }).catch(err=>{
                this.setState({
                    result:JSON.stringify(err)
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