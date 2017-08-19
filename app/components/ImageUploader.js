import React, {Component} from 'react';
import { AppRegistry,Text,View,StyleSheet, TextInput, Button, Image } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
var globals = require('../Utility/Global');


var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class ImageUploader extends Component {

  constructor(props){
    super(props);
    this.state = {
      avatarSource: null
    }
    this.openPicker = this.openPicker.bind(this);
  }

  openPicker(){

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        //let source = { uri: 'data:image/jpeg;base64,' + response.data };
        Toast.show("Source",Toast.LONG);
        this.setState({
          avatarSource: source
        });
      }
    });

  }
  render (){
    var pictureUploaded = <Text> Not yet uploaded </Text>;
    if ( this.state.avatarSource ) {
      pictureUploaded = <Image source={this.state.avatarSource} style={{width: 40, height: 40}} />;
    }
    return (
      <View>
        <Button
          style={style.button}
          onPress={this.openPicker}
          title="Upload a photo"
          color={globals.COLOR.BRAND_COLOR_DARKEN}
        />
        {pictureUploaded}
      </View>
    );
  }
}

var style = StyleSheet.create({

});


export default ImageUploader;
