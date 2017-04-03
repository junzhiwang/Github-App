import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {
    StyleSheet,
    Navigator,
    Text,
    View,
    Image,
    DeviceEventEmitter,
} from 'react-native';
import FavoritePage from './FavoritePage';
import Toast,{DURATION} from 'react-native-easy-toast';
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
    componentDidMount(){
      this.listener = DeviceEventEmitter.addListener('showToast',(text)=>{
          this.toast.show(text,DURATION.LENGTH_LONG);
      });
    }
    componentWillUnmount(){
      this.listener&&this.listener.remove();
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
                       <PopularPage {...this.props}/>
                   </TabNavigator.Item>
                   <TabNavigator.Item
                       selected={this.state.selectedTab === 'tb_trending'}
                       selectedTitleStyle={{color:'blue'}}
                       title="trending"
                       renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')} />}
                       renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'blue'}]} source={require('../../res/images/ic_trending.png')} />}
                       onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
                       <AsyncStoragePage {...this.props}/>
                   </TabNavigator.Item>
                   <TabNavigator.Item
                       selected={this.state.selectedTab === 'tb_favorite'}
                       selectedTitleStyle={{color:'red'}}
                       title="favorite"
                       renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_favorite.png')} />}
                       renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('../../res/images/ic_favorite.png')} />}
                      
                       onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
                       <FavoritePage {...this.props}/>
                   </TabNavigator.Item>
                   <TabNavigator.Item
                       selected={this.state.selectedTab === 'tb_my'}
                       selectedTitleStyle={{color:'blue'}}
                       title="my"
                       renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_my.png')} />}
                       renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'blue'}]} source={require('../../res/images/ic_my.png')} />}
                       onPress={() => this.setState({ selectedTab: 'tb_my' })}>
                       <MyPage {...this.props}/>
                   </TabNavigator.Item>
                </TabNavigator>
                <Toast ref={toast=>this.toast=toast}/>
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