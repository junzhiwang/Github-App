import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Girl from './Girl';
import NavigationBar from './NavigationBar';

export default class Boy extends Component{
    constructor(props){
        super(props);
        this.state={
            word:''
        }
    }
    render(){
        return (
            <View style={styles.container}>
                <NavigationBar 
                    title={"Boy"} 
                    style={{
                        backgroundColor:'red',
                    }}
                    statusBar={{
                        barStyle:'light-content',
                    }}
                />
                <Text style={styles.text}>I am a boy</Text>
                <Text style={styles.text}
                    onPress={()=>{
                        this.props.navigator.push({
                        component:Girl,
                            params:{
                                word:'rose',
                                onCallBack:(word)=>{
                                    this.setState({
                                        word:word
                                    });
                                }
                            }
                         });
                      }}>
                    send a rose to girl
                </Text>

                <Text style={styles.text}>Receive a {this.state.word}</Text>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'gray',
    },
    text:{
        fontSize:20,
    }
})