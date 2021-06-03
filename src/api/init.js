import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3I7PwWN-o2P-_auT_X_xmiry3ZYZvU7A",
  authDomain: "change-clone.firebaseapp.com",
  projectId: "change-clone",
  storageBucket: "change-clone.appspot.com",
  messagingSenderId: "817626444626",
  appId: "1:817626444626:web:6232d23f848f21ca59008b",
  measurementId: "G-5SMX89FECT",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export default db;
