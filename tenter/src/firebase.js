// Import the functions you need from the SDKs you need

import firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyD3yVfGSTk7z0S7hhlKNo5HU8HLJZF9U8g",

  authDomain: "tenter-a39ec.firebaseapp.com",

  projectId: "tenter-a39ec",

  storageBucket: "tenter-a39ec.appspot.com",

  messagingSenderId: "28799517963",

  appId: "1:28799517963:web:5934f816b0ff49616d4e0e",

  measurementId: "G-5MNSMKN8GD"

};


// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);

const database = firebaseApp.firesotre();

export default database;