import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { Permissions, Location } from 'expo';

import DrawNavigator from './navigation/DrawerNavigator';

import * as firebase from 'firebase';

const config = {
    apiKey : "AIzaSyA61waLI37mjtK7xISysVmNtjD1lgprGkI",
    authDomain : "sportreview-24f14.firebaseapp.com",
    databaseURL : "https://sportreview-24f14.firebaseio.com",
    projectId : "sportreview-24f14",
    storageBucket : "sportreview-24f14.appspot.com",
    messagingSenderId : "142327461188",
    appId: "1:142327461188:web:ca571dc49cb13999"
};

firebase.initializeApp(config);

export default class App extends Component {
    render() {
        return (
            <DrawNavigator />
        )
    }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
  },
});
