


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat"
import  "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrBlAtDdIiCyNGtBZa1QGJrO4FIOv5EOw",
  authDomain: "fir-demo-3bea7.firebaseapp.com",
  projectId: "fir-demo-3bea7",
  storageBucket: "fir-demo-3bea7.appspot.com",
  messagingSenderId: "1096377475219",
  appId: "1:1096377475219:web:8e1c81daec80695f582d66",
  measurementId: "G-HX1HZGSQBG"
};
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth(app);
// export {app, db ,getFirestore ,collection, addDoc,getDocs,auth}

let app;

if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}else{
  app = firebase.app();
}

const db = app.firestore();
const auth =  firebase.auth();
export {db, auth};