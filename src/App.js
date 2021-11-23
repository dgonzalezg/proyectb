import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../src/routes/index';

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
