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
import GlobalStyles from '../../../res/styles/GlobalStyles';
import ViewUtils from '../../util/ViewUtils';
import NavigationBar from '../../common/NavigationBar';
export default class WebViewPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            url:this.props.url,
            title:this.props.title,
            canGoBack:false,
            canGoForward:true,
        };
    }
    onBack(){
        if(this.state.canGoBack){
            this.webView.goBack();
        } else this.props.navigator.pop();
    }
    onForward(){
        if(this.state.canGoForward){
            this.webView.goForward();
        }
    }
    onNavigationStateChange(e){
        this.setState({
            canGoForward:e.canGoForward,
            canGoBack:e.canGoBack,
        })
    }
    render(){
      return (
          <View style={GlobalStyles.root_container}>
              <NavigationBar
                  title={this.state.title}
                  style={{backgroundColor:'#6495ED'}}
                  leftButton={ViewUtils.getLeftButton(()=>this.onBack())}/>
              <WebView
                  ref={webView=>this.webView=webView}
                  onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                  source={{uri:this.state.url}}
                  startInLoadingState={true}/>
          </View>
      );
    }
}
