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
    ImageBackground,
} from 'react-native';
import * as firebase from 'firebase';
import {w, h, totalSize} from '../components/FirebaseLogin/api/Dimensions';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import MenuButton from '../components/MenuButton';

export default class SettingsScreen extends React.Component {
  state = {
    currentUser: null
  };
  static navigationOptions = {
      drawerLabel: 'Settings',
      drawerIcon: ({focused, tintColor}) => (
        <Image
          source={require('../assets/images/settings.png')}
          style={{width:50, height:50}}
          />
      ),
  }

  componentDidMount() {
      const { currentUser } = firebase.auth();
      this.setState({ currentUser });
  }

  render() {
    const { currentUser } = this.state;
      return (
    <View style={styles.container}>
    <MenuButton navigation={this.props.navigation} />
    <ImageBackground
      source={require('../assets/images/backgroundblack.jpg')}
      style={styles.background}
      >
      <Image
        source={require('../assets/images/seb.jpg')}
        style={styles.ImageProfile}
        />
          <Text style={styles.title}>
            Email : {currentUser && currentUser.email}
          </Text>
          <Text>
          </Text>
            <Button style={{marginTop:600}} danger full
                    rounded onPress={() => this.signOutUser()}>
              <Text style={{color: 'white'}}>Sign Out</Text>
            </Button>
      </ImageBackground>
    </View>
      );
  }



    // Function to SignOut an User from Firebase
    signOutUser = () => {
        firebase.auth().signOut().then((user) => {
            this.props.navigation.navigate('Login')
        })
            .catch(function(error) {
            console.log(error)
        });
    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
      marginLeft:h(10),
      marginTop:h(3),
      fontSize: 20,
      color: 'white',
    },
    items: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ebebeb'
    },
    background: {
      width: '100%',
      height: '100%',
    },
    contentContainer: {
        paddingTop: 30,
    },
    ImageProfile: {
      width:120,
      height:120,
      borderRadius:60,
      marginLeft: h(16),
      marginTop: h(15),
    },
});
