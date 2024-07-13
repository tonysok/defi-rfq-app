import React from "react";
import QuoteItem from "./quote-item";
import "./quote-list.css";

const Side = {
  buy: 0,
  sell: 1,
};
const QuoteList = ({ quotes }) => {
  const testQuotes = [
    {
      id: 1,
      token: "0x1222",
      side: Side.buy,
      size: 100,
      price: 1.2,
    },
    {
      id: 2,
      token: "0x1222",
      side: Side.sell,
      size: 300,
      price: 1.3,
    },
  ];
  quotes = testQuotes;
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

