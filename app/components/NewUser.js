import React, {Component} from 'react';
import { AppRegistry,Text,View,StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import TextField from 'react-native-md-textinput';


var formsStyles = require('../stylesheets/forms');
var app_css = require('../stylesheets/global_css');
var globals = require('../Utility/Global');
var helper = require('../Utility/Helper');


class NewUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      emailTemp: "",
      passwordTemp: "",
      user_set: this.props.user_set,
      invalidEmail: true,
      invalidPassword: true
    };
    this.submit = this.submit.bind(this);
  }


  submit(){
    if( helper.validateEmail(this.state.email) && this.state.password.length >= 5 )
    {
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
  }

  render (){
    let invalidEmail,invalidPassword = null;
    if(  !helper.validateEmail(this.state.email)  ){
      invalidEmail = <Text> Please enter a valid email address </Text>;
    } else {
      invalidEmail = <Text> </Text>;
    }
    if (this.state.password.length <= 5) {
      invalidPassword = <Text> Please enter at least 5 characters </Text>;
    } else {
      invalidPassword = <Text> </Text>;
    }

    return (
      <View style={app_css.container} >
        <Text style={ style.welcome }> Welcome to Network Blast </Text>
        <Text style={ style.details }> Thanks for downloading the Network Blast app! Before we continue, please provide an Email and Password for your account. </Text>
        <TextField label={'Email'}
                  onChangeText={(email) => this.setState({email})}
                   value={this.state.email}
                  highlightColor={globals.COLOR.PRIMARY_ACCENT}
                  inputStyle={{ height: globals.FORMS.INPUT_HEIGHT, lineHeight: globals.FORMS.INPUT_HEIGHT }}  />
        { this.state.invalidEmail ? invalidEmail : null }
       <TextField label={'Password'}
                  onChangeText={(password) => this.setState({password})}
                  value={this.state.password}
                  secureTextEntry={true}
                  style={style.last_input}
                  highlightColor={globals.COLOR.PRIMARY_ACCENT}
                  inputStyle={{ height: globals.FORMS.INPUT_HEIGHT, lineHeight: globals.FORMS.INPUT_HEIGHT }} />

      { this.state.invalidPassword ? invalidPassword : null }
      <Text> {"\n"} </Text>
      <Button
        style={style.button}
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
  },
  button: {
    marginTop: 30
  }
});


export default NewUser;
