import React, {Component} from 'react';
import {AppRegistry,Text,View,StyleSheet} from 'react-native';
import { List, ListItem } from 'react-native-elements';

class Login extends Component {
  render (){
    return (
      <Text> Login Screen </Text>
    );
  }
}

var style = StyleSheet.create({
  header: {
    marginTop: 30,
    color: 'red'
  }
});

export default Login;
