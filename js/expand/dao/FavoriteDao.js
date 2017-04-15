import React, { Component } from 'react';
import {
    AsyncStorage,
} from 'react-native';
import keys from '../../../res/data/keys.json';
import langs from '../../../res/data/langs.json';
const FAVORITE_KEY_PREFIX='favorite_';
export default class FavoriteDao {
	constructor(flag){
		this.flag = flag;
        this.favoriteKey = FAVORITE_KEY_PREFIX + flag;
    }

    saveFavoriteItems(key, value, callback){
        AsyncStorage.setItem(key, value, (err)=>{
            if(!err){
                this.updateFavoriteKeys(key, true);
            }
        });
    }

    updateFavoriteKeys(key, isAdd){
        AsyncStorage.getItem(this.favoriteKey,(err, result)=>{
            if(!err){
                let favoriteKeys = result ? JSON.parse(result) : [];
                var index = favoriteKeys.indexOf(key);
                if(isAdd && index === -1){
                    favoriteKeys.push(key);
                } else if(!isAdd && index !== -1){
                    favoriteKeys.splice(index, 1);
                }
                AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys));
            }
        });
    }

    getFavoriteKeys(){
        return new Promise((resolve, reject)=>{
            AsyncStorage.getItem(this.favoriteKey, (err, result)=>{
                if(!err){
                    try{
                        resolve(JSON.parse(result));
                    } catch(e){
                        reject(e);
                    }
                } else {
                    reject(e);
                }
            });
        });
    }

    removeFavoriteItems(key){
        AsyncStorage.removeItem(key, err=>{
            if(!err){
                this.updateFavoriteKeys(key,false);
            }
        })
    }

    getAllItems(){
        return new Promise((resolve, reject)=>{
            this.getFavoriteKeys()
            .then(keys=>{
                let items = [];
                if(keys){
                    AsyncStorage.multiGet(keys, (err, stores)=>{
                        if(err) reject(err);
                        else {
                            try{
                                stores.map((result, i, store)=>{
                                    store[i][1]&&items.push(JSON.parse(store[i][1]));
                                });
                                resolve(items);
                            }catch(e){reject(e)}
                        }
                    });
                } else {
                    resolve(JSON.parse(items));
                }
            }).catch(err=>reject(err));
        })
    }
}
