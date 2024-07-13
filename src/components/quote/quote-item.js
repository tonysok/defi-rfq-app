import React from "react";
import "./quote-item.css";

const QuoteItem = ({ quote }) => {
  const side = Side[quote.side];
  return (
    <div className="quote-item">
      <p className="id">Id: {quote.id}</p>
      <p className="size"> {quote.size}</p>
      <p className="price"> {quote.price}</p>
      <p className={`side ${side.toLowerCase()}`}> {Side[quote.side]}</p>
      <p className="date">Expiry date: 2024-07-24</p>
    </div>
  );
};

const Side = {
  0: "Buy",
  1: "Sell",
};

export default QuoteItem;

