import './App.css';
import Fetch from './components/Fetch';
import AddItem from './components/AddItem';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/itemadded' element={<Navigate replace to='/'/>}/>
          <Route  path="/" element={<><AddItem /><Fetch /></>} />
          <Route  path="/update/:id" element={<><AddItem /><Fetch/></>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
