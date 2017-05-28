import React, {Component} from 'react';
import { AppRegistry,Text,View,StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import TextField from 'react-native-md-textinput';
import Toast from 'react-native-simple-toast';



var formsStyles = require('../stylesheets/forms');
var app_css = require('../stylesheets/global_css');
var globals = require('../Utility/Global');


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      messageToBlast: ""
    };
    this.submit = this.submit.bind(this);
  }

  submit(){
    Toast.show('Your message has been blasted!',Toast.LONG);
    this.setState({ messageToBlast: "" });
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
      </View>
    );
  }
}


export default Home;
