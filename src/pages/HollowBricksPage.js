import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HollowBricksPage = () => {
  const navigate = useNavigate();

  // Load stock from localStorage on mount
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
    paymentStatus: '',
  });

  const [modalState, setModalState] = useState({ action: null, size: null });

  // Save stock changes to localStorage
  useEffect(() => {
    localStorage.setItem('fourInchStock', stock.fourInch);
    localStorage.setItem('sixInchStock', stock.sixInch);
    localStorage.setItem('eightInchStock', stock.eightInch);
  }, [stock]);

  const handleStockUpdate = (size, action) => {
    if (action === 'add') {
      setModalState({ action: 'add', size });
    } else {
      setModalState({ action: 'remove', size });
    }
    setFormData({ date: '', quantity: '', price: '', name: '', paymentStatus: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    setModalState({ action: null, size: null });
  };

  const handleDetailsClick = (size) => {
    navigate(`/details/${size}`, {
      state: stock
    });
  };

  return (
    <div className="page-content">
      <h3>Hollow Bricks Stock</h3>

      {["fourInch", "sixInch", "eightInch"].map((size, index) => (
        <table key={index}>
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
              
              {modalState.action === 'remove' && (
                <>
                  <label>Payment Status</label>
                  <input type="text" name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} required />
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

export default HollowBricksPage;
