import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChipsPage = () => {
  const navigate = useNavigate();

  // Load stock from localStorage on mount
  const getStoredStock = (key) => Number(localStorage.getItem(key)) || 0;

  const [stock, setStock] = useState({
    oneFourth: getStoredStock('oneFourthStock'),
    oneHalf: getStoredStock('oneHalfStock'),
    threeFourth: getStoredStock('threeFourthStock'),
    oneAndHalf: getStoredStock('oneAndHalfStock')
  });

  // State for form data
  const [formData, setFormData] = useState({
    date: '',
    quantity: '',
    price: '',
    name: '',
    paymentStatus: 'Pending'  // Default payment status
  });

  const [modalState, setModalState] = useState({ action: null, size: null });

  // Save stock changes to localStorage
  useEffect(() => {
    Object.keys(stock).forEach(key => {
      localStorage.setItem(`${key}Stock`, stock[key]);
    });
  }, [stock]);

  const handleStockUpdate = (size, action) => {
    setModalState({ action, size });
    setFormData({ date: '', quantity: '', price: '', name: '', paymentStatus: 'Pending' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleActionChange = (e) => {
    const { value } = e.target;
    setModalState({ ...modalState, action: value });
  };

  const handlePaymentStatusChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, paymentStatus: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { action, size } = modalState;
    const quantity = parseInt(formData.quantity);

    if (!quantity || quantity <= 0) return;

    // Update stock based on the action
    setStock((prevStock) => {
      const updatedStock = { ...prevStock };
      if (action === 'add') {
        updatedStock[size] += quantity;
      } else if (action === 'remove' && prevStock[size] >= quantity) {
        updatedStock[size] -= quantity;
      }
      return updatedStock;
    });

    // Add the transaction to the localStorage
    const transaction = {
      date: formData.date,
      action,
      quantity,
      price: formData.price,
      name: formData.name || '',
      paymentStatus: formData.paymentStatus,
    };

    const transactions = JSON.parse(localStorage.getItem(`${size}Transactions`)) || [];
    transactions.push(transaction);
    localStorage.setItem(`${size}Transactions`, JSON.stringify(transactions));

    setModalState({ action: null, size: null });
  };

  const handleDetailsClick = (size) => {
    navigate(`/details/${size}`);
  };

  return (
    <div className="page-content">
      <h3>Chips (Jalli) Stock</h3>

      {[{ key: 'oneFourth', label: '1/4' }, { key: 'oneHalf', label: '1/2' }, { key: 'threeFourth', label: '3/4' }, { key: 'oneAndHalf', label: '1 1/2' }].map(
        ({ key, label }) => (
          <table key={key}>
            <thead>
              <tr>
                <th>{label} Chips</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{label} Chips</td>
                <td>{stock[key]}</td>
                <td>
                  <button onClick={() => handleStockUpdate(key, 'add')}>Add</button>
                  <button onClick={() => handleStockUpdate(key, 'remove')}>Remove</button>
                  <button onClick={() => handleDetailsClick(key)}>Details</button>
                </td>
              </tr>
            </tbody>
          </table>
        )
      )}

      {/* Modal */}
      {modalState.action && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setModalState({ action: null, size: null })}>
              &times;
            </span>
            <h4>{modalState.action === 'add' ? 'Add' : 'Remove'} Stock for {modalState.size.replace(/oneFourth|oneHalf|threeFourth|oneAndHalf/, (match) => ({
              oneFourth: '1/4',
              oneHalf: '1/2',
              threeFourth: '3/4',
              oneAndHalf: '1 1/2',
            })[match])} Chips</h4>

            <form onSubmit={handleSubmit}>
              {modalState.action === 'remove' && (
                <>
                  <label>Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </>
              )}
              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />

              <label>Quantity</label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />

              <label>Price</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required />

              <label>Payment Status</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="paymentStatus"
                    value="Paid"
                    checked={formData.paymentStatus === 'Paid'}
                    onChange={handlePaymentStatusChange}
                  />
                  Paid
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentStatus"
                    value="Pending"
                    checked={formData.paymentStatus === 'Pending'}
                    onChange={handlePaymentStatusChange}
                  />
                  Pending
                </label>
              </div>

              <button type="submit">{modalState.action === 'add' ? 'Add Stock' : 'Remove Stock'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChipsPage;
