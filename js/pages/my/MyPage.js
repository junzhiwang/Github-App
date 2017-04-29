import React, { Component } from 'react';
import {
    StyleSheet,
    Navigator,
    Text,
    View,
    ScrollView,
    TouchableHighlight,
    Image,
} from 'react-native';
import GlobalStyles from '../../../res/styles/GlobalStyles';
import {MORE_MENU} from '../../common/MoreMenu';
import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import CustomTagPage from './CustomTagPage';
import NavigationBar from '../../common/NavigationBar';
import SortTagPage from './SortTagPage';
import RemoveTagPage from './RemoveTagPage';
import ViewUtils from '../../util/ViewUtils';
import AboutPage from './AboutPage';
export default class MyPage extends Component {
    constructor(props) {
        super(props);
    }
    onClick(tab){
        let targetComponent, params = {...this.props};
        switch (tab) {
            case MORE_MENU.Custom_Language:
                targetComponent = CustomTagPage;
                params.isRemoveTag = false;
                params.flag = FLAG_LANGUAGE.flag_language;
                break;
            case MORE_MENU.Sort_Language:
                targetComponent = SortTagPage;
                params.flag = FLAG_LANGUAGE.flag_language;
                break;
            case MORE_MENU.Remove_Language:
                targetComponent = CustomTagPage;
                params.isRemoveTag = true;
                params.flag = FLAG_LANGUAGE.flag_language;
                break;
            case MORE_MENU.Custom_Tag:
                targetComponent = CustomTagPage;
                params.isRemoveTag = false;
                params.flag = FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.Sort_Tag:
                targetComponent = SortTagPage;
                params.flag = FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.Remove_Tag:
                targetComponent = CustomTagPage;
                params.isRemoveTag = true;
                params.flag = FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.About:
                targetComponent = AboutPage;
                break;
            case MORE_MENU.About_Author:
                targetComponent = AboutPage;
                break;
        }
        if(targetComponent){
            this.props.navigator.push({
                component:targetComponent,
                params: params,
            });
        }
    }
    getItem(text, icon, expandableIcon){
        return <View style={{flex:1}}>
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSettingItem(()=>this.onClick(text),icon,text,{tintColor:'#2196F3'},expandableIcon)}
        </View>
    }
    render() {
        let navigationBar = <NavigationBar
            title="My"
            style={{backgroundColor:'#2196F3'}}/>
        return  <View style={GlobalStyles.root_container}>
                    {navigationBar}
                    <ScrollView>
                        <TouchableHighlight
                            onPress = {()=>this.onClick(MORE_MENU.About)}>
                            <View style={[styles.item,{height:80}]}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Image source={require('../../../res/images/ic_trending.png')}
                                        style={[{width:40,height:40,marginRight:10},{tintColor:'#2196F3'}]}/>
                                    <Text>GitHub Popular</Text>
                                </View>
                                <Image source={require('../../../res/images/ic_tiaozhuan.png')}
                                    style={[{width:22,height:22,marginRight:10},{tintColor:'#2196F3'}]}/>
                            </View>
                        </TouchableHighlight>
                        <View style={GlobalStyles.line}/>
                        <Text style={styles.groupTitle}>Trending Management</Text>
                        {this.getItem(MORE_MENU.Custom_Language,require('../../../res/images/ic_custom_language.png'),null)}
                        {this.getItem(MORE_MENU.Sort_Language,require('../../../res/images/ic_swap_vert.png'),null)}
                        {this.getItem(MORE_MENU.Remove_Language,require('../../../res/images/ic_remove.png'),null)}
                        <View style={GlobalStyles.line}/>

                        <Text style={styles.groupTitle}>Popular Management</Text>
                        {this.getItem(MORE_MENU.Custom_Tag,require('../../../res/images/ic_custom_language.png'),null)}
                        {this.getItem(MORE_MENU.Sort_Tag,require('../../../res/images/ic_swap_vert.png'),null)}
                        {this.getItem(MORE_MENU.Remove_Tag,require('../../../res/images/ic_remove.png'),null)}
                        <View style={GlobalStyles.line}/>

                        <Text style={styles.groupTitle}>Settings</Text>
                        {this.getItem(MORE_MENU.Custom_Theme,require('../../../res/images/ic_view_quilt.png'),null)}
                        {this.getItem(MORE_MENU.About_Author,require('../../../res/images/ic_insert_emoticon.png'),null)}
                        <View style={GlobalStyles.line}/>
                    </ScrollView>
                </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tips: {
        fontSize: 15,
    },
    item:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,
        height:60,
        backgroundColor:'white',
    },
    groupTitle:{
        marginLeft:10,
        marginTop:10,
        marginBottom:5,
        fontSize:12,
        color:'gray',
    }
});
