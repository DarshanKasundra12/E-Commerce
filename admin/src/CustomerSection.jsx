import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboard.css';
import './App.css';

function CustomerSection() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/signup');
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        fetchCustomers();
    }, []);

    // Function to get the current time
  

    return (
        <div className="customer-section">
            <h3>Customer Login Details</h3>
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) => (
                        <tr key={index}>
                            <td>{customer._id}</td> {/* Assuming _id is the unique identifier */}
                            <td>{customer.email}</td>
                            <td>{"********"}</td> {/* Display placeholder instead of hashed password */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerSection;
