import React, { Component } from 'react';
import {
    StyleSheet,
    Navigator,
    Text,
    View,
} from 'react-native';
import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
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
                                    isRemoveTag:false,
                                    flag:FLAG_LANGUAGE.flag_key,
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
                                    ...this.props,
                                    flag:FLAG_LANGUAGE.flag_key,
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
                                    flag:FLAG_LANGUAGE.flag_key,
                                }
                            })
                        }}
                    >Remove Tags</Text>
                    <Text style={styles.tips}
                        navigator={this.props.navigator}
                        onPress={()=>{
                            this.props.navigator.push({
                                component:CustomTagPage,
                                params:{
                                    ...this.props,
                                    isRemoveTag:false,
                                    flag:FLAG_LANGUAGE.flag_language,
                                }
                            })
                        }}
                    >Custom langs</Text>
                    <Text style={styles.tips}
                        navigator={this.props.navigator}
                        onPress={()=>{
                            this.props.navigator.push({
                                component:SortTagPage,
                                params:{
                                    ...this.props,
                                    flag:FLAG_LANGUAGE.flag_language,
                                }
                            })
                        }}
                    >Sort langs</Text>
                    <Text style={styles.tips}
                        navigator={this.props.navigator}
                        onPress={()=>{
                            this.props.navigator.push({
                                component:CustomTagPage,
                                params:{
                                    ...this.props,
                                    isRemoveTag:true,
                                    flag:FLAG_LANGUAGE.flag_language,
                                }
                            })
                        }}
                    >Remove langs</Text>
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
