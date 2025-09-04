import {  } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import MovieDetail from './pages/MovieDetail'
import Home from './pages/HomePage'
import SignIn from './auth/features/SignIn'
import PersonDetails from './components/PersonDetails'
import Profile from './auth/features/Profile'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/movie/:id" element={<MovieDetail />} />
      {/* <Route path='/search/:query' element={<>} */}
      <Route path='/signin' element={<SignIn/>} />
      <Route path='/person/:personId' element={<PersonDetails/>}/>
      <Route path="/profile" element={<Profile />} />

 
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
