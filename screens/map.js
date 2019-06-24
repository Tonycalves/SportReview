import * as React from 'react';
import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import {MapView, Location, Permissions} from 'expo';
import * as turf from '@turf/turf';
import {CurrentLocationButton} from '../components/CurrentLocationButton';
import Monitor from '../components/Monitor';
import MenuButton from '../components/MenuButton';


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


type Position = {
  coords: {
    accuracy: number,
    altitude: number,
      altitudeAccuracy: number,
      heading: number,
      latitude: number,
      longitude: number,
      speed: number,
    },
    timestamp: number,
};

export default class Profile extends React.Component {
  static navigationOptions = {
      drawerLabel: 'Map',
      drawerIcon: ({focused, tintColor}) => (
        <Image
          source={require('../assets/images/map.png')}
          style={{width:50, height:50}}
          />
      ),
  }
constructor(props){
  super(props);
  this.state={
    region:null,
    routeCoordinates: [],
    positions:[],
    position:[],
    duration: 0,
    distance: 0,
    timestamp:0,
  };
}

async componentDidMount() {
        navigator.geolocation.watchPosition(
            (position) => {
              const { routeCoordinates } = this.state;
                // console.log(position);
                let region = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001,
                  timestamp:position.timestamp,
                }
                this.setState({region: region})
                const { latitude, longitude } = position.coords;
                const newCoordinate = {
                  latitude,
                  longitude
                };
                // console.log({ newCoordinate });
                this.setState({
                  latitude,
                  longitude,
                  routeCoordinates: routeCoordinates.concat([newCoordinate])
                });
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, maximumAge: 1000, timeInterval: 1000, distanceInterval: 1},
        );
    }


_getLocationAsync = async() => {
  const options = {enableHighAccuracy: true, maximumAge: 1000, timeInterval: 1000, distanceInterval: 1};
  let location = await Location.getCurrentPositionAsync(options);
  let region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
    timestamp: location.timestamp,
  }
  this.setState({region: region})

}

// Center the map on the user position
centerMap(){
    const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.region;
    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    })
  };

  render() {
    const { latitude, longitude, distance: totalDistance } = this.props;
    const { positions, distance } = this.state;
    return (
      <View style={styles.container}>
      <MenuButton navigation={this.props.navigation} />
      <CurrentLocationButton cb={() => { this.centerMap() }}/>
      <MapView
        initialRegion={this.state.region}
        showsUserLocation={true}
        showsCompass={true}
        rotateEnabled={true}
        ref={(map) => {this.map = map}}
        style={styles.map}
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
