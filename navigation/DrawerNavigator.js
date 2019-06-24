import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/Home';

import FirebaseLogin from '../components/FirebaseLogin';
import SettingsScreen from '../screens/SettingsScreen';
import Map from '../screens/map';
import Running from '../screens/activity';

const WIDTH = Dimensions.get('window').width

const MyDrawerNavigator = createDrawerNavigator(
    {
    Login:FirebaseLogin,
    Home:HomeScreen,
    Map:Map,
    Activity:Running,
    Settings:SettingsScreen,
  },
);

export default createAppContainer(MyDrawerNavigator);
