import React, { useEffect, useState } from 'react';
import './productDisplay.css';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDisplay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedRam, setSelectedRam] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [colors, setColors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const fetchProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/${productId}`);
      if (response.ok) {
        const productData = await response.json();
        setProduct(productData);

        if (productData.variants && productData.variants.length > 0) {
          const defaultVariant = productData.variants[0];
          setSelectedVariant(defaultVariant);
          setSelectedRam(defaultVariant.ram);
          setSelectedStorage(defaultVariant.storage);

          if (productData.category === 'Mobile') {
            const colors = Array.from(new Set(productData.variants.map(variant => variant.color)));
            setColors(colors);
          }
        }
      } else {
        setError('Failed to fetch product. Please try again later.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  const handleVariantSelection = (variantId) => {
    if (product && product.variants) {
      const selectedVariant = product.variants.find(variant => variant._id === variantId);
      if (selectedVariant) {
        setSelectedVariant(selectedVariant);
      }
    }
  };

  const handleRamSelection = (ram) => {
    setSelectedRam(ram);
    const filteredVariants = product.variants.filter(variant => variant.ram === ram && variant.storage === selectedStorage);
    if (filteredVariants.length > 0) {
      setSelectedVariant(filteredVariants[0]);
    }
  };

  const handleStorageSelection = (storage) => {
    setSelectedStorage(storage);
    const filteredVariants = product.variants.filter(variant => variant.ram === selectedRam && variant.storage === storage);
    if (filteredVariants.length > 0) {
      setSelectedVariant(filteredVariants[0]);
    }
  };

  const handleBuyNow = () => {
    if (selectedVariant) {
      navigate(`/payment-details/${id}`, {
        state: { variantId: selectedVariant._id },
      });
    } else {
      navigate(`/payment-details/${id}`, {
        state: { productId: product._id },
      });
    }
  };

  const handleAddToCart = () => {
    const isLoggedIn = !!localStorage.getItem('access_token'); // Check if the user is logged in
  
    // Check if the user is not logged in
    if (!isLoggedIn) {
      navigate('/signup'); // Redirect to signup page if not logged in
      return;
    }
  
    // Add the selected product to the cart
    const cartItem = selectedVariant
      ? { product: product, variant: selectedVariant }
      : { product: product, variant: null };
  
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  
    // Navigate to the cart page
    navigate('/cart');
  };
  
  

  if (error) return <div>{error}</div>;
  if (!product) return <div>Loading...</div>;

  const sentences = product.description ? product.description.split(/(?<=[.!?])\s+/).filter(sentence => sentence.trim() !== '') : [];

  return (
    <div className="product-detail">
      <img src={selectedVariant?.variantImageUrl || product.imageUrl} alt={product.name} />
      <div className="product-detail-details">
        <h1>{product.name}</h1>
        <div className="card-container">
          {product.category === 'Books' && (
            <div className="book-details">
              {product.variants.map((variant, index) => (
                <div
                  key={index}
                  className={`variant-card ${selectedVariant?._id === variant._id ? 'selected' : ''}`}
                  onClick={() => handleVariantSelection(variant._id)}
                >
                  <span>{variant.type}</span>
                  <span>₹{variant.price}</span>
                </div>
              ))}
            </div>
          )}
          {product.category !== 'Books' && (
            <div className="other-category-details">
              <span>Price: ₹{selectedVariant?.price || product.price}</span>
            </div>
          )}
        </div>
        <div className="description">
          <ul>
            <h3>Description:</h3>
            <br />
            {sentences.map((sentence, index) => (
              <li key={index}>{sentence.trim()}</li>
            ))}
          </ul>
        </div>
        {selectedVariant?.description && (
          <div className="variant-description">
            <ul>
              {selectedVariant.description.split('\n').map((item, index) => (
                item.trim() !== '' && /\S/.test(item) && <li key={index}>{item.trim()}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="options">
          {(product.category === 'Mobile' || product.category === 'Laptop' || product.category === 'T.V') && (
            <>
              <div className="ram-options">
                {Array.from(new Set(product.variants.map(variant => variant.ram))).map((ram, index) => (
                  <button
                    key={index}
                    className={ram === selectedRam ? 'selected' : ''}
                    onClick={() => handleRamSelection(ram)}
                  >
                    {ram}GB RAM
                  </button>
                ))}
              </div>
              <div className="storage-options">
                {Array.from(new Set(product.variants.map(variant => variant.storage))).map((storage, index) => (
                  <button
                    key={index}
                    className={storage === selectedStorage ? 'selected' : ''}
                    onClick={() => handleStorageSelection(storage)}
                  >
                    {storage}GB Storage
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="variants">
          {product.category !== 'Books' && product.variants && product.variants
            .filter(variant => variant.ram === selectedRam && variant.storage === selectedStorage)
            .map((variant, index) => (
              <div
                key={index}
                className={`variant-card ${selectedVariant?._id === variant._id ? 'selected' : ''}`}
                onClick={() => handleVariantSelection(variant._id)}
              >
                <img src={variant.variantImageUrl} alt={variant.color || 'Variant'} />
                <span>{variant.color}</span>
              </div>
            ))}
        </div>
        <div className="action-buttons">
          <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDisplay;
