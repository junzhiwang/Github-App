/*
 * This example demonstrates how to use ParallaxScrollView within a ScrollView component.
 */
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
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import config from '../../../res/data/config.json';
export var FLAG_ABOUT = {flag_about:'about',flag_about_me:'about me'};

export default class AboutCommon extends Component {
  constructor(props, flag_about) {
      super(props);
      this.state =  {

      };
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
  getParallaxRenderConfig(params){
      let config1 = {};
      config1.renderBackground = () => (
          <View key="background">
              <Image source={{
                  uri: params.backgroundImg,
                  width: window.width,
                  height: PARALLAX_HEADER_HEIGHT}}
              />
              <View style={{position: 'absolute',
                  top: 0,
                  width: window.width,
                  backgroundColor: 'rgba(0,0,0,.4)',
                  height: PARALLAX_HEADER_HEIGHT}}
              />
          </View>
      );
      config1.renderForeground = () => (
          <View key="parallax-header" style={ styles.parallaxHeader }>
              <Image style={ styles.avatar } source={{
                  uri: params.avatar,
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE
              }}/>
              <Text style={ styles.sectionSpeakerText }>
                  {params.name}
              </Text>
              <Text style={ [styles.sectionTitleText,{marginLeft:10,marginRight:10}] }>
                  {params.description}
              </Text>
          </View>
      );
      config1.renderStickyHeader = () => (
          <View key="sticky-header" style={styles.stickySection}>
              <Text style={styles.stickySectionText}>{params.name}</Text>
          </View>
      );
      config1.renderFixedHeader = () => (
          <View key="fixed-header" style={styles.fixedSection}>
              {ViewUtils.getLeftButton(()=>{
                  this.props.navigator.pop();
              })}
          </View>
      );
      return config1;
  }
  render(){
      return this.renderView({
          'name':'GitHub Popular',
          'description':'This is an App used to watch Github popular and trending modules, based on React-Native',
          'avatar':config.author.avatar1,
          'backgroundImg':config.author.backgroundImg1
      })
  }
  renderView(params) {
      let contentView = <View>
          {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.WebSite),require('../../../res/images/ic_computer.png'), MORE_MENU.WebSite, {tintColor:'#2196F3'}, null)}
          {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.About_Author),require('../../../res/images/ic_insert_emoticon.png'), MORE_MENU.About_Author, {tintColor:'#2196F3'}, null)}
          {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.FeedBack),require('../../../res/images/ic_feedback.png'), MORE_MENU.FeedBack, {tintColor:'#2196F3'}, null)}
          <View style={GlobalStyles.line}/>
      </View>
      let renderConfig = this.getParallaxRenderConfig(params);
      return (
          <ParallaxScrollView
              headerBackgroundColor='#2196F3'
              stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
              parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
              backgroundSpeed={10}
              backgroundColor='#2196F3'
              {...renderConfig}>
              {contentView}
          </ParallaxScrollView>
      );
  }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10,
    paddingTop: (Platform.OS==='ios')?20:0,
  },
  fixedSection: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    left: 0,
    top: 0,
    paddingRight:8,
    paddingTop: (Platform.OS==='ios')?20:0,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});
