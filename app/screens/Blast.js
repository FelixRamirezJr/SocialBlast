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
import NewUser from '../components/NewUser';


var STORAGE_KEY = userKey();

class Blast extends Component {
  constructor(props){
    super(props);
    this.state = {test: "",
                  messages: "",
                  user_id: "",
                  user_set: false};
    this.loadUserData = this.loadUserData.bind(this);
  }

  componentDidMount(){
    this.setState({ messages: "Component did mount" });
    console.log("Test");
    this.setState({ messages: simple });
    this.getUser();
  }

    getUser = async () => {
    try {
      var value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null){

        this.setState({user_id: value});
        this.loadUserData();
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

  loadUserData() {
   return fetch('https://social-blast-api.herokuapp.com/users/' + this.state.user_id)
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
      <View>
        <NewUser />
      </View>
    );
  }
}

export default Blast;
