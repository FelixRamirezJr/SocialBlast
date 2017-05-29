import React from 'react';
import { AppRegistry,Text,View,StyleSheet, TextInput, ScrollView, Button } from 'react-native';

var globals = require('../Utility/Global');
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

var FacebookLogin = React.createClass({

  getInitialState() {
    return { token: "", debuggerMessage: "" };
  },

  render: function() {
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    fetch(globals.API_URL + 'users/set_facebook_token', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        id: this.props.id,
                        token: data.accessToken.toString(),
                      })
                    }).then((response) => response.json())
                      .then((responseJson) => {
                        //this.props.setFacebook( data.accessToken.toString() );
                        this.setState({ debuggerMessage: "Called setFacebook" });
                        this.props.setFacebook( data.accessToken.toString() );
                         //this.setUser( String(responseJson.id) );
                         return "okay";
                    })
                    .catch(function(error){
                      this.setState({ debuggerMessage: "Failed" });
                      throw error;
                    });
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
          <Text> {this.state.debuggerMessage} </Text>
      </View>
    );
  }
});

export default FacebookLogin;
