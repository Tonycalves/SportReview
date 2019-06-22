import * as React from "react";
import {StyleSheet, View,Text} from "react-native";
import {MapView, Location, Permissions} from 'expo';

import {CurrentLocationButton} from "../components/CurrentLocationButton";

export default class Run extends React.Component {
constructor(props){
  super(props);

  this.state={
    region:null,
    coords: []
  };
  this._getLocationAsync();
}

componentDidMount() {
        navigator.geolocation.watchPosition(
            (position) => {
                console.log(position);
                let region = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: 0.080,
                  longitudeDelta: 0.080,
                }
                this.setState({region: region})
                let coords = {
                  latitude : position.coords.latitude,
                  longitude: position.coords.longitude,
                }
                this.setState({coords: coords})
                console.log(coords);
                //TODO: send user location to server
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: false, timeout: 200000, maximumAge: 1000},
        );
    }


_getLocationAsync = async() => {
  const options = { enableHighAccuracy: true,distanceInterval: 1 };
  let location = await Location.getCurrentPositionAsync(options);
  let region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.080,
    longitudeDelta: 0.080,
  }
  this.setState({region: region})
  let coords = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  }
  this.setState({coords: coords})
}

centerMap(){
  const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.region;

  this.map.animateToRegion({
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  })
}
  render() {
    console.log("this.state.region : "+this.state.region.latitude);
    return (
      <View style={styles.container}>
      <Text>MapView</Text>
      <CurrentLocationButton cb={() => { this.centerMap() }}/>
      <MapView
        initialRegion={this.state.region}
        showsUserLocation={true}
        showsCompass={true}
        rotateEnabled={true}
        ref={(map) => {this.map = map}}
        style={{flex:1}}
        >

      </MapView>
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
