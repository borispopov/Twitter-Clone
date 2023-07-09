import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCYKkAc_un66npCJHM7rXb9obv_G9xNEcI",
  authDomain: "twitter-clone-cd5a5.firebaseapp.com",
  projectId: "twitter-clone-cd5a5",
  storageBucket: "twitter-clone-cd5a5.appspot.com",
  messagingSenderId: "1015415705896",
  appId: "1:1015415705896:web:888cbd9be6694c5280401d",
  measurementId: "G-6VL87C670S"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();


  export default db;
