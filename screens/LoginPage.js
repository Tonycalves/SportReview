import React from 'react';
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

import { WebBrowser } from 'expo';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import DialogInput from 'react-native-dialog-input';
import FirebaseLogin from "../co";
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.TitleText}>Welcome to SportReview, SignIn/SignUp to begin</Text>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/sports.jpg')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>
          <Container style={styles.container}>
            <DialogInput isDialogVisible={this.state.
                isDialogVisible}
                         title= {"Forgot Password"}
                         message={"Please input your email address"}
                         hintInput ={"john@test.com"}
                         submitInput={ (useremail) => {this.
                         sendReset(useremail)} }
                         closeDialog={ () => { this.setState({
                             isDialogVisible: this.state.isDialogVisible = false
                         })}}>
            </DialogInput>
            <Form>
              <Item>
                <Label>Email</Label>
                <Input onChangeText={(email) => this.setState({ email })}
                    autocorrect={false}/>
              </Item>
              <Item>
                <Label>Password</Label>
                <Input onChangeText={(password) => this.setState({ password })}
                    secureTextEntry={true}/>
              </Item>
              <Button style={{marginTop:10}} primary full
                      rounded onPress={() => this.loginUser(this.state.email, this.state.
                  password)}>
                <Text style={{color: 'white'}}>Login</Text>
              </Button>
              <Button style={{marginTop:10}} success full
                      rounded onPress={() => this.signUpUser(this.state.email, this.state.
                  password)}>
                <Text style={{color: 'white'}}>Sign Up</Text>
              </Button>
              <Button style={{marginTop:10}} warning full
                      rounded onPress={() => this.forgotPassword()}>
                <Text style={{color: 'white'}}>Forgot Password</
                    Text>
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </View>
    );
  }

    constructor(props) {
        super(props)
        this.state=({
            email: '',
        password: '',
        isDialogVisible: false
    })
    }

    // Function to signup a user with Firebase
    signUpUser = (email, password) => {
        try {
            if(this.state.password.length<6)
            {
                alert("Please enter at least 6 characters")
                return;
            }
            firebase.auth().createUserWithEmailAndPassword(email, password)
            alert("Congratulations, your account has been setup")
        }
        catch(error){
            console.log(error.toString())
        }
    };

    // Function to Login a user with Firebase
    loginUser = (email, password) => {
        try {
            if(this.state.email.length<10)
            {
              alert("Please enter a valid address email")
            }
            firebase.auth().signInWithEmailAndPassword(email,
                password).then((user) => {
                this.props.navigation.navigate('Home')
            })
        }
        catch(error) {
            console.log(error.toString())
        }
    };

    // Function to retrieve the password
    forgotPassword = () => {
        this.setState({
            isDialogVisible: this.state.isDialogVisible = true
        })
    };

    // Function to send the email for reseting the password
    sendReset = (useremail) => {
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(useremail).then(function()
        {
            alert("Password reset email has been sent")
        }).catch(function(error) {
            console.log(error)
        });
    }
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

export default HomeScreen;