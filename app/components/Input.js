import React, {Component} from 'react';
import { AppRegistry,Text,View,StyleSheet, TextInput } from 'react-native';
import { List, ListItem } from 'react-native-elements';

class Input extends Component {
  constructor(props){
    super(props);
  }
  render (){
    return (
      <View>
        <Text> {this.props.label} </Text>
        <TextInput> </TextInput>
      </View>
    );
  }
}

var style = StyleSheet.create({

  inputBoxes: {
    //borderBottom: '1px solid black',
  }

});


export default Input;
