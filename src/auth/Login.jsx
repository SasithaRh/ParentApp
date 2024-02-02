import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { KeyboardAvoidingView } from "react-native";
import { auth, addDoc, collection, db } from "../../firebase/firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        
        navigation.navigate("Home Screen");
        setEmail("")
        setPassword("")
      })
      .catch((error) => alert(error.message));
  };
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../image/family-Re.png")}
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <TextInput
        cursorColor="#FEC337"
        activeOutlineColor="#FEC337"
          
        style={{
          width: 310,
          marginHorizontal: 0,
          marginVertical: 0,
          backgroundColor:'#ffffff',
        }}
        placeholder="Email"
          autoFocus
          type="email"
          mode="outlined"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />


        <TextInput
cursorColor="#FEC337"
activeOutlineColor="#FEC337"
style={{
width: 310,
marginHorizontal: 0,
marginVertical: 0,
marginTop:20,
backgroundColor:'#ffffff',

}}

          placeholder="Password"
          type="password"
          mode="outlined"
          secureTextEntry
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>

      <Button
        
        mode="contained" 
       theme={{roundness:2}}
       textColor='#ffffff'
        style={{
          width: 300,
          marginHorizontal:60,
          marginVertical:10,
          marginTop:60,
          backgroundColor:'#FEC337',
        

        }}
        spacing={4}
        onPress={signIn}
       
      >Login Parent</Button>

     
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: "#ffffff",
    padding: 0,
    
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
    width: 50,
    marginTop: 10,
    alignItems: "center",
  },
  text: {
    color: "red",
  },
  image: {
    width: 250,
    height: 250,
marginLeft:80,
    marginHorizontal: 20,
    marginVertical: 20,
    marginTop:70,
  },
 
});
