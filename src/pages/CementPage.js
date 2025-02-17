import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CementPage = () => {
  const navigate = useNavigate();
  const cementBrands = ['Bharathi', 'Ramco', 'Dalmia', 'Priya', 'Jsw', 'Zurai', 'Ultratech'];

  const getStoredStock = (key) => Number(localStorage.getItem(key)) || 0;

  const [stock, setStock] = useState(
    cementBrands.reduce((acc, brand) => {
      acc[brand] = getStoredStock(`${brand}Stock`);
      return acc;
    }, {})
  );

  const [formData, setFormData] = useState({
    date: '',
    quantity: '',
    price: '',
    name: '',
    paymentStatus: '',
  });

  const [modalState, setModalState] = useState({ action: null, brand: null });

  useEffect(() => {
    cementBrands.forEach((brand) => {
      localStorage.setItem(`${brand}Stock`, stock[brand]);
    });
  }, [stock]);

  const handleStockUpdate = (brand, action) => {
    setModalState({ action, brand });
    setFormData({ date: '', quantity: '', price: '', name: '', paymentStatus: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { brand, action } = modalState;
    const quantity = parseInt(formData.quantity);
    if (!quantity || quantity <= 0) return;

    setStock((prevStock) => {
      const updatedStock = { ...prevStock };
      if (action === 'add') {
        updatedStock[brand] += quantity;
      } else if (action === 'remove' && prevStock[brand] >= quantity) {
        updatedStock[brand] -= quantity;
      }
      return updatedStock;
    });
    setModalState({ action: null, brand: null });
  };

  const handleDetailsClick = (brand) => {
    navigate(`/details/${brand}`, { state: stock });
  };

  return (
    <div className="page-content">
      <h3>Cement Stock</h3>
      {cementBrands.map((brand, index) => (
        <table key={index}>
          <thead>
            <tr>
              <th>{brand}</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{brand}</td>
              <td>{stock[brand]}</td>
              <td>
                <button onClick={() => handleStockUpdate(brand, 'add')}>Add</button>
                <button onClick={() => handleStockUpdate(brand, 'remove')}>Remove</button>
                <button onClick={() => handleDetailsClick(brand)}>Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      ))}

      {modalState.action && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setModalState({ action: null, brand: null })}>&times;</span>
            <h4>{modalState.action === 'add' ? 'Add' : 'Remove'} Stock for {modalState.brand}</h4>
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

export default CementPage;
