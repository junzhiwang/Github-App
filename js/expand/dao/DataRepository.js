import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import GitHubTrending from "../../util/trending/GitHubTrending";
export var FLAG_STORAGE = {
  flag_popular: "popular",
  flag_trending: "trending",
  flag_my: "my"
};
export default class DataRepository {
  constructor(flag) {
    this.flag = flag;
    if (flag === FLAG_STORAGE.flag_trending) {
      this.trending = new GitHubTrending();
    }
  }
  fetchRepository(url) {
    return new Promise((resolve, reject) => {
      this.fetchLocalRepository(url)
        .then(wrapData => {
          if (wrapData) {
            resolve(wrapData);
          } else {
            this.fetchNetRepository(url)
              .then(data => {
                resolve(data);
              })
              .catch(err => {
                reject(err);
              });
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  fetchLocalRepository(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (err, result) => {
        if (!err) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
          }
        } else {
          reject(err);
        }
      });
    });
  }
  fetchNetRepository(url) {
    return new Promise((resolve, reject) => {
      if (this.flag === FLAG_STORAGE.flag_trending) {
        this.trending
          .fetchTrending(url)
          .then(result => {
            if (!result) {
              reject(new Error("responseData is null"));
              return;
            } else {
              resolve(result);
              if (result && result.length > 0) {
                this.saveRepository(url, result);
              }
            }
          })
          .catch(err => {
            reject(err);
          });
      } else {
        fetch(url)
          .then(response => response.json())
          .catch(err => {
            reject(err);
          })
          .then(responseData => {
            if (!responseData) {
              reject(new Error("responseData is null"));
              return;
            }
            resolve(responseData);
            this.saveRepository(url, responseData.items || responseData);
          })
          .done();
      }
    });
  }
  saveRepository(url, items) {
    if (!url || !items) return;
    let wrapData;
    if (this.flag === FLAG_STORAGE.flag_my) {
      wrapData = { item: items, update_date: new Date().getTime() };
    } else {
      wrapData = { items: items, update_date: new Date().getTime() };
    }
    AsyncStorage.setItem(url, JSON.stringify(wrapData), err => {
      console.log(err);
    });
  }
  /**
   * Check if data is deprecated
   *
   */
  checkDate(longTime) {
    let cDate = new Date();
    let tDate = new Date();
    tDate.setTime(longTime);
    if (cDate.getDate() !== tDate.getDate()) return false;
    if (cDate.getHours() - tDate.getHours() > 4) return false;
    return true;
  }
}
