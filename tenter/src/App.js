/* istanbul ignore file*/

import './App.css';
import { DatePicker, message } from 'antd';
import 'antd/dist/reset.css';
import RootRoutes from './router/root';
import Navbar from './nav/nav';

function App() {
  return (
    <div className="App">
      <RootRoutes />
    </div>
  );
}

export default App;
