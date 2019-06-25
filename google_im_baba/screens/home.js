import React from 'react';
import {Button, Text, View, TextInput,Alert,Image} from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';


export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={keyword:'',limit:''}
    }
    static navigationOptions = {
        title:'Home'
    };
    check = () => {
        var url = "http://192.168.43.159:3000/images?keyword=lion&limit=1"
     console.log(url)
               fetch(url,{
                    method: "GET",
                })
                .then(res => res.json())
                .then(r => console.log(r))
    }
    render() {
        
        return (
            <View style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <Text style={{paddingTop:20,fontSize:30}}>Google Images</Text>
            <View style={{display:'flex',flexDirection:'row',paddingTop:20}}>
            <TextInput
            style={{flex:0.9,justifyContent:'center',borderWidth:2,color:'black',textAlign:'center'}} 
            placeholder="Keywords"
            onChangeText={(text)=>this.setState({keyword:text})}
            value={this.state.keyword}
            >
            </TextInput>
            </View>
            <View style={{display:'flex',flexDirection:'row',paddingTop:20,marginBottom:20}}>
            <TextInput
            style={{flex:0.9,justifyContent:'center',borderWidth:2,color:'black',textAlign:'center'}} 
            placeholder="how many images"
            onChangeText={(text)=>this.setState({limit:text})}
            value={this.state.limit}
            >
            </TextInput>
            </View>
            <Button style={{marginTop:20}} title="Show Time"
            onPress = {()=> {
                this.props.navigation.navigate('Images',{
                keyword:this.state.keyword,
                limit:this.state.limit
            } )}}
            ></Button>
            <Button title="hello" onPress={() => this.check()}>
            </Button>
            
            <Image
            style={{width:30,height:30}}
            source={{uri:'file:///storage/emulated/0/Download/Cat/Cat-0.jpg'}}
            ></Image>
            </View>
        )
    }
}