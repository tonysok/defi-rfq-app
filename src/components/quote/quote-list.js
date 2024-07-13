import React from 'react';
import QuoteItem from './quote-item';
import './quote-list.css';

const QuoteList = ({ quotes }) => {
  if (!quotes || quotes.length === 0) {
    return <p>No quotes available</p>;
  }
  return (
    <div className="quote-list">
      {quotes.map((quote, index) => (
        <QuoteItem key={index} quote={quote} />
      ))}
    </div>
  );
};

export default QuoteList;