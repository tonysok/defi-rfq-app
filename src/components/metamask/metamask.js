import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MetaMaskLogin = () => {
  const [account, setAccount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setErrorMessage('Please connect to MetaMask.');
    } else {
      setAccount(accounts[0]);
      navigate("/kyb");
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        navigate("/kyb");
      } catch (error) {
        if (error.code === 4001) {
          setErrorMessage('User rejected the request.');
        } else {
          setErrorMessage(error.message);
        }
      }
    } else {
      setErrorMessage('MetaMask is not installed. Please install it to use this app.');
    }
  };

  return (
    <div>
      {account ? (
        <div>
          <p>Connected Account: {account}</p>
        </div>
      ) : (
        <div>
          <button onClick={connectMetaMask}>Connect MetaMask</button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default MetaMaskLogin;