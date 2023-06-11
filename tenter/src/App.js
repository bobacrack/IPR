/* istanbul ignore file*/

import './App.css';
import Header from './header/Header';
import Card from './card/Card';
import Chats from './Chats';
import ChatScreen from './ChatScreen';
import SwipeButtons from './SwipeButtons';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    /*
     <div className="App">
      <Router>
        <Switch>
          <Route path="/chat">
            <Header backButton="/" />
            <Chats />
          </Route>
          <Route path="/">
            <Header />
            <Cards />
            <SwipeButtons />
          </Route>
        </Switch>
      </Router>
    </div>

    


    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/chats'>
          
          </Route>
          <Route path="/" element={<div><Card /><SwipeButtons /></div>} />
        </Routes>
      </Router>

    </div >
  */
  <div className="App">
    <Router>
      <Routes>
      <Route path="/chats/:tents" element={<div><Header backButton="/chats" /><ChatScreen /></div>} />
        <Route path="/chats" element={<div><Header backButton="/" /><Chats /></div>} />
        <Route path="/" element={<div><Header/><Card /><SwipeButtons /></div>} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
