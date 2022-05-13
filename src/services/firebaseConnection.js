// v9 compat packages are API compatible with v8 code
// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyBwnxaLfxfWU2zNpGNKhL8UJG9Fu09eSSM",
  authDomain: "home-care-system.firebaseapp.com",
  projectId: "home-care-system",
  storageBucket: "home-care-system.appspot.com",
  messagingSenderId: "491701726310",
  appId: "1:491701726310:web:3595da04bc80fa3e16d1a7",
  measurementId: "G-YBVWL5R0PB"
};


// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;