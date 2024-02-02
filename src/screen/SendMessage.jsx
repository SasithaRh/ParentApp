import { View, Text, StyleSheet, Alert, FlatList, KeyboardAvoidingView, TextInput, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, Card } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import { auth } from "../../firebase/firebase";
import { db } from "../../firebase/firebase";
import { SelectList } from "react-native-dropdown-select-list";

const SendMessage = ({ navigation }) => {
  const [name, setName] = useState("sadsd");
  const [category, setCategory] = useState("");
  const [childname, setChildname] = useState("");
  const [ss, setSs] = useState([]);
  const [child, setChild] = useState([]);
  const [delay, setDelay] = useState([]);
  const [dmessage, setDmessage] = useState([]);
  const [user, setUser] = useState("");
  const [optional, setOptional] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser.uid)
        db.collection("Parent")
          .doc(authUser.uid)
          .onSnapshot(documentSnapshot => {
            //console.log('User data: ', documentSnapshot.data());
            setName(documentSnapshot.data());
          })

      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    db.collection("Massages")
      .where("category", "==", "Absence")
      .onSnapshot((snapShot) =>
        setSs(
          snapShot.docs.map((doc) => ({
            data: doc.data(),
          }))
        )
      );
      db.collection("Massages")
      .where("category", "==", "delay")
      .onSnapshot((snapShot) =>
        setDelay(
          snapShot.docs.map((doc) => ({
            data: doc.data(),
          }))
        )
      );
  }, []);

  useEffect(() => {
    db.collection("children")
      .where("parentId", "==", user)
      .get()
      .then((querySnapshot) => {
        const childrenData = querySnapshot.docs.map((doc) => ({
          key: doc.id,
          data: doc.data(),
        }));

        setChild(childrenData);
      });
  }, [user]);
  const send = () => {
    if (childname == "" || category == "") {
      Alert.alert("All the feilds are rquired")
    }
    else {
      db.collection("DriverNotification").add({
        pname: name.name,
        cname: childname,
        parentId: user,
        date: new Date().getTime(),
        message: category + " " + "(" + " " + childname + " " + ")",
        driverid: name.driverid
      })

      Alert.alert("Message Successfully Sent")

    }

  }
  const dsend = () => {
    if (dmessage == "") {
      Alert.alert("All the feilds are rquired")
    }
    else {
      db.collection("DriverNotification").add({
        pname: name.name,
        cname: childname,
        parentId: user,
        date: new Date().getTime(),
        message: dmessage,
        driverid: name.driverid
      })

      Alert.alert("Message Successfully Sent")

    }

  }


  const sendop = () => {
    if (optional == "") {
      Alert.alert("All the feilds are rquired")
    }
    else {
      db.collection("DriverNotification").add({
        pname: name.name,
        parentId: user,
        date: new Date().getTime(),
        driverid: name.driverid,
        message: optional
      })
      Alert.alert("Message Successfully Sent")
    }
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        styles={styles.container }
        keyboardVerticalOffset={150}
      >
        <StatusBar style="light" />

        <View style={styles.inputContainer } >
          {/* <Text>{childname}</Text>
          <Text>{category}</Text>*/}
<Card style={{marginBottom:5}} backgroundColor="#FFFFFF"  >
          <Text style={styles.text} >Absence Notification</Text>

          <SelectList style={styles.selectlist}
            boxStyles={{width:"90%",alignItems:'center',marginLeft:20,marginBottom:5}}
            setSelected={setCategory}
            data={ss.map(({ data }) => data.type)}
            placeholder={"Select Message"}

          />
          <SelectList style={styles.selectlist}
           boxStyles={{width:"90%",alignItems:'center',marginLeft:20}}
            setSelected={setChildname}
            data={child.map(({ data }) => data.name)}
            placeholder={"Select Child"}
          />
          <Button style={styles.button}

            containerStyle={{
              width: 50,
              marginHorizontal: 100,
              marginVertical: 10,
            }}
            spacing={4}
            mode="contained"
            onPress={send}
          >Send</Button>
          </Card>
          <Card style={{marginBottom:5}} backgroundColor="#FFFFFF"  >
          <Text style={styles.text} >Your Message</Text>
      <TextInput
          multiline
          numberOfLines={5}
          style={styles.input}
          onChangeText={(text) => {
            setOptional(text);
          }}

          placeholder="Enter the Message"

        />
        <Button style={styles.button2}
          mode="contained"
          onPress={sendop}
        >Send</Button>
       
        </Card>
        <Card style={{marginBottom:5}} backgroundColor="#FFFFFF"  >
          <Text style={styles.text}>Delay Notification</Text>
          <SelectList
           boxStyles={{width:"90%",alignItems:'center',marginLeft:20}}
            setSelected={setDmessage}
            data={delay.map(({ data }) => data.message)}
            placeholder={"Select Child"}
          />
          <Button style={styles.button}

            containerStyle={{
              width: 200,
              marginHorizontal: 100,
              marginVertical: 10,
            }}
            spacing={4}
            mode="contained"
            onPress={dsend}
          >Send</Button>

</Card>


          


  
</View>


        
</KeyboardAvoidingView>
    </>
    
  );
};

export default SendMessage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#00154E",
    padding: 8,
    alignItems: "center",
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
  // inputContainer: {
  //   width: 300,
  //   marginTop: 30,
  //   justifyContent: "center",
  //   marginLeft: 10,
  //   marginLeft:10,
  //   backgroundColor:"#00154E"
  // },
  button: {
    width: 300,
    marginTop: 20,
    alignItems: "center",
    marginLeft:48,
    backgroundColor:'#FEC337',
    marginBottom:20
  },

  button2: {
    width: 300,
    marginTop: 10,
    alignItems: "center",
    marginLeft:48,
    backgroundColor:'#FEC337',
    marginBottom:20
  },
  selectlist: {
    width: 100,
    
    alignItems: "center",
    marginHorizontal:10,
    marginTop:10,
    justifyContent:"center",
   

  },

  text: {
    color: "#00154E",
    fontSize:20,
    marginBottom:20,
    textAlign:"center",
    marginTop:20,
    fontWeight:'bold',
    
  },
  input: {
    margin: 12,
    borderWidth: 1,
    borderRadius: 5
  },

});
