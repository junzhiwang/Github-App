import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import RepositoryCell from '../../common/RepositoryCell';
import DataRepository from '../../expand/dao/DataRepository';
import Utils from '../../util/Utils.js';
import ViewUtils from '../../util/ViewUtils';
import FavoriteDao from '../../expand/dao/FavoriteDao';
import {FLAG_STORAGE} from '../../expand/dao/DataRepository';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ProjectModel from '../../model/ProjectModel';
import RepositoryUtil from '../../expand/dao/RepositoryUtil';
export let FLAG_ABOUT = {flag_about:'about',flag_about_me:'about me'};
export default class AboutCommon {
    constructor(props, updateState, flag_about, config) {
        this.props = props;
        this.flag_about = flag_about;
        this.config = config;
        this.repositories = [];
        this.updateState = updateState;
        this.favoriteKeys = null;
        this.favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_my);
    }
    onNotifyDataChanged(items){
        this.updateFavorite(items);
    }
    async updateFavorite(repositories){
        if(repositories) this.repositories = repositories;
        if(!this.favoriteKeys) {
            this.favoriteKeys = await this.favoriteDao.getFavoriteKeys();
        }
        let projectModels = [];
        let data = this.repositories;
        for(let i = 0; i < data.length; ++i){
            let item = data[i].item || data[i];
            projectModels.push(new ProjectModel(item, Utils.checkFavorite(item, this.favoriteKeys||[])));
        }
        this.updateState({projectModels : projectModels});
    }
    async componentDidMount(){
        if(this.flag_about === FLAG_ABOUT.flag_about){
            this.repositories = [];
            this.repositories.push(await this.dataRepository.fetchRepository(this.config.info.currentRepoUrl));
        } else if(this.flag_about === FLAG_ABOUT.flag_about_me){
            //let urls = [];
            let items = this.config.items;
            this.repositories = [];
            for(let i = 0; i < items.length; ++i){
                this.repositories.push(await this.dataRepository.fetchRepository(this.config.info.url + items[i]));
            }
            //this.repositoryUtils.fetchRepositories(urls);
        }
        this.updateFavorite(this.repositories);
    }
    renderRepository(projectModels){
        if(!projectModels||projectModels.length === 0) return null;
        let views = [];
        for(let i = 0; i < projectModels.length; ++i){
            views.push(
                <RepositoryCell
                    {...this.props}
                    key={projectModels[i].item.id}
                    projectModel={projectModels[i]}
                    onFavorite = {(item, isFavorite)=>this.onFavorite(item, isFavorite)}/>
            );
        }
        return views;
    }
    onFavorite(item, isFavorite){
      if(isFavorite){
          this.favoriteDao.saveFavoriteItems(item.id.toString(), JSON.stringify(item));
      }  else {
          this.favoriteDao.removeFavoriteItems(item.id.toString());
      }
    }
    getParallaxRenderConfig(params){
        let config = {};
        config.renderBackground = () => (
            <View key="background">
                <Image source={{
                    uri: params.backgroundImg,
                    width: window.width,
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
                <View style={{position: 'absolute',
                    top: 0,
                    width: window.width,
                    backgroundColor: 'rgba(0,0,0,.4)',
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
            </View>
        );
        config.renderForeground = () => (
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
        config.renderStickyHeader = () => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{params.name}</Text>
            </View>
        );
        config.renderFixedHeader = () => (
            <View key="fixed-header" style={styles.fixedSection}>
                {ViewUtils.getLeftButton(()=>{
                    this.props.navigator.pop();
                })}
            </View>
        );
        return config;
    }
    renderView(contentView, params) {
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
