import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Blast from '../screens/Blast';
import Networks from '../screens/Networks';
import Settings from '../screens/Settings';

export const BlastStack = StackNavigator({
  Blast: {
    screen: Blast,
    navigationOptions: {
      title: 'Blast',
    },
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
  Blast: {
    screen: Blast,
    navigationOptions: {
      tabBarLabel: 'Blast',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  Networks: {
    screen: Networks,
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
