import React, {Component} from 'react';
import {Text,View,StyleSheet, Switch } from 'react-native';
import Toast from 'react-native-simple-toast';
import Loading from './Loading';

var formsStyles = require('../stylesheets/forms');
var app_css = require('../stylesheets/global_css');
var globals = require('../Utility/Global');
var helper = require('../Utility/Helper');


class NetworksToToggle extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: this.props.active
    };
    this.valueChange = this.valueChange.bind(this);
  }

  valueChange(value){
    this.setState({selected: value});
    // Will toggle a blast item or inactive in the database for storage
    console.log("Trying to change to: " + value);
    helper.changeBlastActivity( this.props.id , value );
  }


  render (){
    return (
      <View style={[app_css.container,style.network]} >
        <Switch
          onValueChange={this.valueChange}
          style={{marginBottom: 10}}
          value={this.state.selected}
          />
          <Text style={style.name}> {helper.uppercaseFirst(this.props.name)} </Text>
          <Text> {this.props.active} </Text>
      </View>
    );
  }
}

var style = StyleSheet.create({
  name: {
    position: "absolute",
    top: 15,
    left: 70
  },
  network: {
    borderBottomColor: '#47315a',
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5
  }
});




export default NetworksToToggle;
