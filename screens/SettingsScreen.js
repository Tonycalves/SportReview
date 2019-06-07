import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';

export default class SettingsScreen extends React.Component {

  render() {
      return (
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Container style={styles.container}>
          <Text style={styles.name}>
              {this.state.email}
          </Text>
            <Button style={{marginTop:10}} danger full
                    rounded onPress={() => this.signOutUser()}>
              <Text style={{color: 'white'}}>Sign Out</Text>
            </Button>
        </Container>
      </ScrollView>
    </View>
      );
  }

    constructor(props) {

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log("user: ", user.email);

            } else {
                // No user is signed in.
            }
        });
        super(props)
        this.state=({
            email: ''
        })


    }

    // Function to SignOut an User from Firebase
    signOutUser = () => {
        firebase.auth().signOut().then((user) => {
            this.props.navigation.navigate('Welcome')
        })
            .catch(function(error) {
            console.log(error)
        });
    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 350,
        height: 200,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    TitleText: {
        fontSize: 40,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
        marginTop: 19,
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});