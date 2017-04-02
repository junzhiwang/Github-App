import React, { Component } from 'react';
import {
    AsyncStorage,
} from 'react-native';
export var DATA_FLAG = {LOCAL:'Data fetched from local',NETWORK:'Data fetched from network', OBSOLETE_LOCAL:'No network connection, show obsolete data from local'};
export default class DataRepository{
	fetchRepository(url){
		return new Promise((resolve, reject)=>{
			this.fetchLocalRepository(url)
			.then(result=>{
				if(result && result.update_date && 
					this.checkDate(result.update_date) && 
						result.items.length > 0){
					result.from = DATA_FLAG.LOCAL;
					resolve(result);
				} else {
					this.fetchNetRepository(url)
					.then(result=>{
						let netResult = result && result.items ? 
								result : null;
						if(netResult && netResult.items && netResult.items.length > 0) {
							netResult.from = DATA_FLAG.NETWORK;
							resolve(netResult);
						} else {
							this.fetchLocalRepository(url)
							.then(result=>{
								if(result){
									result.from = DATA_FLAG.OBSOLETE_LOCAL;
									resolve(result);
								}
							})
							.catch(err=>{
								reject(err);
							})
						}
					})
					.catch(e=>{
						reject(e);
					})
				}
			})
			.catch(e=>{
				reject(e);
			})
		});
	}
	fetchLocalRepository(url){
		return new Promise((resolve, reject)=>{
			AsyncStorage.getItem(url,(err, result)=>{
				if(!err){
					try{
						resolve(JSON.parse(result));
					}
					catch(e){
						reject(e);
					}
				} else {
					reject(err);
				}
			});
		});
	}
	fetchNetRepository(url){
		return new Promise((resolve, reject)=>{
			fetch(url)
			.then(response=>response.json())
			.then(result=>{
				if(!result){
					reject(new Error('responseData is null'));
					return;
				}
				resolve(result);
				this.saveRepository(url,result.items);

			})
			.catch(err=>{
				reject(err);
			});
		});
	}
	saveRepository(url,items){
		if(!url||!items) return;
		let wrapData={items:items,update_date:new Date().getTime()};
		AsyncStorage.setItem(url,JSON.stringify(wrapData),(err)=>{
			console.log(err);
		});
	}
	/**
	 * Check if data is deprecated
	 *
	 */
	checkDate(longTime){
		let cDate = new Date();
		let tDate = new Date();
		tDate.setTime(longTime);
		if(cDate.getDate() !== tDate.getDate())return false;
		if(cDate.getHours() - tDate.getHours() > 4)return false;
		return true;
	}
}