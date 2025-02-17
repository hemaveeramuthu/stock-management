import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MsandPage = () => {
  const navigate = useNavigate();

  // Load stock from localStorage on mount
  const getStoredStock = (key) => Number(localStorage.getItem(key)) || 0;

  const [stock, setStock] = useState(getStoredStock('msandStock'));

  // State for form data
  const [formData, setFormData] = useState({
    date: '',
    quantity: '',
    price: '',
    name: '',
    paymentStatus: '',
  });

  const [modalState, setModalState] = useState(null);

  // Save stock changes to localStorage
  useEffect(() => {
    localStorage.setItem('msandStock', stock);
  }, [stock]);

  const handleStockUpdate = (action) => {
    setModalState(action);
    setFormData({ date: '', quantity: '', price: '', name: '', paymentStatus: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const quantity = parseInt(formData.quantity);
    if (!quantity || quantity <= 0) return;

    setStock((prevStock) => {
      if (modalState === 'add') {
        return prevStock + quantity;
      } else if (modalState === 'remove' && prevStock >= quantity) {
        return prevStock - quantity;
      }
      return prevStock;
    });

    setModalState(null);
  };

  const handleDetailsClick = () => {
    navigate('/details/msand', { state: { stock } });
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
            <td>{stock}</td>
            <td>
              <button onClick={() => handleStockUpdate('add')}>Add</button>
              <button onClick={() => handleStockUpdate('remove')}>Remove</button>
              <button onClick={handleDetailsClick}>Details</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Modal */}
      {modalState && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setModalState(null)}>&times;</span>
            <h4>{modalState === 'add' ? 'Add' : 'Remove'} Stock for Msand</h4>
            <form onSubmit={handleSubmit}>
              {modalState === 'remove' && (
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
              
              {modalState === 'remove' && (
                <>
                  <label>Payment Status</label>
                  <input type="text" name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} required />
                </>
              )}
              
              <button type="submit">{modalState === 'add' ? 'Add Stock' : 'Remove Stock'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MsandPage;