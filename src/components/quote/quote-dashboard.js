import React, { useState, useEffect } from "react";
import Quote from "./quote-item";
import "./quote-dashboard.css";
import styled from "styled-components";
import AcceptQuoteForm from "./accept-quote";
import Modal from "./quote-modal";
import abi from "./abi.json";
import * as ethers from "ethers";

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
  font-family: "Roboto", sans-serif;
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

const QuotesDashboard = () => {
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [_account, setAccount] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (window.ethereum) {
      // Request account access if needed
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setAccount(accounts[0]);
          fetchQuotes();
        })
        .catch((err) => setError(err.message));
    } else {
      setError("MetaMask is not installed");
    }
  }, []);

  const fetchQuotes = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contractAddress = "0x439f4E462FcE6DC69DBc3752ff6601d00dCf4240";
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const q = await contract.listQuotes();
      const quotesFormatted = q.map((q, i) => ({
        id: i,
        size: q.size.toString(),
        price: q.price.toString(),
        token: q.token,
        side: q.side,
      }));

      console.log(quotesFormatted);
      setQuotes(quotesFormatted);
    } catch (err) {
      setError(err.message);
    }
  };
  const handleQuoteClick = (quote) => {
    setSelectedQuote(quote);
    setIsModalOpen(true);
  };

  const handleSubmit = (formValues) => {
    console.log("Form submitted with values:", formValues);
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
      {error ? (
        error.toString()
      ) : (
        <Table>
          <TableHeader>
            <TableHeaderItem>Asset</TableHeaderItem>
            <TableHeaderItem>Price</TableHeaderItem>
            <TableHeaderItem>Quantity</TableHeaderItem>
            <TableHeaderItem>Side</TableHeaderItem>
          </TableHeader>
          {quotes.map((quote, index) => (
            <div key={index} onClick={() => handleQuoteClick(quote)}>
              <Quote
                asset={quote.token}
                price={quote.price}
                quantity={quote.size}
                side={Side[quote.side]}
              />
            </div>
          ))}
        </Table>
      )}
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

const Side = {
  0: "Buy",
  1: "Sell",
};

export default QuotesDashboard;
