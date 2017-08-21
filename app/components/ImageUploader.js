import React, {Component} from 'react';
import { AppRegistry,Text,View,StyleSheet, TextInput, Button, Image, Dimensions } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
var globals = require('../Utility/Global');
var win = Dimensions.get('window');


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
        this.setState({
          avatarSource: source
        });
        this.props.setPhoto( response.uri );
      }
    });

  }
  render (){
    var pictureUploaded = null;
    if ( this.state.avatarSource ) {
      pictureUploaded = <Image source={this.state.avatarSource}
                               style={{width: win.width - 40, height: win.height}}
                               />;
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
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: win.width,
    height: win.height,
  }
});


export default ImageUploader;
