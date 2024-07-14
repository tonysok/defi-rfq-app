import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
`;

const LogoImage = styled.img`
    width: 200px;
    height: auto;
    margin-left: 100px;
`;

const Logo = () => (
  <LogoContainer>
    <LogoImage src="/defi_rfq.png" alt="Defi RFQ" />
  </LogoContainer>
);

export default Logo;