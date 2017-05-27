import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { users } from '../config/data';

class Feed extends Component {
  onLearnMore = () => {
    //this.props.navigation.navigate('Details', { ...user });
  };

  render() {
    return (
      <Text> Blast </Text>
    );
  }
}

export default Feed;
