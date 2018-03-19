import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter
} from "react-native";
import HTMLView from "react-native-htmlview";
import RepositoryDetail from "./RepositoryDetail";
export default class TrendingCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.projectModel.isFavorite,
      favoriteIcon: this.props.projectModel.isFavorite
        ? require("../../res/images/ic_star.png")
        : require("../../res/images/ic_unstar_transparent.png")
    };
  }
  setFavoriteState(isFavorite) {
    this.setState({
      isFavorite: isFavorite,
      favoriteIcon: isFavorite
        ? require("../../res/images/ic_star.png")
        : require("../../res/images/ic_unstar_transparent.png")
    });
  }
  onPressFavorite() {
    /** declare a local variable to avoid that async method change the {this.state.isFavorite}
     then cause some unexpected result (from debug)**/
    let isFavorite = this.state.isFavorite;
    this.setFavoriteState(!isFavorite);
    this.props.onFavorite(this.props.projectModel.item, !isFavorite);
  }
  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener(
      "changeState",
      (isFavorite, id) => {
        if (id === this.props.projectModel.item.id)
          this.setFavoriteState(isFavorite);
      }
    );
  }
  componentWillUnmount() {
    this.listener && this.listener.remove();
  }
  componentWillReceiveProps(nextProps) {
    this.setFavoriteState(nextProps.projectModel.isFavorite);
  }
  render() {
    let favoriteButton = (
      <TouchableOpacity onPress={() => this.onPressFavorite()}>
        <Image
          style={[{ height: 22, width: 22 }, { tintColor: "#2196F3" }]}
          source={this.state.favoriteIcon}
        />
      </TouchableOpacity>
    );
    let data = this.props.projectModel.item;
    let description = "<p>" + data.description + "</p>";
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.props.navigator.push({
            component: RepositoryDetail,
            params: {
              item: data,
              ...this.props,
              isFavorite: this.state.isFavorite
            }
          });
        }}
      >
        <View style={styles.cell_container}>
          <Text style={styles.title}>{data.fullName}</Text>
          <HTMLView
            value={description}
            onLinkPress={url => {}}
            stylesheet={{
              p: styles.description,
              a: styles.description
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Text
              style={[styles.description, { marginRight: 10, color: "black" }]}
            >
              {data.language}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.description}>{data.meta}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Built by: </Text>
              {data.contributors.map((result, i, arr) => {
                return (
                  <Image
                    key={i}
                    style={{ height: 22, width: 22 }}
                    source={{ uri: arr[i] }}
                  />
                );
              })}
            </View>
            {favoriteButton}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const HTMLViewStyles = StyleSheet.create({
  a: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    color: "#757575"
  }
});
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: "#212121"
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: "#757575"
  },
  cell_container: {
    backgroundColor: "white",
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: "#dddddd",
    shadowColor: "gray",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2
  }
});
