import * as React from "react";
import {StyleSheet, View,Text,Dimensions} from "react-native";
import {MapView, Location, Permissions} from 'expo';

import {CurrentLocationButton} from "../components/CurrentLocationButton";

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class Run extends React.Component {
constructor(props){
  super(props);

  this.state={
    region:null,
    routeCoordinates: [],
  };
  this._getLocationAsync();
}

componentDidMount() {
        navigator.geolocation.watchPosition(
            (position) => {
              const { routeCoordinates } = this.state;
                console.log(position);
                let region = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: 0.080,
                  longitudeDelta: 0.080,
                }
                this.setState({region: region})
                const { latitude, longitude } = position.coords;
                const newCoordinate = {
                  latitude,
                  longitude
                };
                console.log({ newCoordinate });
                this.setState({
                  latitude,
                  longitude,
                  routeCoordinates: routeCoordinates.concat([newCoordinate])
                });
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: false, timeout: 200, maximumAge: 1000},
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
        style={styles.map}
        >
        <MapView.Polyline coordinates={this.state.routeCoordinates} strokeWidth={7} />
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
    width:WIDTH,
    height:HEIGHT/3,
    paddingTop:600,
  },
});
