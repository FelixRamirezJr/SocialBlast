import React, {Component} from 'react';
import {AppRegistry,Text,View,StyleSheet} from 'react-native';
import { Root } from '../config/router';

export default class Main extends Component {
  render (){
    return (
      <Root> </Root>
    );
  }
}

var style = StyleSheet.create({
  header: {
    marginTop: 30,
    color: 'red'
  }
});

AppRegistry.registerComponent('Main', () => Main);
