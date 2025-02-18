import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HollowBricksPage = () => {
  const navigate = useNavigate();

  // Load stock from localStorage
  const getStoredStock = (key) => Number(localStorage.getItem(key)) || 0;

  const [stock, setStock] = useState({
    fourInch: getStoredStock('fourInchStock'),
    sixInch: getStoredStock('sixInchStock'),
    eightInch: getStoredStock('eightInchStock')
  });

  // State for form data
  const [formData, setFormData] = useState({
    date: '',
    quantity: '',
    price: '',
    name: '',
    paymentStatus: 'unpaid' // Default payment status as 'unpaid'
  });

  const [modalState, setModalState] = useState({ action: null, size: null });

  // Save stock to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('fourInchStock', stock.fourInch);
    localStorage.setItem('sixInchStock', stock.sixInch);
    localStorage.setItem('eightInchStock', stock.eightInch);
  }, [stock]);

  const handleStockUpdate = (size, action) => {
    setModalState({ action, size });
    setFormData({ date: '', quantity: '', price: '', name: '', paymentStatus: 'unpaid' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, paymentStatus: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { size, action } = modalState;
    const quantity = parseInt(formData.quantity);
    if (!quantity || quantity <= 0) return;

    setStock((prevStock) => {
      const updatedStock = { ...prevStock };
      if (action === 'add') {
        updatedStock[size] += quantity;
      } else if (action === 'remove' && prevStock[size] >= quantity) {
        updatedStock[size] -= quantity;
      }
      return updatedStock;
    });

    // Store transaction details in localStorage
    const transactions = JSON.parse(localStorage.getItem(`${size}Transactions`)) || [];
    transactions.push({ ...formData, action, size });
    localStorage.setItem(`${size}Transactions`, JSON.stringify(transactions));

    setModalState({ action: null, size: null });
  };

  const handleDetailsClick = (size) => {
    navigate(`/details/${size}`);
  };

  return (
    <div className="page-content">
      <h3>Hollow Bricks Stock</h3>
      {['fourInch', 'sixInch', 'eightInch'].map((size) => (
        <table key={size}>
          <thead>
            <tr>
              <th>{size.replace('Inch', ' Inch Stones')}</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{size.replace('Inch', ' Inch Stones')}</td>
              <td>{stock[size]}</td>
              <td>
                <button onClick={() => handleStockUpdate(size, 'add')}>Add</button>
                <button onClick={() => handleStockUpdate(size, 'remove')}>Remove</button>
                <button onClick={() => handleDetailsClick(size)}>Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      ))}

      {/* Modal */}
      {modalState.action && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setModalState({ action: null, size: null })}>&times;</span>
            <h4>{modalState.action === 'add' ? 'Add' : 'Remove'} Stock for {modalState.size.replace('Inch', ' Inch Stones')}</h4>
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

              {/* Payment Status Radio Buttons */}
              <label>Payment Status</label>
              <div>
                <label>
                  <input 
                    type="radio" 
                    name="paymentStatus" 
                    value="paid" 
                    checked={formData.paymentStatus === 'paid'} 
                    onChange={handleRadioChange} 
                  />
                  Paid
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="paymentStatus" 
                    value="unpaid" 
                    checked={formData.paymentStatus === 'unpaid'} 
                    onChange={handleRadioChange} 
                  />
                  Unpaid
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

export default HollowBricksPage;
