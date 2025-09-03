import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Project from './pages/Project'
import Post from './pages/Post'

function App() {
  return (
    <>
    
          <Routes> 
            <Route path="/" element={<Home/>} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/categorie/:cat" element={<Post />} />
          </Routes>
    </>
  )
}

export default App
