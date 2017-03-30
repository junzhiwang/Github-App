import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import NavigationBar from './NavigationBar'
export default class Girl extends Component{
    renderButton(image){
        return (
            <TouchableOpacity
                onPress={()=>{
                this.props.navigator.pop();
            }}>
                <Image style={{width:22,height:22,margin:5}} source={image}></Image>
            </TouchableOpacity>
        )
    } 
    render(){
        return(
        <View style={styles.container}>
            <NavigationBar 
                title={"Girl"}
                style={{
                    backgroundColor:'red',
                }}
                leftButton={
                    this.renderButton(require('./res/images/ic_arrow_back_white_36pt.png'))
                }
                rightButton={
                    this.renderButton(require('./res/images/ic_star.png'))
                }
            />
            <View style={styles.subcontainer}>
                <Text style={styles.text}>I am Girl.</Text>
                <Text style={styles.text}>receive a {this.props.word}</Text>
                <Text style={styles.text}
                      onPress={()=>{
                          this.props.onCallBack('a box of chocolate');
                          this.props.navigator.pop();
                      }}>reward a chocolate
                </Text>
            </View>
        </View>
        )
    }
    constructor(props){
        super(props);
        this.state={
            word:''
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
