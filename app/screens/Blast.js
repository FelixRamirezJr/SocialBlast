import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { users } from '../config/data';
import { simple,userKey, loadKey } from '../Utility/Helper';

var STORAGE_KEY = userKey();

class Blast extends Component {
  constructor(props){
    super(props);
    this.state = {test: "", messages: ""};
    this.getTest = this.getTest.bind(this);
  }

  componentDidMount(){
    this.setState({ messages: "Component did mount" });
    console.log("Test");
    this.getTest();
    this.setState({ messages: simple });
    this.getUser();
  }

    getUser = async () => {
    try {
      var value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null){
        this.setState({ messages: value });
      } else {
        this.setState({ messages: "Empty" });
      }
    } catch (error) {
      this.setState({ messages: "Empty" });
    }
  };

  setUser = async (value) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, value);
      this.setState({ messages: "saved: " + value });
    } catch (error) {
      this.setState({ messages: "Error" });
    }
  };

  getTest() {
   return fetch('https://social-blast-api.herokuapp.com/test')
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({ messages: "YAY" });
       this.setState({ test: responseJson.email });
       //this.setUser( String(responseJson.id) );
       return responseJson.email;
     })
     .catch((error) => {
       console.error(error);
     });
   }

   isLoggedIn() {

   }

  render() {
    return (
      <Text> Blast {this.state.test} |  {this.state.messages}  </Text>
    );
  }
}

export default Blast;
