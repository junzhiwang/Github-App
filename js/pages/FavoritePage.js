import React, { Component } from 'react';
import {
	StyleSheet,
	WebView,
	View,
	Text,
	TextInput,
  DeviceEventEmitter,
 } from 'react-native';

import NavigationBar from '../common/NavigationBar';
const URL = 'https://www.google.com';
export default class FavoritePage extends Component {
    constructor(props){
       super(props);
        this.state = {
            url:URL,
            title:'',
            canGoBack:false,
        };
    }
    completeUrl(){

    }
    checkUrl(){
      
    }
    goBack(){
        if(this.state.canGoBack){
            this.webView.goBack();
        } else {
            DeviceEventEmitter.emit("showToast","Cannot go back...")
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
            title:e.title,
        })
    }
    render(){
      return (
      	  <View style={styles.container}>
      	  	  <NavigationBar
      	  	  	title="WebView"
      	  	  	style={{backgroundColor:'#6495ED'}}
      	  	  />
              <View style={{flexDirection:'row',alignItems:'center'}}>
      	  	      <Text style={{marginLeft:8,marginRight:4}}
                      onPress={()=>this.goBack()}
                  >Back</Text>
                  <Text style={{marginLeft:4,marginRight:4}}
                      onPress={()=>this.goForward()}
                  >Forward</Text>
                  <TextInput onChangeText={text=>this.text=text}
                      autoCapitalize='none'
                      autoFocus={false}
                      style={styles.addressbar}
                      placeholder={URL}
                      placeholderTextColor='#757575'

                  />
                  <Text style={{marginLeft:4,marginRight:8}}
                      onPress={()=>this.go()}
                  >Go</Text>
              </View>
          	 	<WebView
                  ref={webView=>this.webView=webView}
                  onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
          	 	    source={{uri:this.state.url}}
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
