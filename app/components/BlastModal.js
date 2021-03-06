import React, {Component} from 'react';
import {Modal,Text,View,StyleSheet, TouchableHighlight,Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import TextField from 'react-native-md-textinput';
import Toast from 'react-native-simple-toast';
import Loading from './Loading';
import NetworksToToggle from './NetworksToToggle';

var formsStyles = require('../stylesheets/forms');
var app_css = require('../stylesheets/global_css');
var globals = require('../Utility/Global');
var helper = require('../Utility/Helper');


class BlastModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      blasts: [],
      loaded: false,
      count: 0,
      debug: 0
    };
    this.close = this.close.bind(this);
    this.generateBlasts = this.generateBlasts.bind(this);
  }

  componentWillReceiveProps(props){
    this.generateBlasts();
    //this.setState({ loaded: false, blasts: [], count: "(Will Recieve Props)" });
  }

  generateBlasts(){
    return fetch('https://social-blast-api.herokuapp.com/get_blast_list?id=' + this.props.user_id)
    .then((response) => response.json())
    .then((responseJson) => {
      var newcount = this.state.count + 1;
      this.setState({ loaded: true,
                      blasts: responseJson,
                      count: "Called..."});
      return JSON.stringify(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  close(){
    this.props.closeEditBlast();
  }

  render (){

    if( this.props.visible == false ){
      return null;
    }
    var inModal = null;
    if( this.props.visible && this.state.loaded == false ){
      inModal = <Loading />;
    } else {
      inModal = this.state.blasts.map(function (item) {
         return (
           <NetworksToToggle
           active={item.active}
           name={item.name}
           key={item.id}
           id={item.id} />
         );
      });
    }

    return (
      <View style={{marginTop: 20}}>
        <Modal
           animationType={"slide"}
           transparent={false}
           visible={this.props.visible}
           onRequestClose={() => {alert("Modal has been closed.")}}
           >
          <View style={{marginTop: 22}}>
            <Button style={style.close} title="Done" onPress={this.props.closeEditBlast} />
            {inModal}
          </View>
         </Modal>
      </View>
    );
  }
}

var style = StyleSheet.create({
  close: {
    position: 'absolute',
    top: 30,
    right: 5
  }
});




export default BlastModal;
