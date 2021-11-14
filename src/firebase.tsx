import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import { Pane } from "evergreen-ui";
import { getFirestore } from "firebase/firestore";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { BrowserRouter as Router, Route } from "react-router-dom";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgv6pfQ531BWbzO1sXYQLwCVnKTgwtN-o",
  authDomain: "warm-letters.firebaseapp.com",
  projectId: "warm-letters",
  storageBucket: "warm-letters.appspot.com",
  messagingSenderId: "661846584730",
  appId: "1:661846584730:web:5874ff588b1f1340015e23",
};

firebase.initializeApp(firebaseConfig);

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/signedIn",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

function App() {
  // const [user, setUser] = useState();
  // useEffect(() => {}, []);

  // if (!user) {
  //   return <Pane>Loading...</Pane>;
  // }
  // return <Pane></Pane>;

  return (
    <Router>
      <Route></Route>
    </Router>
  );
}

export default App;
