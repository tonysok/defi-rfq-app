import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import metaMaskLogo from './metamask-logo.png'
import Logo from '../logo'

const MetamaskContainer = styled.div`
    background-color: #fff;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 1200px;
    width: 350px;
    margin: 20px;
`

const MetamaskLogo = styled.img`
    width: 100px;
    display: block;
    margin: auto auto 2rem;
`

const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 4rem;
    color: #000000;
`
const Button = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s;
    display: block;
    margin: auto;

    &:hover {
        background-color: #45a049;
    }
`

const ErrorMessage = styled.p`
    color: red;
    margin-top: 1rem;
`

const MetaMaskLogin = () => {
  const [account, setAccount] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  })

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setErrorMessage('Please connect to MetaMask.')
    } else {
      setAccount(accounts[0])
      navigate('/kyb')
    }
  }

  const handleChainChanged = () => {
    window.location.reload()
  }

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setAccount(accounts[0])
        navigate('/kyb')
      } catch (error) {
        if (error.code === 4001) {
          setErrorMessage('User rejected the request.')
        } else {
          setErrorMessage(error.message)
        }
      }
    } else {
      setErrorMessage('MetaMask is not installed. Please install it to use this app.')
    }
  }

  return (
    <MetamaskContainer>
      <Logo />
      <Title>Step 1 - Login</Title>
      {
        account ? (
          <div>
            <p>Connected Account: {account}</p>
          </div>
        ) : (
          <div>
            <MetamaskLogo src={ metaMaskLogo } alt="MetaMask Logo"/>
            <Button onClick={connectMetaMask}>Connect</Button>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </div>
        )
      }
    </MetamaskContainer>
  )
}

export default MetaMaskLogin