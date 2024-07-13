import React from 'react';
import './quote-item.css';

const QuoteItem = ({ quote }) => {
  return (
    <div className="quote-list">
      <div className="quote-item">
        <h2>ETH</h2>
        <p className="amount">Amount: 2100</p>
        <p className="date">Expiry date: 2024-07-24</p>
      </div>
      <div className="quote-item">
        <h2>ETH</h2>
        <p className="amount">Amount: 399</p>
        <p className="date">Date: 2024-07-24</p>
      </div>
      <div className="quote-item">
        <h2>WBTC</h2>
        <p className="amount">Amount: 69</p>
        <p className="date">Date: 2024-07-24</p>
      </div>
    </div>
  );
};

export default QuoteItem;