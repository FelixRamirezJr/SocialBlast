import React, { Component } from 'react';
import { Root, Tabs } from './config/router';
import { simple,userKey, loadKey } from './Utility/Helper';
import {
  Text,
  View,
  ScrollView,
  AsyncStorage
} from 'react-native';

import NewUser from './components/NewUser';
import Home from './components/Home';
import Loading from './components/Loading';
import LoginUser from './components/LoginUser';

var STORAGE_KEY = userKey();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {debugMessage: "",
                  user_id: "",
                  user_set: null,
                  email: "",
                  loaded: false,
                  componentToLoad: null,
                  current_user: null,
                  login: false };
    this.set_user = this.set_user.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  componentWillMount(){
    this.getUser();
  }

  getUser = async () => {
  try {
    var value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value !== null){
      this.setState({user_id: value});
      // Load user data via GET API Request
      this.loadUserData();
      this.setState({ debugMessage: value });
    } else {
      this.setState({ debugMessage: "Empty" });
      this.setState({ user_set: false });
      this.setState({ loaded: true });
    }
  } catch (error) {
    this.setState({ debugMessage: "Empty" });
  }
};

createUser(email,password){

}

logIn(){
  this.setState({ login: true });
}

set_user = async (value) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, value);
    this.setState({
      debugMessage: "saved" + value,
      user_id: value,
      user_set: true
    });
  } catch (error) {
    this.setState({ debugMessage: "Error" });
  }
};

loadUserData() {
 return fetch('https://social-blast-api.herokuapp.com/users/' + this.state.user_id)
   .then((response) => response.json())
   .then((responseJson) => {
     this.setState({
       debugMessage: "Loaded user via API",
       user_set: true,
       loaded: true
     });
     return responseJson.email;
   })
   .catch((error) => {
     console.error(error);
   });
 }

  render() {
    if(this.state.loaded)
    {
      if( this.state.user_set )
      {
        this.state.componentToLoad = <Root />
      }
      else if( this.state.login == false )
      {
        this.state.componentToLoad = <NewUser
                                      set_user = { this.set_user }
                                      logIn = { this.logIn } />
      }
      else
      {
        this.state.componentToLoad = <LoginUser logIn={ this.logIn }
                                      set_user = { this.set_user } />
      }
    }
    else
    {
      this.state.componentToLoad = <Loading/>;
    }

    return this.state.componentToLoad;
  }
}

export default App;
