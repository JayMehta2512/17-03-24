import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, getFirestore, deleteDoc, doc } from 'firebase/firestore'; // Import Firestore
import { getAuth } from 'firebase/auth';
import "../styles/Order.css"; // Updated CSS file

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const auth = getAuth();
        if (!auth.currentUser) {
          throw new Error('No user logged in.');
        }
        const currentUser = auth.currentUser;

        const firestore = getFirestore();
        const userProductsRef = collection(firestore, 'products');
        const q = query(userProductsRef, where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);

        let items = [];
        let total = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const price = parseFloat(data.price);
          if (!isNaN(price)) {
            items.push({ ...data, docId: doc.id, price: price }); // Include the document ID for deletion
            total += price * data.quantity; // Multiply price by quantity for total price
          } else {
            console.error('Invalid price for item:', data); // Log invalid prices
          }
        });

        setCartItems(items);
        setTotalPrice(total);
      } catch (error) {
        console.error('Error fetching cart items: ', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = (docId, newQuantity) => {
    const updatedItems = cartItems.map((item) => {
      if (item.docId === docId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedItems);
    updateTotalPrice(updatedItems);
  };

  const updateTotalPrice = (updatedItems) => {
    let total = 0;
    updatedItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  };

  const handleRemoveItem = async (docId) => {
    try {
      const firestore = getFirestore();
      await deleteDoc(doc(firestore, 'products', docId));
      const updatedItems = cartItems.filter((item) => item.docId !== docId);
      setCartItems(updatedItems);
      updateTotalPrice(updatedItems);
    } catch (error) {
      console.error('Error removing item: ', error);
    }
  };

  const handleCheckout = () => {
    // Logic for checkout process, redirect to payment page, etc.
    console.log('Redirecting to payment page...');
  };

  return (
    <div className="shopping-cart">
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} className="cart-item">
            <div className="item-info">
              
              <div className="details">
                <p className="name">{item.name}</p>
                <p className="description">{item.description}</p>
              </div>
            </div>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(item.docId, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.docId, item.quantity + 1)}>+</button>
            </div>
            <p className="price">Rs{item.price * item.quantity}</p> {/* Total price for this item */}
            <button className="remove-btn" onClick={() => handleRemoveItem(item.docId)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="total-container">
        <p className="total">Total: Rs{totalPrice}</p>
        <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default ShoppingCart;
