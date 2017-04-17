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
export default class AboutPage extends Component {
    constructor(props) {
        super(props);
    }


    render() {
      let navigationBar = <NavigationBar
          title="GitHub Popular"
          style={{backgroundColor:'#2196F3'}}
      />
        return  <View style={GlobalStyles.root_container}>
                    {navigationBar}
                </View>
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
