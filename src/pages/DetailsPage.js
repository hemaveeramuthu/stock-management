import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DetailsPage = () => {
  const location = useLocation();
  const size = location.pathname.split('/').pop(); // Extracts the size from the URL

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem(`${size}Transactions`)) || [];
    setTransactions(storedTransactions);
  }, [size]);

  return (
    <div className="details-page">
      <h3>Transaction Details for {size.replace('Inch', ' Inch Stones')}</h3>

      {transactions.length > 0 ? (
        <table className="transaction-table">
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
              <tr key={index} className={t.paymentStatus === 'yes' ? 'paid' : 'unpaid'}>
                <td>{t.action}</td>
                <td>{t.date}</td>
                <td>{t.quantity}</td>
                <td>{t.price}</td>
                {t.action === 'remove' && <td>{t.name}</td>}
                {t.action === 'remove' && (
                  <td style={{ color: t.paymentStatus === 'yes' ? 'green' : 'red' }}>
                    {t.paymentStatus}
                  </td>
                )}
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

export default DetailsPage;
