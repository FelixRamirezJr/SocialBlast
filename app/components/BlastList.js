import React, {Component} from 'react';
import { AppRegistry,Text,View,StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import TextField from 'react-native-md-textinput';
import Toast from 'react-native-simple-toast';

var formsStyles = require('../stylesheets/forms');
var app_css = require('../stylesheets/global_css');
var globals = require('../Utility/Global');
var helper = require('../Utility/Helper');


class BlastList extends Component {
  constructor(props){
    super(props);
    this.state = {
      blasts: this.props.blasts
    };
  }

  render (){
    var contents = this.state.blasts.map(function (item) {
       return (
         <View key={item.id} style={style.element}>
           <Text autoCapitalize={true} >{helper.uppercaseFirst(item.name)}</Text>
         </View>
       );
    });
    return (
      <View style={style.container}>
        <View style={style.add}>
          <Text style={style.add_text}> Edit Blast List </Text>
        </View>
        {contents}
      </View>
    );
  }
}

var style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 30,
    position: "relative",
    paddingTop: 40,
    borderRadius: globals.BORDER.RADIUS
  },
  element: {
    borderBottomColor: '#47315a',
    borderBottomWidth: 1,
    paddingBottom: 5
  },
  add: {
    position: 'absolute',
    top: 5,
    right: 5
  },
  add_text: {
    color: globals.COLOR.PRIMARY_ACCENT
  }

});




export default BlastList;
