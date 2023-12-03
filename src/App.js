import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Components/Home';
import Faculty from './Components/Faculty';
import UnProtected from './Components/UnProtected';
import Protected from './Components/Protected';
import Login from './Components/Login';
import Admin from './Components/Admin';
import Navbar from './Components/Navbar';
function App(){
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true' ? true : false);
  const changeStatus = (status) => {
    setIsLoggedIn(status);
  }
  
  return (
    <div>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} changeStatus={changeStatus}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={
            <UnProtected isLoggedIn={isLoggedIn}>
              <Login changeStatus={changeStatus}/>
            </UnProtected>
          }/>
          <Route path="/faculty" element={
            <Protected isLoggedIn={isLoggedIn} next='faculty'>
              <Faculty/>
            </Protected>
          }/>
          <Route path="/admin" element={
            <Protected isLoggedIn={isLoggedIn} next='admin'>
              <Admin/>
            </Protected>
          }/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
