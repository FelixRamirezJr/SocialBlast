import React, {Component} from 'react';
import { AppRegistry,Text,View,StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import TextField from 'react-native-md-textinput';


var formsStyles = require('../stylesheets/forms');
var app_css = require('../stylesheets/global_css');


class NewUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      emailTemp: "",
      passwordTemp: ""
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
    });

  }

  render (){
    return (
      <View style={formsStyles.container} >
        <Text> Hello! Please provide an email and password to use Social Blast </Text>
        <TextField label={'Email'}
                   onChangeText={(email) => this.setState({email})}
                   value={this.state.email} />
       <TextField label={'Password'}
                  onChangeText={(password) => this.setState({password})}
                  value={this.state.password}
                  secureTextEntry={true} />
      <Button
        onPress={this.submit}
        title="Create Account"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      </View>
    );
  }
}

var style = StyleSheet.create({

  inputBoxes: {
    height: 20,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});


export default NewUser;
