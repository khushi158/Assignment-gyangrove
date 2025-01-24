import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import
import Signin from './Components/Authentication/Signin';
import Signup from './Components/Authentication/Signup';
import Home from './Components/Home/Home';
import Navbar from './Components/NavBar';
import Settings from './Components/Settings';




function App() {






  return (
    <div>
        <Navbar/>
             <Routes>
              <Route path='/home' element={<Home/>} />
                  <Route path='/Signup' element={<Signup/>} />
                  <Route path='/Signin' element={<Signin/>} />
                  <Route path='/Settings' element={<Settings/>} />
              </Routes>
        

    </div>
  )
}

export default App
