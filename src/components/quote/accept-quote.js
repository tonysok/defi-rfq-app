import React from 'react';
import styled from 'styled-components';

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
`;

const SubmitButton = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #45a049;
    }
`;

const Button = styled.button`
    background-color: #e74c3c;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #c0392b;
    }
`;

const AcceptQuoteForm = ({ selectedQuote, onSubmit, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedQuote);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Asset</Label>
        <Input type="text" name="asset" value={selectedQuote.asset} readOnly />
      </FormGroup>
      <FormGroup>
        <Label>Price</Label>
        <Input type="text" name="price" value={selectedQuote.price} readOnly />
      </FormGroup>
      <FormGroup>
        <Label>Quantity</Label>
        <Input type="text" name="quantity" value={selectedQuote.quantity} readOnly />
      </FormGroup>
      <FormGroup>
        <Label>Side</Label>
        <Input type="text" name="side" value={selectedQuote.side} readOnly />
      </FormGroup>
      <SubmitButton type="submit">Accept Quote</SubmitButton>
      <Button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>
        Cancel
      </Button>
    </form>
  );
};

export default AcceptQuoteForm;