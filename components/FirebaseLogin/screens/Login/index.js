import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import InputField from "../../components/InputField";
import {w, h, totalSize} from '../../api/Dimensions';
import * as firebase from 'firebase';

const companyLogo = require('../../assets/companylogo.png');
const email = require('../../assets/email.png');
const password = require('../../assets/password.png');


class Login extends React.Component {

  state = {
    isEmailCorrect: false,
    isPasswordCorrect: false,
    isLogin: false,
};

  getStarted = () => {
    const email = this.email.getInputValue();
    const password = this.password.getInputValue();

    this.setState({
      isEmailCorrect: email === '',
      isPasswordCorrect: password === '',
    }, () => {
      if(email !== '' && password !== ''){
        this.userLogin(email, password);
      } else {
        console.warn('Fill up all fields')
      }
    });
  };

  changeInputFocus = name => () => {
    if (name === 'Email') {
      this.setState({ isEmailCorrect: this.email.getInputValue() === '' });
      this.password.input.focus();
    } else {
      this.setState({ isPasswordCorrect: this.password.getInputValue() === '' });
    }
  };

    loginToFireBase = (email, password) => {
        this.setState({ isLogin: true });
        this.userLogin(email, password)
            .then(user => {
                if(user) this.props.success(user);
                this.setState({ isLogin: false });
            });
    };

    userLogin = (email, password) => {
        this.setState({ isLogin: true });
        firebase.auth().signInWithEmailAndPassword(email, password)
                .catch(error => {
                    switch (error.code) {
                        case 'auth/invalid-email':
                            console.warn('Invalid email address format.');
                            break;
                        case 'auth/user-not-found':
                        case 'auth/wrong-password':
                            console.warn('Invalid email address or password');
                            break;
                        default:
                            console.warn('Check your internet connection');
                    }
                }).then(user => {
                if (user) this.props.change('home')(),this.setState({ isLogin: true });
                    this.setState({ isLogin: true });
            });
    };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.icon} resizeMode="contain" source={companyLogo}/>
        <InputField
          placeholder="Email"
          keyboardType="email-address"
          style={styles.email}
          error={this.state.isEmailCorrect}
          focus={this.changeInputFocus}
          ref={ref => this.email = ref}
          icon={email}
        />
        <InputField
          placeholder="Password"
          returnKeyType="done"
          secureTextEntry={true}
          blurOnSubmit={true}
          error={this.state.isPasswordCorrect}
          ref={ref => this.password = ref}
          focus={this.changeInputFocus}
          icon={password}
        />

        <TouchableOpacity
            onPress={this.getStarted}
            style={styles.button}
            activeOpacity={0.6}
        >
            {this.props.isLogin
                ? <ActivityIndicator size="large" style={styles.spinner} color='white' />
                : <Text style={styles.text}>Sign in</Text>}
        </TouchableOpacity>


        <View style={styles.textContainer}>
          <TouchableOpacity onPress={this.props.change('register')} style={styles.touchable} activeOpacity={0.6}>
            <Text style={styles.createAccount}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.change('forgot')} style={styles.touchable} activeOpacity={0.6}>
            <Text style={styles.forgotPassword}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: w(70),
    height: h(30),
    marginTop: h(10),
    marginBottom: h(7),
  },
  textContainer: {
    width: w(100),
    flexDirection: 'row',
    marginTop: h(5),
  },
  email: {
    marginBottom: h(4.5),
  },
  touchable: {
    flex: 1,
  },
    button: {
        width: '85%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: w(2),
        backgroundColor: '#888',
        borderRadius: w(10),
        marginTop: h(8),
    },
    text: {
        color: 'white',
        fontWeight: '700',
        paddingVertical: h(1),
        fontSize: totalSize(2.1),
    },
    spinner: {
        height: h(5),
    },
  createAccount: {
    color:'#ffffffEE',
    textAlign: 'center',
    fontSize: totalSize(2),
    fontWeight: '600',
  },
  forgotPassword: {
    color:'#ffffffEE',
    textAlign: 'center',
    fontSize: totalSize(2),
    fontWeight: '600',
  },
});

export default Login;