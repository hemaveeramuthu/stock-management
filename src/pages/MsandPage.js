import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MsandPage = () => {
  const navigate = useNavigate();

  // Load stock from localStorage
  const getStoredStock = (key) => Number(localStorage.getItem(key)) || 0;

  const [stock, setStock] = useState({
    msand: getStoredStock('msandStock'),
  });

  // State for form data
  const [formData, setFormData] = useState({
    date: '',
    quantity: '',
    price: '',
    name: '',
    paymentStatus: 'Pending', // Default payment status
  });

  const [modalState, setModalState] = useState({ action: null, size: 'msand' });

  // Save stock to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('msandStock', stock.msand);
  }, [stock]);

  const handleStockUpdate = (action) => {
    setModalState({ action });
    setFormData({ date: '', quantity: '', price: '', name: '', paymentStatus: 'Pending' }); // Reset payment status
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentStatusChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, paymentStatus: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { action } = modalState;
    const quantity = parseInt(formData.quantity);
    if (!quantity || quantity <= 0) return;

    setStock((prevStock) => {
      const updatedStock = { ...prevStock };
      if (action === 'add') {
        updatedStock.msand += quantity;
      } else if (action === 'remove' && prevStock.msand >= quantity) {
        updatedStock.msand -= quantity;
      }
      return updatedStock;
    });

    // Store transaction details in localStorage
    const transactions = JSON.parse(localStorage.getItem('msandTransactions')) || [];
    transactions.push({ ...formData, action });
    localStorage.setItem('msandTransactions', JSON.stringify(transactions));

    setModalState({ action: null });
  };

  const handleDetailsClick = () => {
    navigate(`/details/msand`);
  };

  return (
    <div className="page-content">
      <h3>Msand Stock</h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Msand</td>
            <td>{stock.msand}</td>
            <td>
              <button onClick={() => handleStockUpdate('add')}>Add</button>
              <button onClick={() => handleStockUpdate('remove')}>Remove</button>
              <button onClick={handleDetailsClick}>Details</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Modal */}
      {modalState.action && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setModalState({ action: null })}>&times;</span>
            <h4>{modalState.action === 'add' ? 'Add' : 'Remove'} Stock for Msand</h4>
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

              {modalState.action === 'remove' && (
                <>
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
                </>
              )}

              <button type="submit">{modalState.action === 'add' ? 'Add Stock' : 'Remove Stock'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MsandPage;
