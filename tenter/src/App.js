/* istanbul ignore file*/

import './App.css';
import Header from './header/Header';
import Card from './card/Card'
import SwipeButtons from './SwipeButtons';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">

      <Router>
        {/*Header */}
        <Header />
        
        <Routes>
          <Route path='/chats'>
          
          </Route>
          <Route path="/" element={<div><Card /><SwipeButtons /></div>} />
        </Routes>
        { /*Tinder Card */}

        { /*Buttons*/}

        { /*chat screen*/}

        { /*indiv chat*/}
      </Router>

    </div >
  );
}

export default App;
