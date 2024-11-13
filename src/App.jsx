import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Pagenotfound from './pages/Pagenotfound'
import Footer from './components/Footer'
import { loginResponseContext } from './context/Contextshare'

function App() {
 
 const{ loginresponse} = useContext(loginResponseContext)
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/projects' element={loginresponse?<Projects/>:<Pagenotfound/>}/>
        <Route path='/login' element={<Auth />}/>
        <Route path='/register' element={<Auth register={true}/>}/>
        <Route path='/dashboard' element={loginresponse?<Dashboard/>:<Pagenotfound/>}/>
      
        <Route path='*' element={<Pagenotfound/>}/>
      </Routes>
      <Footer/>
       
    </>
  )
}

export default App
