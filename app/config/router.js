import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Blast from '../screens/Blast';
import Networks from '../screens/Networks';

export const BlastStack = StackNavigator({
  Blast: {
    screen: Blast,
    navigationOptions: {
      title: 'Blast',
    },
  },
  Details: {
    screen: UserDetail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
    }),
  },
});

export const NetworkStack = StackNavigator({
  Networks: {
    screen: Networks,
    navigationOptions: {
      title: 'Networks',
    },
  },
});

export const Tabs = TabNavigator({
  Feed: {
    screen: BlastStack,
    navigationOptions: {
      tabBarLabel: 'Blast',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  Networks: {
    screen: NetworkStack,
    navigationOptions: {
      tabBarLabel: 'Networks',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
});

export const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
    },
  },
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  Settings: {
    screen: SettingsStack,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
