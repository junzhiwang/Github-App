import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    AsyncStorage,
} from 'react-native';
const KEY = 'text';
import NavigationBar from './js/common/NavigationBar';
import Toast,{DURATION} from 'react-native-easy-toast';
export default class AsyncStoragePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    onSave(data){
    	AsyncStorage.setItem(KEY,this.text,(err)=>{
    		if(!err){
    			this.toast.show('save succeed',DURATION.LENGTH_LONG);
    		}else{
    			this.toast.show('save failed',DURATION.LENGTH_LONG);
    		}
    	});
    }
    onRemove(){
    	AsyncStorage.removeItem(KEY,(err)=>{
    		if(!err){
    			this.toast.show('remove succeed',DURATION.LENGTH_LONG);
    		}else{
    			this.toast.show('remove failed',DURATION.LENGTH_LONG);
    		}
    	});
    }
    onFetch(){
    	AsyncStorage.getItem(KEY,(err,result)=>{
    		if(!err){
    			if(result!==''&&result!==null){
    				this.toast.show('fetched data is: ' + result);
    			} else {
    				this.toast.show('null key');
    			}
    		} else {
    			this.toast.show('fetch failed');
    		}
    	})
    }
    render() {
        return (
            <View style={styles.container}>        
                <NavigationBar
                	title='AsyncStorageTest'
                	style={{backgroundColor:'#6495ED'}}
                />
                <TextInput
                	onChangeText={text=>this.text=text} 
                	style={{borderWidth:1,height:40,margin:6}}/>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             		<Text style={styles.tips}
             			  onPress={()=>this.onSave()}>
             		Save</Text>
             		<Text style={styles.tips}
             			  onPress={()=>this.onRemove()}>
             		Remove</Text>
             		<Text style={styles.tips}
             			  onPress={()=>this.onFetch()}>
             		Fetch</Text>
             	</View>
             	<Toast ref={toast=>this.toast=toast}/>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tips: {
        fontSize: 20,
    }
});