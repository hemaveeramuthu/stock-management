import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CementDetailsPage = () => {
  const { brand } = useParams();
  
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem(`${brand}Transactions`)) || [];
    setTransactions(storedTransactions);
  }, [brand]);

  return (
    <div className="page-content">
      <h3>{brand} Cement Transactions</h3>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Action</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Name</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.action}</td>
                <td>{transaction.quantity}</td>
                <td>{transaction.price}</td>
                <td>{transaction.name}</td>
                <td>{transaction.paymentStatus}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No transactions found for this cement brand.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CementDetailsPage;
