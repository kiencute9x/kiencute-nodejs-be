import admin from "firebase-admin"
const firebaseConfig = {

    apiKey: "AIzaSyCWFHg_o0uqBP2OH8Gzpj7Bq-h29Cs8bNQ",
  
    authDomain: "iamhere-49ba7.firebaseapp.com",
  
    projectId: "iamhere-49ba7",
  
    storageBucket: "iamhere-49ba7.appspot.com",
  
    messagingSenderId: "537827700048",
  
    appId: "1:537827700048:web:e61ab36835d0b7077b1055",
  
    measurementId: "G-84RJPXXJJ7"
  
  };

const config = admin.initializeApp({credential: admin.credential.cert(firebaseConfig),});

export default {
    config
};


