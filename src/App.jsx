import {  } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import MovieDetail from './pages/MovieDetail'
import Home from './pages/HomePage'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/movie/:id" element={<MovieDetail />} />

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
