import React, {Component, PropTypes} from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import RepositoryDetail from '../pages/RepositoryDetail';
export default class RepositoryCell extends Component{
	constructor(props) {
        super(props);
		this.state = {
			isFavorite:this.props.projectModel.isFavorite,
			favoriteIcon:this.props.projectModel.isFavorite ? require('../../res/images/ic_star.png')
             : require('../../res/images/ic_unstar_transparent.png')

		}
    }
    setFavoriteState(isFavorite){
        this.setState({
            isFavorite:isFavorite,
            favoriteIcon:isFavorite ? require('../../res/images/ic_star.png')
                : require('../../res/images/ic_unstar_transparent.png')
        })
    }
    onPressFavorite(){
        /** declare a local variable to avoid that async method change the {this.state.isFavorite}
            then cause some unexpected result (from debug)**/
        let isFavorite = this.state.isFavorite;
        this.setFavoriteState(!isFavorite);
        this.props.onFavorite(this.props.projectModel.item, !isFavorite);
    }
	render(){
        let item = this.props.projectModel.item ? this.props.projectModel.item
            : this.props.projectModel;
		let favoriteButton = <TouchableOpacity
				onPress = {()=>this.onPressFavorite()}>
					<Image
						style={[{height:22,width:22},{tintColor:'#2196F3'}]}
						source={this.state.favoriteIcon}/>
		    </TouchableOpacity>

		return <TouchableOpacity
			style={styles.container}
			onPress={()=>{
				this.props.navigator.push({
					component:RepositoryDetail,
					params:{
						...this.props,
					}
				})
			}}>
			<View style={styles.cell_container}>
        	    <Text style={styles.title}>{item.full_name}</Text>
        	    <Text style={styles.description}>{item.description}</Text>
        	    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        	    	<View style={{flexDirection:'row',alignItems:'center',}}>
        	    		<Text>Author: </Text>
        	    		<Image
        	    			style={{height:22,width:22}}
        	    			source={{uri:item.owner.avatar_url}}
        	    		/>
        	    	</View>
        	    	<View style={{flexDirection:'row',alignItems:'center'}}>
        	    		<Text>Stars:</Text>
        	    		<Text>{item.stargazers_count}</Text>
        	    	</View>
        	    			{favoriteButton}
        	    </View>
        	</View>
        </TouchableOpacity>
	}
}

const styles=StyleSheet.create({
	container:{
		flex:1
	},
	title:{
		fontSize:16,
		marginBottom:2,
		color:'#212121',
	},
	description:{
		fontSize:14,
		marginBottom:2,
		color:'#757575',
	},
	cell_container:{
		backgroundColor:'white',
		padding:10,
		marginLeft:5,
		marginRight:5,
		marginVertical:3,
		borderWidth:0.5,
		borderRadius:2,
		borderColor:'#dddddd',
		shadowColor:'gray',
		shadowOffset:{width:0.5,height:0.5},
		shadowOpacity:0.4,
		shadowRadius:1,
		elevation:2,
	},
})
