import React, { useEffect, useState, useRef } from "react";
import { ScrollView, StatusBar, View, Text, Button, Modal, TouchableHighlight, StyleSheet } from "react-native";
import { auth, db } from "../../firebase/firebase";
import QRCode from "react-native-qrcode-svg";
import * as MediaLibrary from 'expo-media-library'
import { captureRef } from 'react-native-view-shot';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
const Qrcode = ({ navigation, route }) => {
  const [child, setChild] = useState([]);
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);

  const qrCodeRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser.uid);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
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

  const openModal = (childData) => {
    setSelectedChild(childData);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };





  const requestPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return false;
    }
    return true;
  };

  const downloadQRCode = async () => {
    try {
      if (!(await requestPermissions())) {
        console.log('Permissions not granted');
        return;
      }
   
      // Capture the QR code as an image
      const uri = await captureRef(qrCodeRef, {
        format: 'png',
        quality: 1,
      });
   
      // Save the captured image to the device's local file system
      const fileUri = FileSystem.documentDirectory + 'qrcode.png';
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });
      const downloadResumable = FileSystem.createDownloadResumable(
        'http://techslides.com/demos/sample-videos/small.mp4',
        FileSystem.documentDirectory + 'small.mp4',
        {},
        callback
      );
      
      try {
        const { uri } = await downloadResumable.downloadAsync();
        console.log('Finished downloading to ', uri);
      } catch (e) {
        console.error(e);
      }
      
      // Create an asset from the saved image file
      const asset = await MediaLibrary.createAssetAsync(fileUri);
   
      // Move the asset to a specific album in the device's media library
      await MediaLibrary.createAlbumAsync('Download', asset, false);
   
      console.log('Download successful');
    } catch (error) {
      console.error('Download error:', error);
    }
   };


  return (
    <ScrollView>
      <StatusBar style="light" />


      <View style={styles.inputContainer}>
        {child.map(({ key, data }) => (
          <>
            <TouchableHighlight key={key} onPress={() => openModal({ key, data })}>
              <QRCode
                //ref={qrCodeRef}
                value={key}
                size={250}
                backgroundColor="white"
                color="black"
              />

            </TouchableHighlight>
            <Text style={styles.text}>
              Name : {data.name}
            </Text>
            <Text style={styles.text2}>
              Grade :  {data.age}
            </Text>
          </>
        ))}
      </View>

      {/* Modal for displaying child details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <QRCode
            value={selectedChild ? selectedChild.key : ''}
            size={250}
            backgroundColor="white"
            color="black"
          />
          <Text style={styles.text}>
            Name: {selectedChild ? selectedChild.data.name : ''}
          </Text>
          <Text style={styles.text}>
            Grade: {selectedChild ? selectedChild.data.age : ''}
          </Text>
          <Button title="Download QRCode" onPress={downloadQRCode} />
          <Button title="Close" onPress={closeModal} />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Qrcode;

const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
    marginTop: 70,
    justifyContent: "center",
    marginLeft: 60,
    alignItems:"center"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: "white"
  },
  text: {
    color: "#00154E",
    fontSize:20,
    
    textAlign:"center",
    
    fontWeight:'bold',
    
  },
  text2: {
    color: "#00154E",
    fontSize:20,
    
    textAlign:"center",
    marginBottom:20,
    fontWeight:'bold',
    
  },
});
