import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    WebView,
    DeviceEventEmitter,
    TouchableOpacity,
    Image,
} from 'react-native';
const URL = 'https://www.google.com';
const TRENDING_URL = 'https://github.com/';
import ViewUtils from '../util/ViewUtils';
import NavigationBar from './NavigationBar';
export default class RepositoryDetail extends Component{
    constructor(props){
        super(props);
        this.id = this.props.item.id;
        this.url = this.props.item.html_url ? this.props.item.html_url : TRENDING_URL+this.props.item.fullName;
        let title = this.props.item.full_name ? this.props.item.full_name: this.props.item.fullName;
        this.state = {
            url:this.url,
            title:title,
            canGoBack:false,
            isFavorite:this.props.isFavorite,
            favoriteIcon:this.props.isFavorite ? require('../../res/images/ic_star.png')
                : require('../../res/images/ic_unstar_transparent.png')
        };
    }
    onBack(){
        if(this.state.canGoBack){
            this.webView.goBack();
        } else {
            DeviceEventEmitter.emit('changeState',this.state.isFavorite,this.id);
            this.props.navigator.pop();
        }
    }
    goForward(){
        if(this.state.canGoForward){
            this.webView.goForward();
        } else {
            DeviceEventEmitter.emit("showToast","Cannot go forward...")
        }
    }
    onNavigationStateChange(e){
        this.setState({
            canGoForward:e.canGoForward,
            canGoBack:e.canGoBack,
        })
    }
    setFavoriteState(isFavorite){
        this.setState({
            isFavorite:isFavorite,
            favoriteIcon:isFavorite ? require('../../res/images/ic_star.png')
                : require('../../res/images/ic_unstar_transparent.png')
        })
    }
    onPressFavorite(){
        /** declare a local variable to avoid that async method change the {this.state.isFavorite}
            then cause some unexpected result (from debug)**/
        let isFavorite = this.state.isFavorite;
        this.setFavoriteState(!isFavorite);
        this.props.onFavorite(this.props.projectModel.item, !isFavorite);
    }
    renderRightButton(){
        return <TouchableOpacity
            onPress={()=>this.onPressFavorite()}>
            <Image
                source = {this.state.favoriteIcon}
                style={{height:20,width:20,marginRight:10}}
            />
        </TouchableOpacity>
    }
    render(){
      return (
          <View style={styles.container}>
              <NavigationBar
                  title={this.state.title}
                  style={{backgroundColor:'#6495ED'}}
                  leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                  rightButton={this.renderRightButton()}
              />
              <WebView
                  ref={webView=>this.webView=webView}
                  onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                  source={{uri:this.state.url}}
                  startInLoadingState={true}
              />
          </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tips: {
        fontSize: 20,
    },
    addressbar:{
        height:40,
        flex:1,
        borderWidth:1,
        borderRadius:4,
        borderColor:'#6495ED',
        margin:4,
    },
    input:{
        height:40,
        flex:1,
        borderWidth:10,
    }
});
