/* istanbul ignore file*/

import logo from './logo.svg';
import './App.css';
import RootRoutes from './router/root';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <RootRoutes />
      </header>
    </div>
  );
}

export default App;
