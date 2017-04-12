import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    WebView,
    DeviceEventEmitter,
} from 'react-native';
const URL = 'https://www.google.com';
const TRENDING_URL = 'https://github.com/';
import ViewUtils from '../util/ViewUtils';
import NavigationBar from '../common/NavigationBar';
export default class RepositoryDetail extends Component{
    constructor(props){
        super(props);
        this.url = this.props.projectModel.item.html_url ? this.props.projectModel.item.html_url : TRENDING_URL+this.props.item.fullName;
        let title = this.props.projectModel.item.full_name ? this.props.projectModel.item.full_name: this.props.projectModel.item.fullName;
        this.state = {
            url:this.url,
            title:title,
            canGoBack:false,
        };
    }
    completeUrl(){

    }
    checkUrl(){

    }
    onBack(){
        if(this.state.canGoBack){
            this.webView.goBack();
        } else {
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
    go(){
        //let validUrl = completeUrl(this.text);
        this.setState({
            url:this.text
        })
    }
    onNavigationStateChange(e){
        this.setState({
            canGoForward:e.canGoForward,
            canGoBack:e.canGoBack,
        })
    }
    render(){
      return (
          <View style={styles.container}>
              <NavigationBar
                  title={this.state.title}
                  style={{backgroundColor:'#6495ED'}}
                  leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
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
