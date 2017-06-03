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
import FacebookLogin from '../components/AuthFacebook';
var app_css = require('../stylesheets/global_css');
var globals = require('../Utility/Global');
var helper = require('../Utility/Helper');


var STORAGE_KEY = userKey();

class Networks extends Component {
  constructor(props){
    super(props);
    this.state = {test: "",
                  debuggerMessages: "",
                  user_id: "",
                  user_set: null,
                  email: "",
                  loaded: false,
                  current_user: null,
                  fb_token: "",
                  fb_email: "",
                  fb_user_id: ""};
    this.loadUserData = this.loadUserData.bind(this);
    this.setFacebook = this.setFacebook.bind(this);
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
                       debuggerMessages: "Complete",
                       fb_token: responseJson.fb_token,
                       fb_email: responseJson.fb_email,
                       fb_name: responseJson.fb_name,
                       fb_user_id: responseJson.fb_user_id});
       return responseJson.email;
     })
     .catch((error) => {
       console.error(error);
     });
   }

   // Once login is successful this will save the information in the Back end
   setFacebook(token) {
     fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
     .then((response) => response.json())
     .then((json) => {
       // Some user object has been set up somewhere, build that user here
       this.setState({ fb_name: json.name, fb_email: json.email, fb_token: token, fb_user_id: json.id});
       helper.saveFacebookData( this.state.user_id, json.email, json.name, json.id ,token );
       return "Okay";
     })
     .catch(() => {
       reject('ERROR GETTING DATA FROM FACEBOOK')
     });
   }

  render() {
    var facebookText = null;
    if( this.state.fb_token.length > 1 ) {
      facebookText = <Text> You are authorized with {this.state.fb_name} </Text>;
    } else {
      facebookText = <Text> Authorize below with Facebook so you can add them to your Blast List </Text>;
    }
    return (
      <View style={app_css.container}>
        <Text> {this.state.debuggerMessages} | {this.state.fb_name} | {this.state.fb_email} </Text>
        {this.state.loaded ? (
          <FacebookLogin id={this.state.current_user.id} setFacebook={this.setFacebook}> </FacebookLogin>
        ) : (
          <Loading />
        )}
      </View>
    );
  }
}

export default Networks;
