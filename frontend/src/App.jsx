import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './elements/Home'
import Create from './elements/Create'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/create' element={<Create />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App