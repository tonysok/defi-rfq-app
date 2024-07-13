import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({  }) => {
  const base_url = 'https://verifier-backend.polygonid.me';
  const navigate = useNavigate();
  window.onload = () => {
    const qrCodeEl = document.querySelector('#qrcode')
    const data = {
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

    fetch(base_url + '/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(r => r.json())
      .then((data) => {
        const request_uri = data['qrCode'].split('iden3comm://?request_uri=')[1];
        fetch(request_uri)
          .then(r => r.json())
          .then((response) => {
            makeQr(qrCodeEl, response)
            checkAuthenticationPeriodically(data['sessionID'])
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))

    function makeQr (el, data) {
      return new QRCode(el, {
        text: JSON.stringify(data),
        width: 350,
        height: 350,
        colorDark: '#000',
        colorLight: '#e9e9e9',
        correctLevel: QRCode.CorrectLevel.L
      })
    }

    function checkAuthenticationPeriodically (sessionId) {
      setInterval(() => {
        fetch(base_url + '/status?sessionID=' + sessionId)
          .then(r => r.json())
          .then((data) => {
            if (data.status === 'success') {
              navigate('/quotes');
            }
          })
          .catch(err => console.log(err))
      }, 1000)
    }
  }
  return (
    <div>
      <div id="qrcode"></div>
      <div className="instructions">
        Please authenticate by scanning the QR code with your mobile device.
      </div>
    </div>
  );
}

export default Home