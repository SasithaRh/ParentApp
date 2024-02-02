import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { db } from "./firebase/firebase";


import Welcome from "./src/Welcome";
import Login from "./src/auth/Login";
import HomeScreen from "./src/screen/HomeScreen";
import Qrcode from "./src/screen/Qrcode";
import MapScreen from "./src/screen/MapScreen";
import Notifications from "./src/screen/Notifications";
import SendMessage from "./src/screen/SendMessage";


export default function App() {

 

  const addData = () => {
    db.collection("Chat")
      .doc("0AeZz2ca09RwbsknHbFW")
      .collection("messages")
      .add({
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
  };
  

  const Stack = createNativeStackNavigator();
  const globalScreenOption = {
    headerStyle: { backgroundColor: "#00154E" },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOption}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home Screen" component={HomeScreen} />
        <Stack.Screen name="QR Code" component={Qrcode} />
        <Stack.Screen name="Bus Tracking" component={MapScreen} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Send Message" component={SendMessage} /> 
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
