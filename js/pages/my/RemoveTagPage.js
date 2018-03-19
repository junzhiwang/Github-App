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
export default class RemoveTagPage extends Component {
  constructor(props) {
    super(props);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
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
    data.checked = !data.checked;
    ArrayUtils.updateArray(this.changedValues, data);
  }
  renderCheckBox(data) {
    let leftText = data.name;
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
        isChecked={data.checked}
      />
    );
  }
  render() {
    let rightButton = (
      <TouchableOpacity onPress={() => this.onSave()}>
        <View style={{ margin: 10 }}>
          <Text style={styles.tips}>Remove</Text>
        </View>
      </TouchableOpacity>
    );
    let tags = this.renderView();
    return (
      <View style={styles.container}>
        <NavigationBar
          title="Remove Tags"
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
