/* istanbul ignore file*/

import './App.css';
import { DatePicker, message } from 'antd';
import 'antd/dist/reset.css';
import RootRoutes from './router/root';
import Navbar from './nav/nav';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <RootRoutes />
      </header>
    </div>
  );
}

export default App;
