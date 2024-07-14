import React from 'react'
import './quote-item.css'
import styled from 'styled-components'

const QuoteContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin: 1px 0;
    background-color: #f5f5f5;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
        background-color: #e0e0e0;
        transform: translateY(-2px);
    }
`
const QuoteItem = styled.div`
    flex: 1;
    text-align: center;
`
const AssetQuoteItem = styled.div`
    flex: 1;
    text-align: center;
    font-weight: bold;
`

const SideQuoteItem = styled.div`
    flex: 1;
    text-align: center;
    color: ${({ side }) => (side === 'buy' ? 'green' : 'red')};
`

const Quote = ({ asset, price, quantity, side }) => (
  <QuoteContainer>
    <AssetQuoteItem>{asset}</AssetQuoteItem>
    <QuoteItem>{price}</QuoteItem>
    <QuoteItem>{quantity}</QuoteItem>
    <SideQuoteItem side={side}>{side}</SideQuoteItem>
  </QuoteContainer>
)

export default Quote

