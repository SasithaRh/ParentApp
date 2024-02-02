
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Card, IconButton } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";

import { KeyboardAvoidingView } from "react-native";
import { auth, addDoc, collection, db } from "../../firebase/firebase";

const HomeScreen = ({ navigation }) => {
  return (


    <>


      <View style={[styles.container]}>

        <Card style={styles.card1} backgroundColor="#FFFFFF" width="100%" height="20%">

          <Text style={styles.text1}>Navigate your day</Text>
          <Text style={styles.text2}>with confidence</Text>
          <Text style={styles.text}>Our bus tracking system ensures</Text>
          <Text style={styles.text}>you're always on time, every time.</Text>
          {/* <Text style={styles.text}>every time.</Text> */}

          <Image
            source={require("../image/BusB.png")}
            style={styles.image}
          />
        </Card>





        <View style={styles.column1}>
          <View style={styles.item1}>


            <Card style={styles.card} backgroundColor="" width="200%" height="100%"  >

              <Card.Content >

              </Card.Content>

              <Text style={styles.text3}>Get Your QR</Text>
              <Image
                source={require("../image/qr1.png")}
                style={styles.image1}
              />
              <Card.Actions>
                <Button style={styles.button}

                  containerStyle={{
                    width: 200,
                    marginHorizontal: 100,
                    marginVertical: 10,
                  }}
                  mode="contained"
                  spacing={4}


                  onPress={() => navigation.navigate("QR Code")}
                >Go</Button>
              </Card.Actions>
            </Card >
          </View>
          <View style={styles.item1}>
            <Card style={styles.card} backgroundColor="" width="200%" height="100%"  >

              <Card.Content >
                <Text style={styles.text5}>Notifications</Text>
                <Image
                  source={require("../image/NFR.png")}
                  style={styles.image2}
                />
              </Card.Content>

              <Card.Actions>
                <Button style={styles.button}

                  containerStyle={{
                    width: 200,
                    marginHorizontal: 100,
                    marginVertical: 10,
                  }}
                  spacing={4}
                  mode="contained"

                  onPress={() => navigation.navigate("Notifications")}
                >Go</Button>

              </Card.Actions>
            </Card>

          </View>

        </View>
        <View style={styles.column2}>
          <View style={styles.item1}>

            <Card style={styles.card} backgroundColor="" width="200%" height="100%"  >

              <Card.Content >
                <Text style={styles.text4}>Bus Tracking</Text>
                <Image
                  source={require("../image/LocationBW.png")}
                  style={styles.image1}
                />
              </Card.Content>

              <Card.Actions>
                <Button style={styles.button}

                  containerStyle={{
                    width: 200,
                    marginHorizontal: 100,
                    marginVertical: 10,
                  }}
                  spacing={4}
                  mode="contained"

                  onPress={() => navigation.navigate("Bus Tracking")}
                >Go</Button>
              </Card.Actions>
            </Card>

          </View>
          <View style={styles.item1}>

            <Card style={styles.card} backgroundColor="" width="200%" height="100%"  >

              <Card.Content >
                <Text style={styles.text6}>Send Message</Text>
                <Image
                  source={require("../image/PN.png")}
                  style={styles.image3}
                />
              </Card.Content>

              <Card.Actions>
                <Button
                  style={styles.button}
                  containerStyle={{
                    width: 200,
                    marginHorizontal: 100,
                    marginVertical: 10,
                  }}
                  spacing={4}
                  mode="contained"

                  onPress={() => navigation.navigate("Send Message")}
                >Go</Button>
              </Card.Actions>
            </Card>

          </View>

        </View>
      </View>



    </>

  );
};





export default HomeScreen;
const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginHorizontal: '50',
    marginVertical: '50',
    width: "100%",
    height: "100%",
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff'


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
  inputContainer: {
    width: 300,

    justifyContent: "center",
    marginLeft: 60,
  },
  button: {
    width: 100,
    marginTop: 0,
    alignItems: "center",
    marginRight: 16,
    backgroundColor: "#FEC337"
  },
  text1: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20,


  },
  text2: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 0

  },
  text: {
    color: "#FFFFFF",
    fontSize: 12,
    marginLeft: 20,


  },
  text3: {
    color: "#00154E",
    fontSize: 15,
    marginLeft: 15,
    fontWeight: 'bold',
    marginLeft: 30

  },
  text4: {
    color: "#00154E",
    fontSize: 15,
    marginLeft: 15,
    fontWeight: 'bold',
    marginLeft: 10

  },
  text5: {
    color: "#00154E",
    fontSize: 15,
    marginLeft: 15,
    fontWeight: 'bold',
    marginLeft: 15,


  },
  text6: {
    color: "#00154E",
    fontSize: 15,
    marginLeft: 5,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#ffffff',
    width: 150,
    height: 210,
    marginRight: 5,
  },
  card1: {

    backgroundColor: '#00154E',
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  image: {
    width: 180,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 200,
    marginVertical: 0,
    marginTop: 0,
    marginRight: 10

  },
  image1: {
    width: 110,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 0,
    marginVertical: 0,
    marginTop: 0,
    marginRight: 5,
    marginLeft: 12

  },
  image2: {
    width: 110,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 0,
    marginVertical: 0,
    marginTop: 0,
    marginRight: 15,
    marginLeft: 5

  },
  image3: {
    width: 110,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 0,
    marginVertical: 0,
    marginTop: 0,
    marginRight: 10,
    marginLeft: 5
  },

  item1: {
    // flex: 2, //why this doesnt work???
    // width: 150, //using fixed item width instead of flex: 0.5 works
    height: 200,
    padding: 15,
    marginHorizontal: 33,
    marginVertical: 10,
    width: 100,

  },
});
