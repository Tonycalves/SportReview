import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, StyleSheet, ImageBackground } from 'react-native';
import Login from './screens/Login';
import Register from './screens/Register';
import ForgotPassword from './screens/ForgotPassword';

import Settings from '../../screens/SettingsScreen';
import Home from '../../screens/Home';

import { w } from './api/Dimensions';

class FirebaseLogin extends Component {

  state = {
    currentScreen: 'login', // can be: 'login' or 'register' or 'forgot'
  };

  changeScreen = screenName => () => {
    this.setState({ currentScreen: screenName });
  };

  userSuccessfullyLoggedIn = (user) => {
    this.props.login(user);
  };

  render() {
    let screenToShow;

    switch(this.state.currentScreen) {
      case 'login':
        screenToShow = <Login change={this.changeScreen} success={this.userSuccessfullyLoggedIn}/>;
        break;
      case 'register':
        screenToShow = <Register change={this.changeScreen} />;
        break;
      case 'forgot':
        screenToShow = <ForgotPassword change={this.changeScreen}/>;
        break;
      case 'settings':
          screenToShow = <Settings change={this.changeScreen}/>;
        break;
      case 'home':
          screenToShow = <Home change={this.changeScreen}/>;
        break;
    }

    return (
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={-w(40)}
        style={styles.container}
      >
        <ImageBackground
          source={require('../../assets/images/backgroundmenu.jpg')}
          style={styles.background}
          resizeMode="stretch"
        >
          {screenToShow}
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  }
}

FirebaseLogin.propTypes = {
  login: PropTypes.func.isRequired,
};

FirebaseLogin.defaultProps = {
  background: null,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#555',
  },
  background: {
    width: '100%',
    height: '100%',
  }
});

export default FirebaseLogin;