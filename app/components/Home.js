import React, {Component} from 'react';
import { AppRegistry,Text,View,StyleSheet, TextInput, ScrollView, Button,Platform, WebView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import TextField from 'react-native-md-textinput';
import Toast from 'react-native-simple-toast';
import BlastList from './BlastList';
import SafariView from 'react-native-safari-view';

import OAuthManager from 'react-native-oauth';


const manager = new OAuthManager('NetworkBlast');
manager.configure({
  twitter: {
    consumer_key: 'hjiiNZpvH4lsQ7TZDrLB5KliB',
    consumer_secret: '8uJYSCCGAc2rMsfSJHaBICve7SJfuru5SGeVtJmkffaI4vKOJA'
  }
});

var formsStyles = require('../stylesheets/forms');
var app_css = require('../stylesheets/global_css');
var globals = require('../Utility/Global');
var helper = require('../Utility/Helper');

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      messageToBlast: "",
      debug: ""
    };
    this.submit = this.submit.bind(this);
  }

  componentDidMount()
  {
    /*
    this.setState({ debug: "Just started..." });
    if( Platform.OS == 'android' ){
      manager.authorize('twitter')
        .then(resp => this.setState({debug: JSON.stringify(resp)}) )
        .catch(err => console.log(err));
    }
    else
    {
      var sendUrl = "https://network-blast.herokuapp.com/start_twitter?id=" + this.props.current_user.id;
      //var sendUrl = "https://www.google.com";
      SafariView.isAvailable()
        .then(SafariView.show({
          url: sendUrl
        }))
        .catch(error => {
          Toast.show("Can not show in safari...",Toast.LONG);
        });
        */
    }

  }

  submit()
  {
    if( this.state.messageToBlast.length == 0 ){
      Toast.show("Blast can't be blank",Toast.LONG);
      return false;
    }
    var blasted = 0;
    var temp = null;
    for(var i = 0; i < this.props.current_user.blasts.length; i++)
    {
      temp = this.props.current_user.blasts[i];
      if( temp.active  )
      {
        helper.blast(this.props.current_user,temp.name,this.state.messageToBlast);
        blasted++;
      }
    }

    if(blasted > 0)
    {
      Toast.show('Your message has been blasted!',Toast.LONG);
      this.setState( { messageToBlast: "" } );
    }
    else
    {
      Toast.show('You have no Networks to blast!',Toast.LONG);
    }

  }

  render (){
    return (
      <View style={app_css.container} >
        <Text>  Hello, { this.props.email }  </Text>
        <TextField label={'Message to blast'}
                  onChangeText={(messageToBlast) => this.setState({messageToBlast})}
                  value={this.state.messageToBlast}
                  highlightColor={globals.COLOR.PRIMARY_ACCENT}
                  inputStyle={{ height: globals.FORMS.INPUT_HEIGHT, lineHeight: globals.FORMS.INPUT_HEIGHT }}  />
        <Button
          onPress={this.submit}
          title="BLAST THIS MESSAGE"
          color={globals.COLOR.BRAND_COLOR_DARKEN}
        />

        <BlastList blasts={this.props.current_user.blasts}
                   user_id={this.props.current_user.id}
                   loadUserData={this.props.loadUserData} />
        <Text> {this.state.debug} </Text>
      </View>
    );
  }
}


export default Home;
