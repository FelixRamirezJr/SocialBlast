import React, {Component} from 'react';
import { AppRegistry,Text,View,StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import TextField from 'react-native-md-textinput';


var formsStyles = require('../stylesheets/forms');
var app_css = require('../stylesheets/global_css');
var globals = require ('../Utility/Global');


class Errors extends Component {
  constructor(props){
    super(props);
    this.state = {
      errors: []
    };
  }



  render (){
    var errors = [];
    for(var i = 0; i < this.props.errors.length; i++)
    {
      errors.push(<Text style={formsStyles.error}> {this.props.errors[i]} </Text>);
    }

    return (
      <View style={formsStyles.container}>
        {errors}
      </View>
    );
  }
}



export default Errors;
