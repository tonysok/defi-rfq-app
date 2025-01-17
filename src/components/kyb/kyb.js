import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import QRCode from 'react-qr-code'
import './kyb.css'
import styled from 'styled-components'
import Logo from '../logo'

const KybContainer = styled.div`
    background-color: #fff;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 1200px;
    width: 350px;
    margin: 20px;
`

const Title = styled.h1`
    font-size: 2rem;
    color: #000000;
`

const Kyb = () => {
  const navigate = useNavigate()
  let [qrCodeValue, setQrCodeValue] = React.useState('')
  const payload = {
    'chainID': '80002',
    'skipClaimRevocationCheck': false,
    'scope': [
      {
        'circuitId': 'credentialAtomicQuerySigV2',
        'id': 1720883382,
        'query': {
          'allowedIssuers': [
            '*'
          ],
          'context': 'ipfs://QmfZoVVgrNwVojmnNTbEjqS9LFa6SG8REk9PQwMcmqwdBu',
          'credentialSubject': {
            'is_enabled': {
              '$eq': true
            }
          },
          'type': 'KYB'
        }
      }
    ]
  }
  useEffect(() => {
    fetch('https://verifier-backend.polygonid.me/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(r => r.json())
      .then((data) => {
        const request_uri = data['qrCode'].split('iden3comm://?request_uri=')[1]
        fetch(request_uri)
          .then(r => r.json())
          .then((response) => {
            setQrCodeValue(JSON.stringify(response))
            checkAuthenticationPeriodically(data['sessionID'])
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  });

  function checkAuthenticationPeriodically (sessionId) {
    setInterval(() => {
      fetch('https://verifier-backend.polygonid.me/status?sessionID=' + sessionId)
        .then(r => r.json())
        .then((data) => {
          switch (data.status) {
            case 'success':
              navigate('/dashboard')
              break
            case 'pending':
              break
            default:
              console.error(data)
              navigate('/')
          }
        })
        .catch(err => console.log(err))
    }, 1000)
  }

  return (
    <KybContainer>
      <Logo />
      <Title>Step 2 - KYB</Title>
      <div id="qrcode">
        <QRCode
          size={100}
          style={{ height: 'auto', maxWidth: '100%', width: '350px' }}
          value={qrCodeValue}
          viewBox={`0 0 256 256`}
        />
      </div>
      <div className="instructions">
        Please submit your identity
      </div>
    </KybContainer>
  )
}

export default Kyb