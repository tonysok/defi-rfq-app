import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import QuoteList from './components/quote/quote-list'
import Kyb from './components/kyb/kyb'
import MetaMaskLogin from './components/metamask/metamask'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MetaMaskLogin/>}/>
        <Route path="/kyb" element={<Kyb/>}/>
        <Route path="/quotes" element={<QuoteList/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router