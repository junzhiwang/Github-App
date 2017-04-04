import React, {Component, PropTypes} from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
export default class TrendingCell extends Component{
	constructor(props) {
        super(props);
    }
	render(){
		return <TouchableOpacity
			style={styles.container}
			onPress={()=>{
				//this.props.navigator.push({
				//	component:RepositoryDetail,
				//	params:{
				//		item:this.props.data,
				//		...this.props,
				//	}
				//})
			}}
			>
			<View style={styles.cell_container}>
        	    <Text style={styles.title}>{this.props.data.fullName}</Text>
        	    <Text style={styles.description}>{this.props.data.description}</Text>
        	  	<Text style={styles.description}>{this.props.data.language}</Text>
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