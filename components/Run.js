import * as React from "react";
import {StyleSheet, View,Text} from "react-native";
import {MapView, Location} from 'expo';

const {Marker, Polyline } = MapView;

export default class Run extends React.Component {
constructor(props){
  super(props);

  this.state={
    region:null,
  }
  this._getLocationAsync();
}

_getLocationAsync = async() =>{
  let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
  let region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.045,
    longitudeDelta: 0.045,
  }

  this.setState({region: region})
}
  render() {
    return (
      <View style={styles.container}>
      <Text>MapView</Text>
      <MapView
        initialRegion={this.state.region}
        showUserLocation={true}
        showsCompass={true}
        rotateEnabled={false}
        style={{flex:1}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  map: {
    flex:1,
  },
});
