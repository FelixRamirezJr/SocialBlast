import React, {Component} from 'react';
import { AppRegistry,Text,View,StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import TextField from 'react-native-md-textinput';


var formsStyles = require('../stylesheets/forms');
var app_css = require('../stylesheets/global_css');
var globals = require('../Utility/Global');


class NewUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      emailTemp: "",
      passwordTemp: "",
      user_set: this.props.user_set
    };
    this.emailUpdate = this.emailUpdate.bind(this);
    this.passwordUpdate = this.passwordUpdate.bind(this);
    this.submit = this.submit.bind(this);
  }

  emailUpdate(e){
    this.setState({
      emailTemp: e.target.value
    });
  }

  passwordUpdate(e){
    this.setState({
      passwordTemp: e.target.value
    });
  }

  submit(){
    //this.setState({ user_set: true });
    fetch('https://social-blast-api.herokuapp.com/users/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        this.props.set_user( String(responseJson.id) );
         //this.setUser( String(responseJson.id) );
         return responseJson.email;
    });

  }

  render (){
    return (
      <View style={app_css.container} >
        <Text style={ style.welcome }> Welcome to Network Blast </Text>
        <Text style={ style.details }> Thanks for downloading the Network Blast app! Before we continue, please provide an Email and Password for your account. </Text>
        <TextField label={'Email'}
                   onChangeText={(email) => this.setState({email})}
                   value={this.state.email}
                  highlightColor={globals.COLOR.PRIMARY_ACCENT} />
       <TextField label={'Password'}
                  onChangeText={(password) => this.setState({password})}
                  value={this.state.password}
                  secureTextEntry={true} />
      <Button
        onPress={this.submit}
        title="Create Account"
        color={globals.COLOR.BRAND_COLOR_DARKEN}
      />
      </View>
    );
  }
}

var style = StyleSheet.create({
  welcome: {
    textAlign: 'center',
    color: globals.COLOR.PRIMARY,
    fontSize: 25,
    marginBottom: 5
  },
  details: {
    color: globals.COLOR.SECONDARY_TEXT
  }
});


export default NewUser;
