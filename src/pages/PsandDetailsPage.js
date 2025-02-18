import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PsandDetailsPage = () => {
  const location = useLocation();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('psandTransactions')) || [];
    setTransactions(storedTransactions);
  }, []);

  return (
    <div className="details-page">
      <h3>Transaction Details for Psand</h3>

      {transactions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Date</th>
              <th>Quantity</th>
              <th>Price</th>
              {transactions.some(t => t.action === 'remove') && <th>Name</th>}
              {transactions.some(t => t.action === 'remove') && <th>Payment Status</th>}
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, index) => (
              <tr key={index}>
                <td>{t.action}</td>
                <td>{t.date}</td>
                <td>{t.quantity}</td>
                <td>{t.price}</td>
                {t.action === 'remove' && <td>{t.name}</td>}
                {t.action === 'remove' && <td>{t.paymentStatus}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions recorded yet.</p>
      )}
    </div>
  );
};

export default PsandDetailsPage;
