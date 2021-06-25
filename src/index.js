import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import 'firebase/firestore';
import 'firebase/auth';

import { FirebaseAppProvider, useFirestoreDocData, useFirestore } from 'reactfire';
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCXEHnKzEj6bpDw_124H3cbeRt8HDBsua4",
  authDomain: "proyecto-2495f.firebaseapp.com",
  projectId: "proyecto-2495f",
  storageBucket: "proyecto-2495f.appspot.com",
  messagingSenderId: "176511571371",
  appId: "1:176511571371:web:2f2bfba80105cdfa886eee"
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig} >
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
