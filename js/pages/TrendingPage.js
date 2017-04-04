import React, { Component } from 'react';
import {
    StyleSheet,
    Navigator,
    Text,
    View,
    TextInput,
    ListView,
    Image,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';
import TimeSpan from '../model/TimeSpan';
import  Popover from '../common/Popover';
import LanguageDao,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import TrendingTab from './TrendingTab';
import ScrollableTabView,{ScrollableTabBar,} from 'react-native-scrollable-tab-view';
import NavigationBar from '../common/NavigationBar';
var timespanTextArray=[
    new TimeSpan('Today','since=daily'),
    new TimeSpan('Week','since=weekly'),
    new TimeSpan('Month','since=monthly')
];
export default class TrendingPage extends Component {
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
        this.state={
            result:'',
            languages:[],
        };
        this.loadLanguage();
    }
    loadLanguage(){
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

    }
    renderTitleView(){
        return <View>
            <TouchableOpacity>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.title}>Trending</Text>
                    <Image
                        style={{height:12,width:12,marginLeft:5}}
                        source={require('../../res/images/ic_spinner_triangle.png')}
                    />
                </View>
            </TouchableOpacity>
        </View>
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
                            return item.checked? <TrendingTab key={i} tabLabel={item.name} {...this.props}/>:null
                        })}
                    </ScrollableTabView> : null;

        return  <View style={styles.container}>
                    <NavigationBar
                        title="Trending"
                        titleView={this.renderTitleView()}
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
    },
    title:{
        fontSize:20,
        color:'white',
    },
});
