import React, { useState } from 'react'
import Quote from './quote-item'
import './quote-dashboard.css'
import styled from 'styled-components'
import AcceptQuoteForm from './accept-quote'
import Modal from './quote-modal'

const DashboardContainer = styled.div`
    padding: 20px;
    width: 800px;
    max-width: 1200px;
    margin: 0 auto;
    color: #000000;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    font-family: 'Roboto', sans-serif;
`;

const Table = styled.div`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #333;
  color: white;
  border-radius: 4px;
`;

const TableHeaderItem = styled.div`
  flex: 1;
  text-align: center;
`;

const quotes = [
  { id: "1", asset: 'BTC', price: '50000', quantity: '0.1', side: 'buy' },
  { id: "2", asset: 'ETH', price: '4000', quantity: '1', side: 'sell' },
  { id: "3", asset: 'LTC', price: '200', quantity: '10', side: 'buy' },
  // Add more quotes as needed
];

const QuotesDashboard = () => {
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuoteClick = (quote) => {
    setSelectedQuote(quote);
    setIsModalOpen(true);
  };

  const handleSubmit = (formValues) => {
    console.log('Form submitted with values:', formValues);
    // Handle form submission logic here
    setIsModalOpen(false); // Close modal after submission
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuote(null);
  };

  return (
    <DashboardContainer>
      <Title>Quotes Dashboard</Title>
      <Table>
        <TableHeader>
          <TableHeaderItem>Asset</TableHeaderItem>
          <TableHeaderItem>Price</TableHeaderItem>
          <TableHeaderItem>Quantity</TableHeaderItem>
          <TableHeaderItem>Side</TableHeaderItem>
        </TableHeader>
        {quotes.map((quote) => (
          <div key={quote.id} onClick={() => handleQuoteClick(quote)}>
            <Quote
              asset={quote.asset}
              price={quote.price}
              quantity={quote.quantity}
              side={quote.side}
            />
          </div>
        ))}
      </Table>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <AcceptQuoteForm
            selectedQuote={selectedQuote}
            onSubmit={handleSubmit}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </DashboardContainer>
  );
};

export default QuotesDashboard;
