import './App.css';
import { useEffect } from 'react';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { LoadUser } from './Actions/User';
import Home from './Components/Home/Home';


function App() {

  const{isAuthenticated}= useSelector((state)=>state.user)

  const dispatch= useDispatch();

  useEffect(() => {
   dispatch(LoadUser());
  }, [])
  

  return (
    <>
    <Router>
{ isAuthenticated &&      <Header/>}
      <Routes>
        <Route path='/' element={ isAuthenticated ? <Home/> : <Login/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
