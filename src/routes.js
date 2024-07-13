import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import QuoteList from './components/quote/quote-list'
import Home from './components/home/home'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/quotes" element={<QuoteList/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router