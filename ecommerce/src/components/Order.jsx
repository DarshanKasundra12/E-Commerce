import React, { useEffect, useState } from "react";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <p>Order ID: {index + 1}</p>
              <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    <p>Product: {item.product.name}</p>
                    {item.variant && (
                      <p>
                        Variant: RAM {item.variant.ram}GB, Storage {item.variant.storage}GB
                      </p>
                    )}
                    <p>Price: ₹{item.variant ? item.variant.price : item.product.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </li>
                ))}
              </ul>
              <p>Total Amount: ₹{order.totalAmount}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserOrders;
