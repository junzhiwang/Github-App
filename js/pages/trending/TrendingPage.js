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
import FavoriteDao from '../../expand/dao/FavoriteDao';
import {FLAG_STORAGE} from '../../expand/dao/DataRepository';
import TimeSpan from '../../model/TimeSpan';
import Popover from '../../common/Popover';
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import TrendingTab from './TrendingTab';
import ScrollableTabView,{ScrollableTabBar,} from 'react-native-scrollable-tab-view';
import NavigationBar from '../../common/NavigationBar';
var timespanTextArray=[
    new TimeSpan('Today','since=daily'),
    new TimeSpan('Week','since=weekly'),
    new TimeSpan('Month','since=monthly')
];
export default class TrendingPage extends Component {
    constructor(props) {
        super(props);
        this.favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
        this.state={
            result:'',
            languages:[],
            isVisible: false,
            buttonRect: {},
            timeSpan:timespanTextArray[0]
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
    showPopover(){
        this.refs.button.measure((ox,oy,width,height,px,py)=>{
            this.setState({
                isVisible:true,
                buttonRect:{x:px+40,y:py,width:width,height:height}
            });
        });
    }
    closePopover() {
        this.setState({
            isVisible:false
        });
    }
    renderTitleView(){
        return <View>
            <TouchableOpacity
                ref='button'
                onPress={()=>this.showPopover()}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.title}>Trending {this.state.timeSpan.showText}</Text>
                    <Image
                        style={{height:12,width:12,marginLeft:5}}
                        source={require('../../../res/images/ic_spinner_triangle.png')}
                    />
                </View>
            </TouchableOpacity>
        </View>
    }
    onSelectTimeSpan(timeSpan){
        this.setState({
            timeSpan:timeSpan,
            isVisible:false,
        });
    }
    render() {
        let content = this.state.languages.length > 0 ?
                    <ScrollableTabView
                        tabBarBackgroundColor='#2196F3'
                        tabBarInactiveTextColor='mintcream'
                        tabBarActiveTextColor='white'
                        tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
                        initialPage={0}
                        renderTabBar={() => <ScrollableTabBar/>}
                    >
                        {this.state.languages.map((result,i,arr)=>{
                            let item = arr[i];
                            return item.checked?
                            <TrendingTab
                                key = {i}
                                tabLabel= {item.name}
                                tabPath = {item.path}
                                timeSpan ={ this.state.timeSpan}
                                favoriteDao = {this.favoriteDao}
                                {...this.props}/>:null
                        })}
                    </ScrollableTabView> : null;
        let timeSpanView = <Popover
                    placement='bottom'
                    isVisible={this.state.isVisible}
                    fromRect={this.state.buttonRect}
                    onClose={()=>this.closePopover()}
                    contentStyle={{backgroundColor:'#343434',opacity:0.8}}>
                {timespanTextArray.map((result,i,arr)=>{
                    let item = arr[i];
                    return <TouchableOpacity
                            key={i}
                            underlayColor='transparent'
                            onPress={()=>this.onSelectTimeSpan(arr[i])}>
                        <Text style={{fontSize:18,color:'white',fontWeight:'400',padding:8}}>{arr[i].showText}</Text>
                    </TouchableOpacity>
                })}
            </Popover>
        return  <View style={styles.container}>
                    <NavigationBar
                        titleView={this.renderTitleView()}
                    />
                    {content}
                    {timeSpanView}
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
