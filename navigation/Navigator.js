import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {
    createSwitchNavigator,
    createAppContainer,
    createDrawerNavigator,
    createBottomTabNavigator,
    createStackNavigator
} from 'react-navigation';

import LoginPage from '../screens/LoginPage';
import Profile from '../screens/ProfileActivity';
import Settings from '../screens/SettingsScreen';
import Links from '../screens/LinksScreen';

const DashboardTabNavigator = createBottomTabNavigator(
    {
        Profile,
        Settings,
        Links
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
    Dashboard: {
        screen: DashboardStackNavigator
    }
});

const AppSwitchNavigator = createSwitchNavigator({
    Welcome: { screen: LoginPage },
    Dashboard: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
