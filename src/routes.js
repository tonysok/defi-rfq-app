import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import QuotesDashboard from './components/quote/quote-dashboard'
import Kyb from './components/kyb/kyb'
import MetaMaskLogin from './components/metamask/metamask'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MetaMaskLogin/>}/>
        <Route path="/kyb" element={<Kyb/>}/>
        <Route path="/dashboard" element={<QuotesDashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router