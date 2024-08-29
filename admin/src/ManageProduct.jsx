// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ManageProduct.css';

// function ManageProducts() {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3001/api/products');
//                 setProducts(response.data);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };

//         fetchProducts();
//     }, []);

//     // const handleVariantDiscountChange = (productIndex, variantIndex, discount) => {
//     //     const updatedProducts = [...products];
//     //     updatedProducts[productIndex].variants[variantIndex].discount = discount;
//     //     setProducts(updatedProducts);
//     // };

//     // const applyDiscounts = async () => {
//     //     try {
//     //         await axios.post('http://localhost:3001/api/products/discounts', products);
//     //         alert('Discounts applied successfully!');
//     //     } catch (error) {
//     //         console.error('Error applying discounts:', error);
//     //         alert('Failed to apply discounts. Please try again.');
//     //     }
//     // };

//     const removeProduct = async (productId) => {
//         try {
//             await axios.delete(`http://localhost:3001/api/products/${productId}`);
//             setProducts(products.filter(product => product.productId !== productId));
//             alert('Product removed successfully!');
//         } catch (error) {
//             console.error('Error removing product:', error);
//             alert('Failed to remove product. Please try again.');
//         }
//     };

//     return (
//         <div className="manage-products-container">
//             <h1>Manage Products</h1>
//             <table className="products-table">
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Product Price</th>
//                         <th>Variant Price</th>
//                         <th>RAM</th>
//                         <th>Storage</th>
//                         {/* <th>Discount (%)</th>
//                         <th>Discounted Price</th> */}
//                         <th>Remove</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {products.map((product) => (
//                         <React.Fragment key={product.productId}>
//                             <tr>
//                                 <td rowSpan={product.variants.length > 0 ? product.variants.length + 1 : 1}>{product.name}</td>
//                                 <td rowSpan={product.variants.length > 0 ? product.variants.length + 1 : 1}>₹{product.price}</td>
//                                 {product.variants.length === 0 && (
//                                     <>
//                                         <td>N/A</td>
//                                         <td>N/A</td>
//                                         <td>N/A</td>
//                                         {/* <td>
//                                             <input
//                                                 type="number"
//                                                 className="discount-input"
//                                                 value={product.discount || 0}
//                                                 onChange={(e) => handleVariantDiscountChange(productIndex, 0, e.target.value)}
//                                                 min="0"
//                                                 max="100"
//                                             />
//                                         </td>
//                                         <td>₹{(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}</td> */}
//                                         <td>
//                                             <button className="remove-button" onClick={() => removeProduct(product.productId)}>Remove</button>
//                                         </td>
//                                     </>
//                                 )}
//                             </tr>
//                             {product.variants.map((variant, variantIndex) => (
//                                 <tr key={`${product.productId}-variant-${variantIndex}`}>
//                                     {/* <td>{variant.type}</td> */}
//                                     <td>₹{variant.price}</td>
//                                     <td>{variant.ram} GB</td>
//                                     <td>{variant.storage} GB</td>
//                                     {/* <td>
//                                         <input
//                                             type="number"
//                                             className="discount-input"
//                                             value={variant.discount || 0}
//                                             onChange={(e) => handleVariantDiscountChange(productIndex, variantIndex, e.target.value)}
//                                             min="0"
//                                             max="100"
//                                         />
//                                     </td>
//                                     <td>₹{(variant.price * (1 - (variant.discount || 0) / 100)).toFixed(2)}</td> */}
//                                     <td>
//                                             <button className="remove-button" onClick={() => removeProduct(product.productId)}>Remove</button>
//                                         </td>
//                                 </tr>
//                             ))}
//                         </React.Fragment>
//                     ))}
//                 </tbody>
//             </table>
//             {/* <button className="apply-discounts-button" onClick={applyDiscounts}>Apply Discounts</button> */}
//         </div>
//     );
// }

// export default ManageProducts;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageProduct.css';

function ManageProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const removeProduct = async (productId) => {
        try {
            console.log(`Attempting to delete product with ID: ${productId}`);
            await axios.delete(`http://localhost:3001/api/products/${productId}`);
            setProducts(products.filter(product => product._id !== productId));
            alert('Product removed successfully!');
        } catch (error) {
            console.error('Error removing product:', error);
            alert('Failed to remove product. Please try again.');
        }
    };

    return (
        <div className="manage-products-container">
            <h1>Manage Products</h1>
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Product Price</th>
                        <th>Variant Price</th>
                        <th>RAM</th>
                        <th>Storage</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, productIndex) => (
                        <React.Fragment key={product._id}>
                            <tr>
                                <td rowSpan={product.variants.length > 0 ? product.variants.length + 1 : 1}>{product.name}</td>
                                <td rowSpan={product.variants.length > 0 ? product.variants.length + 1 : 1}>₹{product.price}</td>
                                {product.variants.length === 0 && (
                                    <>
                                        <td>N/A</td>
                                        <td>N/A</td>
                                        <td>N/A</td>
                                        <td>
                                            <button className="remove-button" onClick={() => removeProduct(product._id)}>Remove</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                            {product.variants.map((variant, variantIndex) => (
                                <tr key={`${product._id}-variant-${variantIndex}`}>
                                    <td>₹{variant.price}</td>
                                    <td>{variant.ram} GB</td>
                                    <td>{variant.storage} GB</td>
                                    <td>
                                        <button className="remove-button" onClick={() => removeProduct(product._id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageProducts;
