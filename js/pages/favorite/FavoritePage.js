import React, { Component } from "react";
import {
  StyleSheet,
  WebView,
  View,
  Text,
  TextInput,
  DeviceEventEmitter
} from "react-native";
import { FLAG_STORAGE } from "../../expand/dao/DataRepository";
import FavoriteTab from "./FavoriteTab";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import NavigationBar from "../../common/NavigationBar";
const URL = "https://www.google.com";
export default class FavoritePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let content = (
      <ScrollableTabView
        tabBarBackgroundColor="#2196F3"
        tabBarInactiveTextColor="mintcream"
        tabBarActiveTextColor="white"
        tabBarUnderlineStyle={{ backgroundColor: "#e7e7e7", height: 2 }}
        initialPage={0}
        renderTabBar={() => (
          <ScrollableTabBar
            style={{ height: 40, borderWidth: 0, elevation: 2 }}
            tabStyle={{ height: 39 }}
          />
        )}
      >
        <FavoriteTab
          {...this.props}
          tabLabel="Popular"
          flag={FLAG_STORAGE.flag_popular}
        />
        <FavoriteTab
          {...this.props}
          tabLabel="Trending"
          flag={FLAG_STORAGE.flag_trending}
        />
      </ScrollableTabView>
    );
    return (
      <View style={styles.container}>
        <NavigationBar
          title="Favorite"
          style={{ backgroundColor: "#2196F3" }}
        />
        {content}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tips: {
    fontSize: 20
  },
  addressbar: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#6495ED",
    margin: 4
  },
  input: {
    height: 40,
    flex: 1,
    borderWidth: 10
  }
});
