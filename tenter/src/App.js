/* istanbul ignore file*/
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './header/Header';
import Card from './card/Card';
import Chats from './Chats';
import ChatScreen from './ChatScreen';
import SwipeButtons from './SwipeButtons';
import RegistrationPage from './reg/RegistrationPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from './login/Login';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import Profile from './profile/Profile';

function App() {


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid)
      } else {
        // User is signed out
        // ...
        console.log("user is logged out")
      }
    });

  }, [])


  return (
    < div className="App" >
      <Router>
        <Routes>
          <Route path="/chats/:tents" element={<div><Header backButton="/chats" /><ChatScreen /></div>} />
          <Route path="/chats" element={<div><Header backButton="/" /><Chats /></div>} />
          <Route path="/" element={<div><Header /><Card /></div>} />
          <Route path='/register' element={<div><Header /> <RegistrationPage /></div>} />
          <Route path='/login' element={<div><Header /> <LogIn /></div>} />
          <Route path='/profile/:uid' element={<div><Header backButton="/" /><Profile /></div>} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
