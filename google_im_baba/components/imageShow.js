import React from 'react'
import {View, Text, ToastAndroid, Alert, ActivityIndicator,PermissionsAndroid, ProgressBarAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
class ShowImage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            load:false,
            count:0,
            progress:0
        }
    }

    downloading = (e,i) => {
     let dirs = RNFetchBlob.fs.dirs;
     RNFetchBlob.config({
         path:dirs.DownloadDir+`/${this.props.keyword}/${this.props.keyword}-${i}.jpg`
     })
     .fetch(
         "GET",
         e
     ).
     progress((received, total) => {
        console.log("progress", received / total);
        this.setState({ progress: received / total });
      })
     .then(res => {
         console.log("**************************************************************************")
        var img = 'file://'+res.path()
        console.log(img)
         this.setState((state) => ({count:state.count+1,progress:100,load:true}))
         ToastAndroid.showWithGravity(
             "Your file has been downloaded",
             ToastAndroid.SHORT,
             ToastAndroid.BOTTOM
         )
     })
    }
    async downloadFile() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: "Storage Permission",
              message: "App needs access to memory to download the file "
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.props.url.map((e,i) => {this.downloading(e,i);this.setState({progress:0,load:false})})
          } else {
            Alert.alert(
              "Permission Denied!",
              "You need to give storage permission to download the file"
            );
          }
        } catch (err) {
          console.warn(err);
        }
      }
      componentDidMount(){
          this.downloadFile();
      }
    render(){

        return(
            <View style={{flex:1}}>
            <Text> Downloaded{this.state.count} of {this.props.url.length} </Text>
            {!this.state.load?
            (<ProgressBarAndroid
            styleAttr="Large"
            indeterminate={false}
            progress={this.state.progress}
            />):
            <Text>DOWNLOADED</Text>}
            </View>
        )
    }
}

export default ShowImage;