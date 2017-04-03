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
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import PopularTab from './PopularTab'
import ScrollableTabView,{ScrollableTabBar,} from 'react-native-scrollable-tab-view';
import NavigationBar from '../../common/NavigationBar';
export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state={
            result:'',
            languages:[],
        };
    }
    loadData(){
        this.languageDao.fetch()
            .then(result=>{
                this.setState({
                    languages:result,
                });
            }).catch(err=>{
                console.log(err);
            });
    }
    componentDidMount(){
        this.loadData();
    }
    render() {
        let content = this.state.languages.length > 0 ?
                    <ScrollableTabView
                        tabBarBackgroundColor='#2196F3'
                        tabBarInactiveTextColor='mintcream'
                        tabBarActiveTextColor='white'
                        tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
                        initialPage={0}
                        renderTabBar={() => <ScrollableTabBar />}
                    >
                        {this.state.languages.map((result,i,arr)=>{
                            let item = arr[i];
                            return item.checked? <PopularTab key={i} tabLabel={item.name} {...this.props}/>:null
                        })}
                    </ScrollableTabView> : null;

        return  <View style={styles.container}>        
                    <NavigationBar 
                        title="Hot"
                    />
                    {content}
                </View>  
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