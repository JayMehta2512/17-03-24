import React, { useState } from 'react';
 
import "./Product.css"; // Import Firebase Auth
import { Link } from 'react-router-dom';

const products = [
  {
    name: 'Regular Water',
    price: 10.99,
    refillPrice: 7.69, // 70% of the original price
    description: 'Standard water for daily use.',
    jugImageUrl: require('./image/Jar.webp'),
    refillImageUrl: require('./image/Refill.jpg'),
    overlayText: 'Standard Jug',
    stampText: "",
  },
  {
    name: 'Mineral Water',
    price: 12.99,
    refillPrice: 9.09, // 70% of the original price
    description: 'Water enriched with essential minerals.',
    jugImageUrl: require('./image/Jar.webp'),
    refillImageUrl: require('./image/Refill.jpg'),
    overlayText: ' Mineral Water',
    stampText: "Mineral",
  },
  {
    name: 'Alkaline Water',
    price: 14.99,
    refillPrice: 10.49, // 70% of the original price
    description: 'Water with a higher pH level for better hydration.',
    jugImageUrl: require('./image/Jar.webp'),
    refillImageUrl: require('./image/Refill.jpg'),
    overlayText: 'Alkaline Water ',
    stampText: "Alkaline",
  },
  {
    name: 'RO Water',
    price: 11.99,
    refillPrice: 8.39, // 70% of the original price
    description: 'Purified water through reverse osmosis filtration.',
    jugImageUrl: require('./image/Jar.webp'),
    refillImageUrl: require('./image/Refill.jpg'),
    overlayText: 'RO Water Jug',
    stampText: "Purified",
  },
  // Add more products as needed
];

function Product({ name, price, refillPrice, description, jugImageUrl, refillImageUrl, overlayText, stampText }) {
  const [productType, setProductType] = useState('jug'); // Default to 'jug'
  const [quantity, setQuantity] = useState(1);

  
  return (
    <div className="product">
      <div className="image-container">
        <img src={productType === 'refill' ? refillImageUrl : jugImageUrl} alt={name} />
        <div className="stamp">{stampText}</div>
        {productType === 'jug' && <div className="overlay">{overlayText}</div>}
      </div>
      <h3>{name}</h3>
      <p>Rs{productType === 'refill' ? refillPrice : price}</p>
      <p>{description}</p>
      <div className="dropdown">
        <label htmlFor="productType">Select Product Type:</label>
        <select id="productType" value={productType} onChange={(e) => setProductType(e.target.value)}>
          <option value="jug">Water Jug</option>
          <option value="refill">Water Jug Refill</option>
        </select>
        <label htmlFor="quantity">Select Quantity:</label>
        <input type="number" id="quantity" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </div>
      <Link to="/login">
      <button>Add to Cart</button>
    </Link>
    </div>
  );
}

function ProductsList() {
  return (
    <div className="products-list">
      {products.map((product, index) => (
        <Product key={index} {...product} />
      ))}
    </div>
  );
}

export default ProductsList;
