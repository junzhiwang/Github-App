import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import NavigationBar from './js/common/NavigationBar';
import HttpUtils from './HttpUtils';
export default class FetchTest extends Component{
    onLoad(url){
        HttpUtils.get(url).then(result=>{
            this.setState({
                result: JSON.stringify(result)
            })
        }).catch(err=>{
            this.setState({
                result: JSON.stringify(err)
            })
        })
    }
    onSubmit(url, data){
        HttpUtils.post(url, data)
            .then(result=>{
                this.setState({
                    result:JSON.stringify(result)
                })
            }).catch(err=>{
                this.setState({
                    result:JSON.stringify(err)
                })
            })
    }
    render(){
        return(
        <View style={styles.container}>
            <NavigationBar title="use fetch"/>
            <Text onPress={()=>this.onLoad('http://rap.taobao.org/mockjsdata/16252/get_react')}
            >fetch data</Text>
            <Text onPress={()=>this.onSubmit('http://rap.taobao.org/mockjsdata/16252/login',{
                username:'Jake',
                password:'111'
            })}
            >submit data</Text>
            <Text>
                return result:{this.state.result}
            </Text>
        </View>
        )
    }
    constructor(props){
        super(props);
        this.state={
            result:'none'
        }
    }
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        fontSize:18,
    },
    subcontainer: {
        marginLeft:10,
        marginTop:10,
    }
});
