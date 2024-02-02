import { View, Text, StyleSheet, Dimensions, FlatList, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { auth, addDoc, collection, db } from "../../firebase/firebase";
import MapView, { AnimatedRegion, Marker, MarkerAnimated } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { AnimatedMapView } from "react-native-maps/lib/MapView";

const MapScreen = ({ navigation }) => {
  const [user, setUser] = useState("jhg");
  const screen = Dimensions.get('window');
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.04;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [state, setState] = useState({
    isLoading: false,
    curLoc: {
      latitude: 6.808848, 
    longitude: 79.883579,
  },
    coordinate: new AnimatedRegion({
      latitude: 6.808848, 
    longitude: 79.883579,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }),
    time: 0,
    distance: 0,
    heading: 0

  })
  const { curLoc, time, distance, destinationCords, coordinate, isLoading, heading } = state;
  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const [origin, setOrigin] = useState({ latitude:  6.808848, longitude: 79.883579 });
  const [details, setDetails] = useState([]);
  const [destination, setDestination] = useState({
    latitude: 6.792748194800817,
    longitude: 79.88618552076129,
  }
  );

  const GOOGLE_MAPS_APIKEY = "AIzaSyAyl606YHrgO812m7O70O_ZNSYU38XQ6uo";

  const mapRef = useRef();
  const markerRef = useRef()
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });
  const [mapRegion, setmapRegion] = useState({
    latitude: 6.808848, 
    longitude: 79.883579,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  useEffect(() => {
    db.collection("Parent")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDestination(doc.data().location);
          setDetails(doc.data());
          console.log("Document data:", doc.data().location);
        }
      });
  }, [user]);
  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  }
  const fetchTime = (d, t) => {
    setState(state => ({ ...state, distance: d, time: t }))
  }
  if (time.toFixed(2) == 5) {
    console.log("sdsadsad")
  }
  const userlocation = async () => {
    db.collection("Driver")
      .doc(details.driverid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setOrigin(doc.data().location);
          console.log("Document data:", doc.data().location);
        }
      });
    animate(origin.latitude, origin.longitude);
    updateState({

      coordinate: new AnimatedRegion({
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      })
    })
  };
  useEffect(() => {
    const interval = setInterval(() => {
      userlocation();
    }, 2000);
    return () => clearInterval(interval)
  }, [details])

  
  return (
    <KeyboardAvoidingView behavior="height" styles={styles.container}>
      <StatusBar style="light" />

  
      <AnimatedMapView style={styles.map}  initialRegion={{
                        ...curLoc,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }} ref={mapRef}>
        <MarkerAnimated coordinate={origin} >
          <Image
            source={require("../image/map_icon.png")}
            style={styles.markerImage}
          />
        </MarkerAnimated>
        <Marker coordinate={destination} >
          <View>
            <Image
              source={require("../image/greenMarke.jpg")}
              style={styles.markerImage}
            />
          </View></Marker> 

        {Object.keys(destination).length > 0 && ("")}

        {Object.keys(destination).length > 0 && (<MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="#45ffcc"
          optimizeWaypoints={true}

          onReady={(result) => {
            fetchTime(result.distance, result.duration),
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 30,
                  bottom: 200,
                  left: 30,
                  top: 100,
                },
                animated: true,
              });
          }}
        />
        )}
      </AnimatedMapView>
      {distance !== 0 && time !== 0 && (<View style={{  marginVertical: 16 }}>
        <Text style={styles.text1} >Time left                        Distance left      </Text>
        <Text style={styles.text2} > {time.toFixed(2)} M                           {distance.toFixed(2)} KM                    </Text>

        {/* <Text style={styles.text2} >Distance left: {distance.toFixed(2)} KM</Text> */}
      </View>)}

    
    </KeyboardAvoidingView>
  );
};

export default MapScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: 8,
    flexDirection: "row",
    // alignItems: "center",
  },
  list: {
    width: "100",
    backgroundColor: "#000",
  },
  item: {
    aspectRatio: 1,
    width: "100%",
    flex: 1,
  },
  map: {
    width: 500,
    height: 625,
  },
  inputContainer: {
    width: 300,
    backgroundColor:"#ffffff",

    justifyContent: "center",
    marginLeft: 60,
  },
  button: {
    width: 50,
    marginTop: 10,
    alignItems: "center",
  },
  text1: {
    color: "#00154E",
    flexDirection: "row",
    marginLeft:40,
    fontSize:20,
    marginBottom:5,
    fontWeight:"bold"
  },

  text2: {
    color: "#00154E",
    flexDirection: "row",
    marginLeft:40,
    fontSize:20,
    marginBottom:5
  },

  markerImage: {
    width: 30, // adjust the width as needed
    height: 30, // adjust the height as needed
  },
  item: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 120,
    marginVertical: 70,
  },
});
