import React from "react";
import "./quote-item.css";
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
`;

const QuoteItem = styled.div`
  flex: 1;
  text-align: center;
`;

const Quote = ({ asset, price, quantity, side }) => (
  <QuoteContainer>
    <QuoteItem>{asset}</QuoteItem>
    <QuoteItem>{price}</QuoteItem>
    <QuoteItem>{quantity}</QuoteItem>
    <QuoteItem>{side}</QuoteItem>
  </QuoteContainer>
);

export default Quote;

