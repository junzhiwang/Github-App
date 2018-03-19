import { AsyncStorage } from "react-native";
import DataRepository, { FLAG_STORAGE } from "./DataRepository";
import Utils from "../../util/Utils";
import FavoriteDao from "./FavoriteDao";
export default class RepositoryUtil {
  constructor(aboutCommon) {
    this.aboutCommon = aboutCommon;
    this.dataRepository = new DataRepository(FLAG_STORAGE.flag_popular);
    this.itemMap = new Map();
  }

  updateData(k, v) {
    itemMap.set(k, v);
    let arr = [];
    for (let value of itemMap.values()) {
      arr.push(value);
    }
    this.aboutCommon.onNotifyDataChanged(arr);
  }

  fetchRepository(url) {
    this.dataRepository
      .fetchRepository(url)
      .then(result => {
        if (result) {
          this.updateData(url, result);
          if (!Utils.checkDate(result.update_date))
            return this.dataRepository.fetchNetRepository(url);
        }
      })
      .then(item => {
        if (item) {
          this.updateData(url, item);
        }
      })
      .catch(err => {});
  }

  fetchRepositories(urls) {
    for (let i = 0; i < urls.length; ++i) {
      let url = urls[i];
      this.fetchRepository(url);
    }
  }
}
