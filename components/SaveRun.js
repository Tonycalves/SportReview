import React from 'react';
import {View, StyleSheet, Dimensions,TouchableOpacity,Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export const SaveRunButton = function(props){
  const cb = props.cb ? props.cb : () => console.log('callback');
  const bottom = props.bottom ? props.bottom : 65;
  return(
    <View style={[styles.container, {top:HEIGHT - 490}]}>
        <TouchableOpacity onPress={() => { cb() }}>
            <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    zIndex: 9,
    position: 'absolute',
    width:200,
    height:45,
    backgroundColor: '#1ED109',
    right: WIDTH-285,
    borderRadius:50,
    shadowColor: '#000000',
    elevation:7,
    shadowRadius:5,
    shadowOpacity:1.0,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
      fontSize: 26,
      color: 'black',
  },
})
