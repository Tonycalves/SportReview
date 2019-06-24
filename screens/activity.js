import * as React from "react";
import {StyleSheet, View, Text, Dimensions, Image,TouchableOpacity} from "react-native";
import {MapView, Location, Permissions} from 'expo';
import * as turf from '@turf/turf';
import moment from 'moment';
import {CurrentLocationButton} from "../components/CurrentLocationButton";
import {SaveRunButton} from "../components/SaveRun";
import Monitor from '../components/Monitor';
import MenuButton from '../components/MenuButton';
import { MaterialIcons } from '@expo/vector-icons';
import * as firebase from 'firebase';
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

type ProgressState = {
  durationSave: number,
};


const distanceBetween = (from: Position, to: Position) => {
  const options = { units: 'meters' };
  const origin = turf.point([from.coords.longitude, from.coords.latitude]);
  const destination = turf.point([to.coords.longitude, to.coords.latitude]);
  return turf.distance(origin, destination, options);
};

const formatDuration = (seconds: number) => moment.utc(moment.duration(seconds, 's').asMilliseconds()).format('mm:ss');

export default class Activity extends React.Component {
  static navigationOptions = {
      drawerLabel: 'Running',
      drawerIcon: ({focused, tintColor}) => (
        <Image
          source={require('../assets/images/running.png')}
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
    durationSave: 0,
    distance: 0,
    timestamp:0,
  };
}

watcher: { remove: () => void };

async componentDidMount() {
  const { currentUser } = firebase.auth();
  this.setState({ currentUser });
  this.interval = setInterval(() => this.setState({ durationSave: this.state.durationSave + 1 }), 1000);
  const options = { enableHighAccuracy: true, timeInterval: 1000, distanceInterval: 1 };
  this.watcher = await Location.watchPositionAsync(options, this.onNewPosition);
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
                const distance = distanceBetween(position, position);


            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, maximumAge: 1000, timeInterval: 1000, distanceInterval: 1},
        );
    }
    componentWillUnmount() {
      clearInterval(this.interval);
      this.watcher.remove();
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


onNewPosition = (position: Position) => {
    this.map.animateToCoordinate(position.coords, 1000);
    const { positions } = this.state;
    const duration = positions[0] ? position.timestamp - positions[0].timestamp : 0;
    const distance = positions[0] ? distanceBetween(positions[positions.length - 1], position) : 0;
    this.setState({
      positions: [...positions, position], duration, distance: this.state.distance + distance,
    });
  };

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

SaveRun = () => {
  const timerunning = formatDuration(this.state.durationSave);
  const distanceRunning = this.state.distance;
  const useremail = this.state.currentUser.email;
  var day = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  var date = "Le "+day+"-"+month+"-"+year+" à "+hours+"h"+min+"m"+sec+"s"
  firebase.database().ref('/running').push({
      user:useremail,
      distance:distanceRunning,
      timerunning:timerunning,
      daterun:date
  });
  this.props.navigation.navigate('Home');

};
  render(): React.Node {
    const { durationSave,currentUser } = this.state;
    const { latitude, longitude, distance: totalDistance } = this.props;
    const { positions, distance } = this.state;
    return (
      <View style={styles.container}>
      <MenuButton navigation={this.props.navigation} />
      <Monitor {...{
          distance, totalDistance, durationSave
        }}
        />

      <SaveRunButton cb={() => { this.SaveRun() }}/>
      <CurrentLocationButton cb={() => { this.centerMap() }}/>

      <MapView
        initialRegion={this.state.region}
        showsUserLocation={true}
        showsCompass={true}
        rotateEnabled={true}
        ref={(map) => {this.map = map}}
        style={styles.map}
        >
        <MapView.Polyline coordinates={this.state.routeCoordinates} strokeWidth={10} strokeColor="#006400"/>
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
  test:{
    zIndex: 9,
    position: 'absolute',
    width:200,
    height:45,
    backgroundColor: '#1ED109',
    top:HEIGHT - 490,
    right: WIDTH-285,
    borderRadius:50,
    shadowColor: '#000000',
    elevation:7,
    shadowRadius:5,
    shadowOpacity:1.0,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
