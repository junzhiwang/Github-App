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
  Linking,
  ClipBoard,
} from 'react-native';
import GlobalStyles from '../../../res/styles/GlobalStyles'
import {MORE_MENU} from '../../common/MoreMenu';
import ViewUtils from '../../util/ViewUtils';
import config from '../../../res/data/config.json';
import AboutCommon, {FLAG_ABOUT} from './AboutCommon';
import WebViewPage from './WebViewPage';
import myinfo from '../../../res/data/myinfo.json';
export default class AboutMePage extends Component {
    constructor(props) {
        super(props);
        this.aboutCommon = new AboutCommon(props, (dict)=>this.updateState(dict), FLAG_ABOUT.flag_about_me, config);
        this.state = {
            projectModels : [],
            author: config.author,
            showRepository:false,
            showIndividual: false,
            showQQ: false,
            showContact: false,
        };
    }
    getClickIcon(isShow){
        return isShow ? require('../../../res/images/ic_tiaozhuan_up.png') : require('../../../res/images/ic_tiaozhuan_down.png');
    }
    updateState(dict){
        this.setState(dict);
    }
    componentDidMount(){
        this.aboutCommon.componentDidMount();
    }
    componentWillReceiveProps(nextProps){
        this.forceUpdate();
    }
    onClick(tab){
        let targetComponent, params = {...this.props};
        switch (tab) {
            case MORE_MENU.About_Author:
                break;
            case MORE_MENU.WebSite:
                targetComponent = WebViewPage;
                params.url = 'http://www.devio.org/io/GitHubPopular/';
                params.title = 'GitHubPopular';
                break;
            case MORE_MENU.FeedBack:
                let url='mailto://crazycodeboy.gmail.com';
                Linking.canOpenURL(url).then(supported => {
                    if(!supported){
                        console.log('Can\'t handle url: ' + url);
                    } else return Linking.openURL(url);
                }).catch(err => console.err('An error occurred', err));
                break;
            case myinfo.INDIVIDUAL:
                this.updateState({showIndividual:!this.state.showIndividual});
                break;
            case myinfo.CONTACT:
                this.updateState({showContact:!this.state.showContact});
                break;
            case myinfo.QQ:
                this.updateState({showQQ:!this.state.showQQ});
                break;
            case myinfo.REPOSITORY:
                this.updateState({showRepository:!this.state.showRepository});
                break;
            case myinfo.CONTACT.items.QQ:

        }
        if(targetComponent){
            this.props.navigator.push({
                component:targetComponent,
                params: params,
            });
        }
    }
    renderItems(dict, isShowAccount){
        if(!dict) return null;
        let views = [];
        for(let i in dict){
            let title = isShowAccount ? dict[i].title + ':' + dict[i].account : dict[i].title;
            views.push(
                <View key = {i}>
                    {ViewUtils.getSettingItem(()=>this.onClick(dict[i]),null,title,{tintColor:'#2196F3'}, null)}
                </View>
            )
        }
        return views;
    }
    render(){
        let contentView = <View>
            {/**this.aboutCommon.renderRepository(this.state.projectModels)**/}
            {ViewUtils.getSettingItem(()=>this.onClick(myinfo.INDIVIDUAL),require('../../../res/images/ic_computer.png'),myinfo.INDIVIDUAL.name, {tintColor:'#2196F3'}, this.getClickIcon(this.state.showIndividual))}
            {this.state.showIndividual ? this.renderItems(myinfo.INDIVIDUAL.items, false) : null}
            {ViewUtils.getSettingItem(()=>this.onClick(myinfo.REPOSITORY),require('../../../res/images/ic_code.png'),myinfo.REPOSITORY, {tintColor:'#2196F3'}, this.getClickIcon(this.state.showRepository))}
            {this.state.showRepository ? this.aboutCommon.renderRepository(this.state.projectModels) : null}
            {ViewUtils.getSettingItem(()=>this.onClick(myinfo.QQ),require('../../../res/images/ic_computer.png'),myinfo.QQ.name, {tintColor:'#2196F3'}, this.getClickIcon(this.state.showQQ))}
            {this.state.showQQ ? this.renderItems(myinfo.QQ.items, false) : null}
            {ViewUtils.getSettingItem(()=>this.onClick(myinfo.CONTACT),require('../../../res/images/ic_contacts.png'),myinfo.CONTACT.name, {tintColor:'#2196F3'}, this.getClickIcon(this.state.showContact))}
            {this.state.showContact ? this.renderItems(myinfo.CONTACT.items, true) : null}
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
        <View style>
    }
}
