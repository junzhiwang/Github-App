import React, { Component } from "react";
import {
  StyleSheet,
  Navigator,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import ArrayUtils from "../../util/ArrayUtils";
import CheckBox from "react-native-check-box";
import ViewUtils from "../../util/ViewUtils";
import NavigationBar from "../../common/NavigationBar";
import LanguageDao, { FLAG_LANGUAGE } from "../../expand/dao/LanguageDao";
export default class CustomTagPage extends Component {
  constructor(props) {
    super(props);
    this.isRemoveTag = this.props.isRemoveTag;
    this.languageDao = new LanguageDao(this.props.flag);
    this.state = {
      dataArray: []
    };
    this.changedValues = [];
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    this.languageDao
      .fetch()
      .then(result => {
        this.setState({
          dataArray: result
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  renderView() {
    if (!this.state.dataArray || this.state.dataArray.length === 0) return null;
    let len = this.state.dataArray.length;
    let views = [];
    for (let i = 0; i < len; i += 2) {
      views.push(
        <View key={i}>
          <View style={styles.item}>
            {i < len ? this.renderCheckBox(this.state.dataArray[i]) : null}
            {i + 1 < len
              ? this.renderCheckBox(this.state.dataArray[i + 1])
              : null}
          </View>
          <View style={styles.line} />
        </View>
      );
    }
    return views;
  }
  onSave() {
    if (this.changedValues.length === 0) {
      this.props.navigator.pop();
      return;
    }
    if (this.isRemoveTag) {
      for (let i = 0; i < this.changedValues.length; ++i) {
        ArrayUtils.remove(this.state.dataArray, this.changedValues[i]);
      }
    }
    this.languageDao.save(this.state.dataArray);
    this.props.navigator.pop();
  }
  onBack() {
    if (this.changedValues.length == 0) {
      this.props.navigator.pop();
      return;
    }
    Alert.alert("Tips", "Save the modifications?", [
      {
        text: "Cancel",
        onPress: () => {
          this.props.navigator.pop();
        },
        style: "cancel"
      },
      {
        text: "OK",
        onPress: () => {
          this.onSave();
        }
      }
    ]);
  }
  onClick(data) {
    if (!this.isRemoveTag) data.checked = !data.checked;
    ArrayUtils.updateArray(this.changedValues, data);
  }
  renderCheckBox(data) {
    let leftText = data.name;
    let isChecked = this.isRemoveTag ? false : data.checked;
    return (
      <CheckBox
        onClick={() => this.onClick(data)}
        style={{ flex: 1 }}
        leftText={leftText}
        checkedImage={
          <Image
            style={{ tintColor: "#6495ED" }}
            source={require("../../../res/images/ic_check_box.png")}
          />
        }
        uncheckedImage={
          <Image
            style={{ tintColor: "#6495ED" }}
            source={require("../../../res/images/ic_check_box_outline_blank.png")}
          />
        }
        isChecked={isChecked}
      />
    );
  }
  render() {
    let rightButtonTitle = this.isRemoveTag ? "Remove" : "Save";
    let rightButton = (
      <TouchableOpacity onPress={() => this.onSave()}>
        <View style={{ margin: 10 }}>
          <Text style={styles.tips}>{rightButtonTitle}</Text>
        </View>
      </TouchableOpacity>
    );
    let tags = this.renderView();
    let title1 = this.props.isRemoveTag ? "Remove " : "Custom ";
    let title2 =
      this.props.flag === FLAG_LANGUAGE.flag_language ? "languages" : "tags";
    return (
      <View style={styles.container}>
        <NavigationBar
          title={title1 + title2}
          leftButton={ViewUtils.getLeftButton(() => this.onBack())}
          rightButton={rightButton}
        />
        <ScrollView>{tags}</ScrollView>
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
  title: {
    fontSize: 20,
    color: "white"
  },
  line: {
    height: 0.3,
    backgroundColor: "darkgray"
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5
  }
});
