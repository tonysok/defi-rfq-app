import React from 'react'
import Routes from './routes'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(135deg, #341941, #5c7d87);
    color: white;
`

function App () {
  return (
    <Container>
      <div>
        <Routes/>
      </div>
    </Container>
  )
}

export default App