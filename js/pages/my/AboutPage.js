import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ListView,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import GlobalStyles from '../../../res/styles/GlobalStyles'
import {MORE_MENU} from '../../common/MoreMenu';
import ViewUtils from '../../util/ViewUtils';
import config from '../../../res/data/config.json';
import AboutCommon, {FLAG_ABOUT} from './AboutCommon';
export default class AboutPage extends Component {
    constructor(props) {
        super(props);
        this.aboutCommon = new AboutCommon(props, FLAG_ABOUT.flag_about);
    }
    onClick(tab){
        let targetComponent, params = {...this.props};
        switch (tab) {
            case MORE_MENU.About_Author:
                break;
            case MORE_MENU.WebSite:
                break;
            case MORE_MENU.FeedBack:
                break;
        }
        if(targetComponent){
            this.props.navigator.push({
                component:targetComponent,
                params: params,
            });
        }
    }
    render(){
        let contentView = <View>
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.WebSite),require('../../../res/images/ic_computer.png'), MORE_MENU.WebSite, {tintColor:'#2196F3'}, null)}
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.About_Author),require('../../../res/images/ic_insert_emoticon.png'), MORE_MENU.About_Author, {tintColor:'#2196F3'}, null)}
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.FeedBack),require('../../../res/images/ic_feedback.png'), MORE_MENU.FeedBack, {tintColor:'#2196F3'}, null)}
          <View style={GlobalStyles.line}/>
        </View>
        return this.aboutCommon.renderView(contentView, {
            'name':'GitHub Popular',
            'description':'This is an App used to watch Github popular and trending modules, based on React-Native',
            'avatar':config.author.avatar1,
            'backgroundImg':config.author.backgroundImg1
        });
    }
}
