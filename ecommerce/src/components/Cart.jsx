import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import './cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('access_token');

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems.map(item => ({ ...item, quantity: item.quantity || 1 })));
  }, []);

  const removeFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const updateQuantity = (index, amount) => {
    const updatedCartItems = [...cartItems];
    const newQuantity = updatedCartItems[index].quantity + amount;
    if (newQuantity > 0) {
      updatedCartItems[index].quantity = newQuantity;
      setCartItems(updatedCartItems);
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    }
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const price = item.variant ? parseFloat(item.variant.price) : parseFloat(item.product.price);
      return total + price * item.quantity;
    }, 0);
  };

  const handlePlaceOrder = () => {
    if (!isLoggedIn) {
      navigate('/signup');
      return;
    }

    const orderData = {
      items: cartItems,
      totalAmount: calculateTotalAmount(),
      orderDate: new Date().toISOString(),
    };

    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    storedOrders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(storedOrders));

    generatePDF(orderData);

    setCartItems([]);
    localStorage.removeItem('cart');
    navigate('/order');
  };

  const generatePDF = (orderData) => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    let y = 20;

    doc.text('Invoice', 10, y);
    y += 10;

    orderData.items.forEach((item, index) => {
      y += 10;

      if (item.variant) {
        if (item.product.category === 'Mobile' || item.product.category === 'Laptop' || item.product.category === 'T.V') {
          doc.text(`Variant: RAM ${item.variant.ram}GB, Storage ${item.variant.storage}GB`, 10, y);
          y += 5;
        } else if (item.product.category === 'Books') {
          doc.text(`Type: ${item.variant.type}, Font: ${item.variant.font}`, 10, y);
          y += 5;
        }
        doc.text(`Price: ₹${item.variant.price}`, 10, y);
        y += 5;
      }

      doc.text(`${item.product.name}`, 10, y);
      y += 5;
      doc.text(`Price: ₹${item.variant ? item.variant.price : item.product.price}`, 10, y);
      y += 10;
    });

    y += 10;
    doc.text(`Total Amount: ₹${orderData.totalAmount}`, 10, y);
    y += 10;
    doc.text(`Date: ${new Date(orderData.orderDate).toLocaleDateString()}`, 10, y);

    const currentDate = new Date().toISOString().split('T')[0];
    const fileName = `invoice_${currentDate}.pdf`;

    doc.save(fileName);
  };

  if (cartItems.length === 0) {
    return <div className="empty-cart">Your cart is empty</div>;
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="cart-item-details">
              <h2>{item.product.name}</h2>
              {item.variant && (
                <>
                  {item.product.category === 'Mobile' || item.product.category === 'Laptop' || item.product.category === 'T.V' ? (
                    <p>
                      Variant: RAM {item.variant.ram}GB, Storage {item.variant.storage}GB
                    </p>
                  ) : item.product.category === 'Books' ? (
                    <p>
                      Type: {item.variant.type}
                    </p>
                  ) : null}
                </>
              )}
              <p>Price: ₹{item.variant ? item.variant.price : item.product.price}</p>
              <div className="quantity-control">
                <button onClick={() => updateQuantity(index, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(index, 1)}>+</button>
                <button className="remove-button" onClick={() => removeFromCart(index)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="total-amount">
        <h2>Total Amount: ₹{calculateTotalAmount()}</h2>
      </div>
      <button className="checkout" onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}

export default Cart;
