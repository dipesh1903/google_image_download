import React from 'react';
import {Button, Text, View, ActivityIndicator, StyleSheet, ProgressBarAndroid} from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import download from '../utils/download.js'
import ShowImage from '../components/imageShow';
import { FlatList } from 'react-native-gesture-handler';
import  RNFetchBlob  from 'rn-fetch-blob';
export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:false,
            keyword:'',
            limit:'',
            urls:''
        }
    }
    static navigationOptions = {
        title:'Images'
    }
    componentDidMount(){

        const {navigation} = this.props;
        console.log(navigation.getParam('limit','2'))
        var res = {
            keyword:navigation.getParam('keyword','google'),
            limit:navigation.getParam('limit','2')
        }
        download(res).then(data =>{ 
        this.setState({urls:data['arrays'],value:true}
        );
    console.log(this.state.urls[0].index)
    }).catch(err => console.log(err))

        let dirs = RNFetchBlob.fs.dirs;
        RNFetchBlob.fs.mkdir(dirs.DownloadDir+`/${this.props.navigation.getParam('keyword','google')}`)
        // download({'keyword':navigation.getParam('keyword','google'),'limit':navigation.getParam('limit','2')}).then(data => console.log(data)).catch(err => console.log(err))
    }
    render() {

        return (
           !this.state.value?
            <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
            </View>:
            <View style={{display:'flex',justifyContent: 'center',alignItems: 'center',}}>
            <ShowImage url={this.state.urls} keyword={this.props.navigation.getParam('keyword','google')}></ShowImage>
            </View>
        )
        }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
  })