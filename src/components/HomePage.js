import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  // Function to retrieve stock from localStorage
  const getStoredStock = (key) => Number(localStorage.getItem(key)) || 0;

  const [stock, setStock] = useState({
    // Hollow Bricks
    fourInch: getStoredStock('fourInchStock'),
    sixInch: getStoredStock('sixInchStock'),
    eightInch: getStoredStock('eightInchStock'),

    // Cement Brands
    bharathi: getStoredStock('bharathiStock'),
    ramco: getStoredStock('ramcoStock'),
    dalmia: getStoredStock('dalmiaStock'),
    priya: getStoredStock('priyaStock'),
    jsw: getStoredStock('jswStock'),
    zurai: getStoredStock('zuraiStock'),
    ultratech: getStoredStock('ultratechStock'),

    // Msand & Psand
    msand: getStoredStock('msandStock'),
    psand: getStoredStock('psandStock'),

    // Chips (Jalli)
    oneFourth: getStoredStock('oneFourthStock'),
    oneHalf: getStoredStock('oneHalfStock'),
    threeFourth: getStoredStock('threeFourthStock'),
    oneAndHalf: getStoredStock('oneAndHalfStock')
  });

  // Product categories
  const productCategories = [
    { category: 'Hollow Bricks', products: [
      { key: 'fourInch', label: '4 Inch Bricks' },
      { key: 'sixInch', label: '6 Inch Bricks' },
      { key: 'eightInch', label: '8 Inch Bricks' }
    ]},
    { category: 'Cement', products: [
      { key: 'bharathi', label: 'Bharathi' },
      { key: 'ramco', label: 'Ramco' },
      { key: 'dalmia', label: 'Dalmia' },
      { key: 'priya', label: 'Priya' },
      { key: 'jsw', label: 'JSW' },
      { key: 'zurai', label: 'Zurai' },
      { key: 'ultratech', label: 'Ultratech' }
    ]},
    { category: 'Sand', products: [
      { key: 'msand', label: 'Msand' },
      { key: 'psand', label: 'Psand' }
    ]},
    { category: 'Chips (Jalli)', products: [
      { key: 'oneFourth', label: '1/4 Inch Jalli' },
      { key: 'oneHalf', label: '1/2 Inch Jalli' },
      { key: 'threeFourth', label: '3/4 Inch Jalli' },
      { key: 'oneAndHalf', label: '1 1/2 Inch Jalli' }
    ]}
  ];

  return (
    <div className="page-content">
      <h2>Stock Management Dashboard</h2>

      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Product</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {productCategories.map(({ category, products }) =>
            products.map(({ key, label }, index) => (
              <tr key={key}>
                {index === 0 && <td rowSpan={products.length}>{category}</td>}
                <td>{label}</td>
                <td>{stock[key]}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
