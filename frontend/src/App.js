import './App.css';
import { useEffect } from 'react';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { LoadUser } from './Actions/User';
import Home from './Components/Home/Home';
import Account from './Components/Acounts/Account';
import Newpost from './Components/Newpost/Newpost';
import Register from './Components/Register/Register';


function App() {

  const{isAuthenticated}= useSelector((state)=>state.user)

  const dispatch= useDispatch();

  useEffect(() => {
   dispatch(LoadUser());
  }, [dispatch])
  

  return (
    <>
    <Router>
{ isAuthenticated &&      <Header/>}
      <Routes>
        <Route path='/' element={ isAuthenticated ? <Home/> : <Login/>} />
        <Route path='/account' element={ isAuthenticated ? <Account/> : <Login/>} />
        <Route path='/register' element={ isAuthenticated ? <Account/> : <Register/>} />
        <Route path='/newpost' element={ isAuthenticated ? <Newpost/> : <Login/>} />

      </Routes>
    </Router>
    </>
  );
}

export default App;
