import React ,{ useState, useEffect, useRef, } from 'react';
import { AntDesign,MaterialIcons } from '@expo/vector-icons';
import { View, Text,StyleSheet,Pressable,Alert } from 'react-native'
import { Checkbox, Divider } from 'react-native-paper';
import { auth, addDoc, collection, db } from "../../firebase/firebase";




const Item = (props) => {
    const handleDelete = () => {
      Alert.alert(
        "Do you want to delete this meesage ?",
        "It cannot be recovered after deletion !",
        [
         {
            text:"No",
            onPress:()=>{
              console.log(props.delete);
            }
          },
          {
            text:"Yes",
            onPress:()=>{
              db.collection("Notification").doc(props.delete).delete().then(() => {
              
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
            }
          }
        ]
      )};
  return (
    <View style={styles.container}  >
   
    <Pressable style={styles.delete} >
    
    </Pressable>
  <Text style={styles.title1}>Message : </Text>
  <Text style={styles.title2}>{props.description} </Text>
  <Text style={styles.title3}>{props.date}</Text>
  
  
  <Pressable style={styles.delete} onPress={handleDelete} >
      <MaterialIcons name="delete" size={24} color="#FEC337"  />
    </Pressable>
<Divider bold={true} />
</View>
  )
}

export default Item;

const styles = StyleSheet.create({
  container:{
    // flexDirection: "row",
    alignSelf: "center",
    
    width: "90%",
    borderRadius: 10,
    padding: 10,
    // alignItems: "center",
    marginTop: 15,
    marginRight:500,
    marginLeft:400,
    
},
title1:{
    color: "#00154E",
    fontSize: 17,
    
    fontWeight: "bold",
    marginTop:0,
    marginBottom:5,
    marginLeft:30,
    
},

title2:{
  color: "#00154E",
  marginBottom:5,
  fontSize: 15,
  marginLeft:30,
  fontWeight: "bold",
  
  
},

title3:{
color: "#00154E",
fontSize: 10,
marginLeft:30

},

delete:{
   alignItems: "center",
   justifyContent: "center",
  padding: 2,
  marginLeft:350,
  marginTop:-15
}
})
