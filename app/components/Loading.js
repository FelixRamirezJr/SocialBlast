import React, {Component} from 'react';
import { ActivityIndicator ,AppRegistry,Text,View,StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import TextField from 'react-native-md-textinput';


var formsStyles = require('../stylesheets/forms');
var app_css = require('../stylesheets/global_css');


class Loading extends Component
{
  constructor(props){
    super(props);
    this.state = {
      animation: true,
    };
  }



  render (){
    return (
      <ActivityIndicator
        animating={this.state.animating}
        style={[styles.centering, {height: 80}]}
        size="large"
      />
    );
  }
}

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
});


export default Loading;
