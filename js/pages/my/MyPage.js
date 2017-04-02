import React, { Component } from 'react';
import {
    StyleSheet,
    Navigator,
    Text,
    View,
} from 'react-native';
import CustomTagPage from './CustomTagPage';
import NavigationBar from '../../common/NavigationBar';
import SortTagPage from './SortTagPage';
import RemoveTagPage from './RemoveTagPage.js'
export default class MyPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return  <View style={styles.container}>        
                    <NavigationBar 
                        title="My"
                    />
                    <Text style={styles.tips}
                        navigator={this.props.navigator}
                        onPress={()=>{
                            this.props.navigator.push({
                                component:CustomTagPage,
                                params:{
                                    ...this.props,
                                    isRemoveTag:false
                                }
                            })
                        }}
                    >Custom Tags</Text>
                    <Text style={styles.tips}
                        navigator={this.props.navigator}
                        onPress={()=>{
                            this.props.navigator.push({
                                component:SortTagPage,
                                params:{
                                    ...this.props
                                }
                            })
                        }}
                    >Sort Tags</Text>
                    <Text style={styles.tips}
                        navigator={this.props.navigator}
                        onPress={()=>{
                            this.props.navigator.push({
                                component:CustomTagPage,
                                params:{
                                    ...this.props,
                                    isRemoveTag:true,
                                }
                            })
                        }}
                    >Remove Tags</Text>
                </View> 
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tips: {
        fontSize: 15,
    }
});