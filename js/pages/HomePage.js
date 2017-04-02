import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {
    StyleSheet,
    Navigator,
    Text,
    View,
    Image,
} from 'react-native';
import PopularPage from './popular/PopularPage';
import AsyncStoragePage from '../../AsyncStorage';
import MyPage from './my/MyPage'
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab:'tb_popular',
        };
    }
    render() {
        return (
            <View style={styles.container}>        
                <TabNavigator>
                   <TabNavigator.Item
                       selected={this.state.selectedTab === 'tb_popular'}
                       selectedTitleStyle={{color:'red'}}
                       title="popular"
                       renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')} />}
                       renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('../../res/images/ic_polular.png')} />}
                       onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
                       <PopularPage navigator={this.props.navigator}/>
                   </TabNavigator.Item>
                   <TabNavigator.Item
                       selected={this.state.selectedTab === 'tb_trending'}
                       selectedTitleStyle={{color:'blue'}}
                       title="trending"
                       renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')} />}
                       renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'blue'}]} source={require('../../res/images/ic_trending.png')} />}
                       onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
                       <AsyncStoragePage/>
                   </TabNavigator.Item>
                   <TabNavigator.Item
                       selected={this.state.selectedTab === 'tb_favorite'}
                       selectedTitleStyle={{color:'red'}}
                       title="favorite"
                       renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_favorite.png')} />}
                       renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('../../res/images/ic_favorite.png')} />}
                      
                       onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
                       <View style={styles.page1}></View>
                   </TabNavigator.Item>
                   <TabNavigator.Item
                       selected={this.state.selectedTab === 'tb_my'}
                       selectedTitleStyle={{color:'blue'}}
                       title="my"
                       renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_my.png')} />}
                       renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'blue'}]} source={require('../../res/images/ic_my.png')} />}
                       onPress={() => this.setState({ selectedTab: 'tb_my' })}>
                       <MyPage navigator={this.props.navigator}/>
                   </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    page1: {
        flex:1,
        backgroundColor:'white',
    },
    page2: {
        flex:1,
        backgroundColor:'white',
    },
    image: {
        height: 22,
        width: 22,
    },
});