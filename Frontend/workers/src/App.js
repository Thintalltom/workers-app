import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Mainpage from './components/Mainpage/Mainpage';

function App() {
  return (
    <div>
    <Routes>
    <Route path='/' element={<Mainpage />} />
    </Routes>
    </div>
  );
}

export default App;
