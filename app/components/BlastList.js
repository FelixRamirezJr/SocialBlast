import React, {Component} from 'react';
import { AppRegistry,Text,View,StyleSheet, TextInput, ScrollView, TouchableHighlight } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import TextField from 'react-native-md-textinput';
import Toast from 'react-native-simple-toast';
import BlastModal from './BlastModal';

var formsStyles = require('../stylesheets/forms');
var app_css = require('../stylesheets/global_css');
var globals = require('../Utility/Global');
var helper = require('../Utility/Helper');


class BlastList extends Component {
  constructor(props){
    super(props);
    this.state = {
      blasts: this.props.blasts,
      modal: false
    };
    this.openEditBlast = this.openEditBlast.bind(this);
    this.closeEditBlast = this.closeEditBlast.bind(this);
  }

  openEditBlast(){
    console.log("Trying to open the modal");
    this.setState({ modal: true });
  }

  closeEditBlast(){
    console.log("Load user data should be called again...");
    this.props.loadUserData();
    this.setState({ modal: false });

  }

  render (){
    var contents = this.props.blasts.map(function (item) {
      if( item.active )
      {
       return (
         <View key={item.id} style={style.element}>
           <Text autoCapitalize={true} >{helper.uppercaseFirst(item.name)}</Text>
         </View>
       );
      }
    });
    return (
      <View style={style.container}>
        <View style={style.add}>
          <TouchableHighlight onPress={this.openEditBlast}>
            <Text style={style.add_text}>  Edit Blast List </Text>
          </TouchableHighlight>
        </View>
        {contents}
        <BlastModal blasts={this.props.blasts}
                    visible={this.state.modal}
                    user_id={this.props.user_id}
                    closeEditBlast={this.closeEditBlast} />
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
