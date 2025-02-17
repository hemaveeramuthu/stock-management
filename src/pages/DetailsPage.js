import React, { useEffect, useState } from 'react';

const DetailsPage = () => {
  const [selectedSize, setSelectedSize] = useState('');
  const [fourInchStock, setFourInchStock] = useState(0);
  const [sixInchStock, setSixInchStock] = useState(0);
  const [eightInchStock, setEightInchStock] = useState(0);

  useEffect(() => {
    // Retrieve stock data from localStorage
    setSelectedSize(localStorage.getItem('selectedSize') || '');
    setFourInchStock(Number(localStorage.getItem('fourInchStock')) || 0);
    setSixInchStock(Number(localStorage.getItem('sixInchStock')) || 0);
    setEightInchStock(Number(localStorage.getItem('eightInchStock')) || 0);
  }, []);

  return (
    <div className="details-page">
      <h3>Stock Details for {selectedSize}-inch Stones</h3>
      <p><strong>4 Inch Stones Stock:</strong> {fourInchStock}</p>
      <p><strong>6 Inch Stones Stock:</strong> {sixInchStock}</p>
      <p><strong>8 Inch Stones Stock:</strong> {eightInchStock}</p>
    </div>
  );
};

export default DetailsPage;
