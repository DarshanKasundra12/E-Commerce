import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './product.css'; // Assuming you have a Product.css file for styling

function Product() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://e-commerce-1-zey8.onrender.com/api/products');
      if (response.ok) {
        const productsData = await response.json();
        const matchedProducts = productsData.filter(product => fuzzyMatch(product.category, category));
        setProducts(matchedProducts);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fuzzyMatch = (productCategory, categoryName) => {
    if (!productCategory || !categoryName) return false;
    const normalizedProductCategory = productCategory.toLowerCase();
    const normalizedCategoryName = categoryName.toLowerCase();
    return normalizedProductCategory.includes(normalizedCategoryName) || normalizedCategoryName.includes(normalizedProductCategory);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  const handleClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const getDefaultPrice = (product) => {
    if (isNaN(product.price)) {
      const defaultVariant = product.variants.find(variant => !isNaN(variant.price));
      return defaultVariant ? formatPrice(defaultVariant.price) : 'N/A';
    }
    return formatPrice(product.price);
  };

  const getDefaultImage = (product) => {
    if (product.variants && product.variants.length > 0) {
      const defaultVariant = product.variants[0];
      return defaultVariant.variantImageUrl || product.imageUrl;
    }
    return product.imageUrl;
  };

  return (
    <div>
      <h1>{category}</h1>
      <div id="products">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id} className="product-card-link" onClick={() => handleClick(product.productId)}>
              <div className="product-card">
                <img src={getDefaultImage(product)} alt={product.name} />
                <h2>{product.name}</h2>
                <div className="price-container">
                  <p className="price">₹{getDefaultPrice(product)}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </div>
  );
}

export default Product;
