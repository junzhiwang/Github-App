import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ListView,
    RefreshControl
} from 'react-native';
import NavigationBar from './js/common/NavigationBar';
import Toast, {DURATION} from 'react-native-easy-toast';
var data = {
        "result": [
            {
                "email": "u.jackson@white.edu",
                "fullname": "vpml"
            },
            {
                "email": "l.gonzalez@smith.co.uk",
                "fullname": "itgwfxeh"
            },
            {
                "email": "n.garcia@williams.io",
                "fullname": "hrhr"
            },
            {
                "email": "w.jones@anderson.edu",
                "fullname": "tqarjzjqj"
            },
            {
                "email": "b.miller@rodriguez.org",
                "fullname": "snupeis"
            },
            {
                "email": "e.jones@lee.gov",
                "fullname": "deetuomukg"
            },
            {
                "email": "t.martinez@williams.co.uk",
                "fullname": "hwejlcj"
            },
            {
                "email": "c.moore@martin.co.uk",
                "fullname": "ghvotzhv"
            },
            {
                "email": "t.harris@lewis.edu",
                "fullname": "whiqzl"
            },
            {
                "email": "w.wilson@lee.edu",
                "fullname": "flmiinq"
            },
            {
                "email": "f.hall@thomas.net",
                "fullname": "upbd"
            },
            {
                "email": "d.lewis@anderson.edu",
                "fullname": "lqs"
            },
            {
                "email": "x.wilson@williams.co.uk",
                "fullname": "bqistb"
            },
            {
                "email": "u.lee@moore.io",
                "fullname": "twhlg"
            },
            {
                "email": "g.davis@robinson.co.uk",
                "fullname": "zuol"
            },
            {
                "email": "b.lee@hernandez.edu",
                "fullname": "amffweeask"
            },
            {
                "email": "i.davis@davis.gov",
                "fullname": "gajicl"
            },
            {
                "email": "k.martin@gonzalez.co.uk",
                "fullname": "dhguu"
            },
            {
                "email": "b.taylor@moore.edu",
                "fullname": "piiryfatsq"
            },
            {
                "email": "g.taylor@jones.io",
                "fullname": "jeduovu"
            }
        ]
}
export default class ListViewText extends Component{
    renderRow(item){
        return <View style={styles.row}>
            <TouchableOpacity
                onPress={()=>{
                    this.toast.show('you click '+item.fullname,DURATION.LENGTH_LONG);
                }}>
                <Text style={styles.text}>{item.email}</Text>
                <Text style={styles.text}>{item.fullname}</Text>
            </TouchableOpacity>
        </View>
    }
    renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return <View key={rowID} style={styles.line}></View>
    }
    renderHeader(){
        return <Text>HEAD</Text>
    }
    renderFooter(){
        return <Image style={{width:400,height:100}}source={{url:'https://images.gr-assets.com/hostedimages/1406479536ra/10555627.gif'}}></Image>
    }
    onLoad(){
        this.setState({
            isLoading:true
        })
        setTimeout(()=>{
            this.setState({
                isLoading:false
            })
        }, 2000);
    }
    render(){
        return(
            <View style={styles.container}>
                <NavigationBar 
                    title='ListView'
                    style={{backgroundColor:'gray'}}
                />
                <ListView 
                    dataSource={this.state.dataSource}
                    renderRow={(item)=>this.renderRow(item)}
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted)=>this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                    renderHeader={()=>this.renderHeader()}
                    renderFooter={()=>this.renderFooter()}
                    refreshControl={
                        <RefreshControl      
                            refreshing={this.state.isLoading}
                            onRefresh={()=>this.onLoad()}
                        />
                    }
                />
                <Toast ref={(toast)=>{this.toast=toast}}/>
            </View>
        )
    }

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged:(r1, r2)=>r1!==r2});
        this.state={
            dataSource:ds.cloneWithRows(data.result),
            isLoading:true,
        }
        this.onLoad();
    }
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        fontSize:18,
        marginLeft:20
    },
    row: {
        height:50,
    },
    subcontainer: {
        marginLeft:10,
        marginTop:10,
    },
    line: {
        height:1,
        backgroundColor:'black'
    }
});
