import React, {Component} from 'react';
import {AppRegistry,Text,View,StyleSheet} from 'react-native';
import { List, ListItem } from 'react-native-elements';

export default class Login extends Component {
  render (){
    return (
      <Text> Landing Page </Text>
    );
  }
}

var style = StyleSheet.create({
  header: {
    marginTop: 30,
    color: 'red'
  }
});

AppRegistry.registerComponent('Landing', () => Landing);
