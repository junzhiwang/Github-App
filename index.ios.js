/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import Boy from './Boy';
import {
    AppRegistry,
    StyleSheet,
    Navigator,
    Text,
    View,
    Image,
    ListView,
} from 'react-native';
import ListViewText from './ListViewText';
import FetchTest from './fetchtest';
import HttpUtils from './HttpUtils';
export default class imooc_gp extends Component {
    constructor(props) {
        super(props);
        //const ds=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
        this.state = {
            selectedTab:'tb_popular',
            //dataSource:ds.cloneWithRows
        };
    }
    render() {
        return (
            <View style={styles.container}>
               {/* <TabNavigator>
                  <TabNavigator.Item
                      selected={this.state.selectedTab === 'tb_pupular'}
                      selectedTitleStyle={{color:'red'}}
                      title="popular"
                      renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_polular.png')} />}
                      renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('./res/images/ic_polular.png')} />}
                      badgeText="1"
                      onPress={() => this.setState({ selectedTab: 'tb_pupular' })}>
                      <View style={styles.page1}></View>
                  </TabNavigator.Item>
                  <TabNavigator.Item
                      selected={this.state.selectedTab === 'tb_trending'}
                      selectedTitleStyle={{color:'yellow'}}
                      title="trending"
                      renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_trending.png')} />}
                      renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'blue'}]} source={require('./res/images/ic_trending.png')} />}
                      onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
                      <View style={styles.page2}></View>
                  </TabNavigator.Item>
                  <TabNavigator.Item
                      selected={this.state.selectedTab === 'tb_favorite'}
                      selectedTitleStyle={{color:'red'}}
                      title="favorite"
                      renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_favorite.png')} />}
                      renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('./res/images/ic_favorite.png')} />}
                      badgeText="1"
                      onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
                      <View style={styles.page1}></View>
                  </TabNavigator.Item>
                  <TabNavigator.Item
                      selected={this.state.selectedTab === 'tb_my'}
                      selectedTitleStyle={{color:'yellow'}}
                      title="my"
                      renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_my.png')} />}
                      renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'blue'}]} source={require('./res/images/ic_my.png')} />}
                      onPress={() => this.setState({ selectedTab: 'tb_my' })}>
                      <View style={styles.page2}></View>
                  </TabNavigator.Item>
                </TabNavigator>*/} 
                {/*<Navigator
                    initialRoute={{
                        component: Boy
                    }}
                    renderScene={(route, navigator)=>{
                        let Component=route.component;
                        return <Component navigator={navigator} {...route.params}/>
                    }}>
                </Navigator>*/}
                {/*<ListViewText />*/}
                <FetchTest />
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
        backgroundColor:'red',
    },
    page2: {
        flex:1,
        backgroundColor:'blue',
    },
    image: {
        height: 22,
        width: 22,
    },
});

AppRegistry.registerComponent('imooc_gp', () => imooc_gp);
