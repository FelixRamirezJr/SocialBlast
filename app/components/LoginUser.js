import React, {Component} from 'react';
import { AppRegistry,Text,View,StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import TextField from 'react-native-md-textinput';
import Toast from 'react-native-simple-toast';

var formsStyles = require('../stylesheets/forms');
var app_css = require('../stylesheets/global_css');
var globals = require('../Utility/Global');
var helper = require('../Utility/Helper');

class LoginUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      emailTemp: "",
      passwordTemp: "",
      invalidPassword: "",
      invalidEmail: ""
    };
    this.submit = this.submit.bind(this);
  }

  submit(){
    if( this.state.email.length > 0 && this.state.password.length > 0)
    {
      fetch('https://social-blast-api.herokuapp.com/users/login', {
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
          Toast.show("There was a response",Toast.LONG);
          if ( !(JSON.stringify(responseJson).indexOf("error") > -1) ){
            this.props.set_user( String(responseJson.id) );
          } else {
            Toast.show("Incorrect email or password",Toast.LONG);
          }
           return responseJson.email;
      }).catch(function(error){
        Toast.show(error.message,Toast.LONG);
      });
    }
  }

  render (){
    return (
      <View style={app_css.container}>
        <TextField label={'Email'}
                  onChangeText={(email) => this.setState({email})}
                   value={this.state.email}
                  highlightColor={globals.COLOR.PRIMARY_ACCENT}
                  inputStyle={{ height: globals.FORMS.INPUT_HEIGHT, lineHeight: globals.FORMS.INPUT_HEIGHT }}  />
         <TextField label={'Password'}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    secureTextEntry={true}
                    style={style.last_input}
                    highlightColor={globals.COLOR.PRIMARY_ACCENT}
                    inputStyle={{ height: globals.FORMS.INPUT_HEIGHT, lineHeight: globals.FORMS.INPUT_HEIGHT }} />

        <Button
          style={style.button}
          onPress={this.submit}
          title="Login"
          color={globals.COLOR.BRAND_COLOR_DARKEN}
        />
      </View>
    );
  }
}

var style = StyleSheet.create({
  header: {
    marginTop: 30,
    color: 'red'
  },
  button: {
    marginTop: 20
  }
});

export default LoginUser;
