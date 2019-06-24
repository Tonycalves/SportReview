import React from "react";
import { Platform, StyleSheet, Text, View, Button,StatusBar, Image,TouchableOpacity,ImageBackground } from "react-native";
import MenuButton from '../components/MenuButton';
import {w, h, totalSize} from '../components/FirebaseLogin/api/Dimensions';

export default class Home extends React.Component {
  static navigationOptions = {
      drawerLabel: 'Home',
      drawerIcon: ({focused, tintColor}) => (
        <Image
          source={require('../assets/images/home.png')}
          style={{width:50, height:50}}
          />
      ),
  }

    render() {
        return (
        <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/backgroundmenu.jpg')}
          style={styles.background}
          resizeMode="stretch"
        >
        <Text style={styles.title}> Home </Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Activity")} style={styles.button}>
            <Text style={styles.text}>Start</Text>
        </TouchableOpacity>
        <MenuButton navigation={this.props.navigation} />
        </ImageBackground>

        <Button
        title="Go Back"
        onPress={() => this.props.navigation.goBack()} />
    </View>

    );
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: '100%',
        height:'10%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: w(2),
        backgroundColor: 'blue',
        borderRadius: w(10),
        marginTop: h(60),
    },
    text: {
        fontSize: 26,
        textTransform: 'uppercase',
        color: '#FFFFFF',
    },
    background: {
      width: '100%',
      height: '100%',
    },
    title: {
      marginLeft:h(18),
      marginTop:h(10),
      fontSize: 32,
      color: 'white',
    },
    headerText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
    }
});
