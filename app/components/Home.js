import React, {Component} from 'react';
import { AppRegistry,Text,View,StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import TextField from 'react-native-md-textinput';


var formsStyles = require('../stylesheets/forms');
var app_css = require('../stylesheets/global_css');


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }



  render (){
    return (
      <View style={formsStyles.container}>
        <Text> Welcome {this.props.email} </Text>
      </View>
    );
  }
}


export default Home;
