import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PsandPage = () => {
  const navigate = useNavigate();

  // Load stock from localStorage on mount
  const getStoredStock = (key) => Number(localStorage.getItem(key)) || 0;

  const [stock, setStock] = useState(getStoredStock('psandStock'));

  // State for form data
  const [formData, setFormData] = useState({
    date: '',
    quantity: '',
    price: '',
    name: '',
    paymentStatus: '',  // Add this to handle radio buttons
  });

  const [modalState, setModalState] = useState(null);

  // Save stock changes to localStorage
  useEffect(() => {
    localStorage.setItem('psandStock', stock);
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
  
    // Handle stock update first
    let newStock = stock;
  
    if (modalState === 'add') {
      newStock = stock + quantity;
    } else if (modalState === 'remove' && stock >= quantity) {
      newStock = stock - quantity;
    } else {
      return; // Don't proceed if the condition isn't met
    }
  
    // Save the new stock to localStorage after updating it
    setStock(newStock);
  
    // Log the transaction
    const newTransaction = {
      action: modalState,
      date: formData.date,
      quantity: formData.quantity,
      price: formData.price,
      name: formData.name,
      paymentStatus: formData.paymentStatus, // Save the selected payment status
    };
  
    // Retrieve existing transactions and add the new one
    const storedTransactions = JSON.parse(localStorage.getItem('psandTransactions')) || [];
    storedTransactions.push(newTransaction);
  
    // Save the updated transactions back to localStorage
    localStorage.setItem('psandTransactions', JSON.stringify(storedTransactions));
  
    // Reset form and close modal
    setModalState(null);
    setFormData({ date: '', quantity: '', price: '', name: '', paymentStatus: '' });
  };
  

  const handleDetailsClick = () => {
    navigate('/details/psand', { state: stock });
  };

  return (
    <div className="page-content">
      <h3>Psand Stock</h3>
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
            <td>Psand</td>
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
            <h4>{modalState === 'add' ? 'Add' : 'Remove'} Stock</h4>

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
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="paymentStatus"
                        value="Paid"
                        checked={formData.paymentStatus === 'Paid'}
                        onChange={handleChange}
                      />
                      Paid
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="paymentStatus"
                        value="Unpaid"
                        checked={formData.paymentStatus === 'Unpaid'}
                        onChange={handleChange}
                      />
                      Unpaid
                    </label>
                  </div>
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

export default PsandPage;
