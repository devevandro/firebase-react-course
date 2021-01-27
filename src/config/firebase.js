import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD-MSJ1yo6Lds4yEwYVXhrhsiDUOF0Har0",
    authDomain: "events-ec4c8.firebaseapp.com",
    projectId: "events-ec4c8",
    storageBucket: "events-ec4c8.appspot.com",
    messagingSenderId: "1017060621441",
    appId: "1:1017060621441:web:4392aab2c2ebf9a337a180"
  };

  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);
