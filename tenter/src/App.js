/* istanbul ignore file*/

import './App.css';
import 'antd/dist/reset.css';
import Header from './header/Header';
import Card from './card/Card'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">

      <Router>
        {/*Header */}
        <Header />
        <Routes>
          <Route path='/'>
            <Card />
          </Route>
        </Routes>
        { /*Tinder Card */}

        { /*Buttons*/}

        { /*chat screen*/}

        { /*indiv chat*/}
      </Router>

    </div>
  );
}

export default App;
