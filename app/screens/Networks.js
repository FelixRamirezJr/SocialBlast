import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { users } from '../config/data';

class Networks extends Component {
  onLearnMore = () => {
    //this.props.navigation.navigate('Details', { ...user });
  };

  render() {
    return (
      <Text> List of Networks </Text>
    );
  }
}

export default Networks;
