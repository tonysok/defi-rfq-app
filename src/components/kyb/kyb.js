import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import QRCode from 'react-qr-code'

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
            setQrCodeValue(JSON.stringify(response));
            checkAuthenticationPeriodically(data['sessionID'])
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  })

  function checkAuthenticationPeriodically (sessionId) {
    setInterval(() => {
      fetch('https://verifier-backend.polygonid.me/status?sessionID=' + sessionId)
        .then(r => r.json())
        .then((data) => {
          if (data.status === 'success') {
            navigate('/quotes')
          }
        })
        .catch(err => console.log(err))
    }, 1000)
  }

  return (
    <div>
      <div id="qrcode">
        <QRCode
          size={100}
          style={{ height: 'auto', maxWidth: '100%', width: '350px' }}
          value={qrCodeValue}
          viewBox={`0 0 256 256`}
        />
      </div>
      <div className="instructions">
        Please authenticate by scanning the QR code with your mobile device.
      </div>
    </div>
  )
}

export default Kyb