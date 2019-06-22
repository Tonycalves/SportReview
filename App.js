import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import {
    createSwitchNavigator,
    createAppContainer,
    createDrawerNavigator,
    createBottomTabNavigator,
    createStackNavigator
} from 'react-navigation';

import FirebaseLogin from "./components/FirebaseLogin";
import Profile from './screens/ProfileActivity';
import Links from './screens/LinksScreen';
import Settings from './screens/SettingsScreen';
import Home from './screens/Home';

import * as firebase from 'firebase';
const config = {
    apiKey : "AIzaSyA61waLI37mjtK7xISysVmNtjD1lgprGkI",
    authDomain : "sportreview-24f14.firebaseapp.com",
    databaseURL : "https://sportreview-24f14.firebaseio.com",
    projectId : "sportreview-24f14",
    storageBucket : "sportreview-24f14.appspot.com",
    messagingSenderId : "142327461188",
};

firebase.initializeApp(config);

class App extends Component {
    render() {
        return <FirebaseLogin login={user => console.warn(user)}/>;
    }
}
export default App;

const DashboardTabNavigator = createBottomTabNavigator(
    {
        Profile,
        Links,
        Settings,
        Home
    },
    {
        navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state.routes[navigation.state.index];
            return {
                headerTitle: routeName
            };
        }
    }
);

const DashboardStackNavigator = createStackNavigator(
    {
        DashboardTabNavigator: DashboardTabNavigator
    },
    {
        defaultNavigationOptions: ({ navigation }) => {
            return {
                headerLeft: (
                    <Icon
                        style={{ paddingLeft: 10 }}
                        onPress={() => navigation.openDrawer()}
                        name="md-menu"
                        size={30}
                    />
                )
            };
        }
    }
);

const AppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: DashboardStackNavigator
    }
});

const AppSwitchNavigator = createSwitchNavigator({
    Welcome: { screen: FirebaseLogin },
    Home: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);
