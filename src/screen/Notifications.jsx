import { View, Text, StyleSheet, FlatList, Image, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import { List } from 'react-native-paper';
import { KeyboardAvoidingView } from "react-native";
import { auth, addDoc, collection, db } from "../../firebase/firebase";

import moment from "moment/moment";
import Item from "../components/Item";
const Notifications = ({ navigation }) => {
  const [origin, setOrigin] = useState([]);
  const [notify, setNotify] = useState([]);
  const [fullarray, setFullarray] = useState([]);
  const [all, setAll] = useState([]);
  const [alls, setAlls] = useState([]);
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [sortedArray, setSortedArray] = useState([]);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser.uid);
        db.collection("Parent")
          .doc(authUser.uid)
          .onSnapshot(documentSnapshot => {
            console.log('User data: ', documentSnapshot.data());
            setName(documentSnapshot.data().driverid);
          })
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user,name]);


 

  useEffect(() => {
    if(name.length > 0 && user.length > 0)
    {
      db.collection("Notification")
       
        .get()
        .then((querySnapshot) => {
          const notifications = querySnapshot.docs.map((doc) => ({
            key: doc.id,
            data: doc.data(),
          }));
  
          const filtered_n = notifications.filter(
            (n) => 
            n.data.driverid === name || n.data.parentId  === user
          );
      
          setSortedArray(filtered_n);
          
        });
    }
  }, [user,name,sortedArray]);
console.log(JSON.stringify(sortedArray, null, "\t"));


  return (
    <View style={styles.container}>
      <StatusBar style="light" />



<FlatList style={styles.flatlist}
        data={sortedArray.sort((a, b) => {
          return b.data.date - a.data.date;
        })}
        renderItem={({ item, index }) =>
          <Item style={styles.item}

            id={index}
             description={item.data.message}
            date={moment(new Date(item.data.date)).format("YYYY-MM-DD HH:mm:ss a")}
            
            delete={item.key}
          />}
        keyExtractor={item => item.key}
      />

    </View>
  );
};

export default Notifications;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: 8,
    
  },
  list: {
    width: "100",
    backgroundColor: "#000",
  },
  item: {
    aspectRatio: 1,
    width: 100,
    height:100,
    flex: 1,
  },
  inputContainer: {
    width: 300,

    justifyContent: "center",
    marginLeft: 60,
  },
  button: {
    width: 50,
    marginTop: 10,
    alignItems: "center",
  },
  text: {
    color: "red",
  },
  image: {
    width: 190,
    height: 190,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 120,
    marginVertical: 70,
    borderRadius: 80
  },
  flatlist:{
    width:500,
    marginRight:50,
  }
});