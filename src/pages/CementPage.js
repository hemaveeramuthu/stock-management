import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CementPage = () => {
  const navigate = useNavigate();

  // Load stock from localStorage on mount
  const getStoredStock = (key) => Number(localStorage.getItem(key)) || 0;

  const [stock, setStock] = useState({
    Bharathi: getStoredStock('BharathiStock'),
    Ramco: getStoredStock('RamcoStock'),
    Dalmia: getStoredStock('DalmiaStock'),
    Priya: getStoredStock('PriyaStock'),
    Jsw: getStoredStock('JswStock'),
    Zurai: getStoredStock('ZuraiStock'),
    Ultratech: getStoredStock('UltratechStock'),
  });

  // State for form data
  const [formData, setFormData] = useState({
    date: '',
    quantity: '',
    price: '',
    name: '',
    paymentStatus: 'unpaid', // Default payment status as 'unpaid'
  });

  const [modalState, setModalState] = useState({ action: null, brand: null });

  // Save stock changes to localStorage
  useEffect(() => {
    Object.keys(stock).forEach(key => {
      localStorage.setItem(`${key}Stock`, stock[key]);
    });
  }, [stock]);

  const handleStockUpdate = (brand, action) => {
    setModalState({ action, brand });
    setFormData({ date: '', quantity: '', price: '', name: '', paymentStatus: 'unpaid' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, paymentStatus: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { action, brand } = modalState;
    const quantity = parseInt(formData.quantity);

    if (!quantity || quantity <= 0) return;

    // Update stock based on the action
    setStock((prevStock) => {
      const updatedStock = { ...prevStock };
      if (action === 'add') {
        updatedStock[brand] += quantity;
      } else if (action === 'remove' && prevStock[brand] >= quantity) {
        updatedStock[brand] -= quantity;
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
      paymentStatus: formData.paymentStatus || '',
    };

    const transactions = JSON.parse(localStorage.getItem(`${brand}Transactions`)) || [];
    transactions.push(transaction);
    localStorage.setItem(`${brand}Transactions`, JSON.stringify(transactions));

    setModalState({ action: null, brand: null });
  };

  const handleDetailsClick = (brand) => {
    navigate(`/details/${brand}`);
  };

  return (
    <div className="page-content">
      <h3>Cement Stock</h3>

      {[{ key: 'Bharathi', label: 'Bharathi' },
        { key: 'Ramco', label: 'Ramco' },
        { key: 'Dalmia', label: 'Dalmia' },
        { key: 'Priya', label: 'Priya' },
        { key: 'Jsw', label: 'JSW' },
        { key: 'Zurai', label: 'Zurai' },
        { key: 'Ultratech', label: 'Ultratech' },
      ].map(({ key, label }) => (
        <table key={key}>
          <thead>
            <tr>
              <th>{label} Cement</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{label} Cement</td>
              <td>{stock[key]}</td>
              <td>
                <button onClick={() => handleStockUpdate(key, 'add')}>Add</button>
                <button onClick={() => handleStockUpdate(key, 'remove')}>Remove</button>
                <button onClick={() => handleDetailsClick(key)}>Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      ))}

      {/* Modal */}
      {modalState.action && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setModalState({ action: null, brand: null })}>&times;</span>
            <h4>{modalState.action === 'add' ? 'Add' : 'Remove'} Stock for {modalState.brand} Cement</h4>

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

export default CementPage;
