import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  AsyncStorage
} from 'react-native';

import { List, ListItem } from 'react-native-elements';
import { simple,userKey, loadKey } from '../Utility/Helper';
import NewUser from '../components/NewUser';
import Home from '../components/Home';
import Loading from '../components/Loading';


var STORAGE_KEY = userKey();

class Blast extends Component {
  constructor(props){
    super(props);
    this.state = {test: "",
                  debuggerMessages: "",
                  user_id: "",
                  user_set: null,
                  email: "",
                  loaded: false,
                  current_user: null};
    this.loadUserData = this.loadUserData.bind(this);
    // Get logged in user
    this.getUser();
  }

    getUser = async () => {
    try {
      var value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null){
        this.setState({user_id: value});
        // Load user data via GET API Request
        this.loadUserData();
        this.setState({ debuggerMessages: value });
      } else {
        this.setState({ debuggerMessages: "Empty" });
        this.setState({ user_set: false });
        this.setState({ loaded: true });
      }
    } catch (error) {
      this.setState({ debuggerMessages: "Empty" });
    }
  };

  loadUserData() {
   return fetch('https://social-blast-api.herokuapp.com/users/' + this.state.user_id)
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({ current_user: responseJson,
                       loaded: true,
                       user_set: true,
                       debuggerMessages: "Complete"});
       return responseJson.email;
     })
     .catch((error) => {
       console.error(error);
     });
   }

  render() {
    return (
      <View>
        {this.state.loaded ? (
          <Home email={this.state.current_user.email} current_user={this.state.current_user} />
        ) : (
          <Loading />
        )}

      </View>
    );
  }
}

export default Blast;
