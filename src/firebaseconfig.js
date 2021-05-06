import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDWuDNISwDRwZTXav5QPsbbEiKJEceYEFs",
  authDomain: "pruebas-react-b49e6.firebaseapp.com",
  projectId: "pruebas-react-b49e6",
  storageBucket: "pruebas-react-b49e6.appspot.com",
  messagingSenderId: "442983525073",
  appId: "1:442983525073:web:69604c388b733b3cd233f0",
  measurementId: "G-P74MBY353B",
};
// Initialize Firebase
const fire = firebase.initializeApp(config);
const store = fire.firestore();
export { store };
