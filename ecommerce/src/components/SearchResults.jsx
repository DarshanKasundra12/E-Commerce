import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const navigate = useNavigate();

  // Fetch products based on the query
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!query) {
          setProducts([]);
          return;
        }

        const response = await fetch(
          `http://localhost:3001/api/search?query=${query}`
        );
        if (!response.ok) {
          throw new Error("Error fetching search results");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchProducts();
  }, [query]); // Only re-run effect if query changes

  // Fetch individual product when clicked
  const fetchProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/products/${productId}`
      );
      if (response.ok) {
        const productData = await response.json();
        // Handle the product data as needed
      } else {
        console.error("Failed to fetch product");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // Handle product click
  const handleClick = (productId) => {
    fetchProduct(productId); // Fetch individual product
    navigate(`/product/${productId}`);
  };

  // Function to get the default image URL for a product
  const getDefaultImage = (product) => {
    if (product.variants && product.variants.length > 0) {
      const defaultVariant = product.variants[0]; // Assuming the first variant is the default one
      return defaultVariant.variantImageUrl || product.imageUrl;
    }
    return product.imageUrl;
  };

  // Function to get the default price for a product
  const getDefaultPrice = (product) => {
    if (product.variants && product.variants.length > 0) {
      const defaultVariant = product.variants[0]; // Assuming the first variant is the default one
      return defaultVariant.price || product.price;
    }
    return product.price;
  };

  return (
    <div>
      <h1>Search Results</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.productId}
            className="product-card"
            onClick={() => handleClick(product.productId)}
          >
            <img
              src={getDefaultImage(product)}
              alt={product.name}
              className="product-image"
            />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">₹{getDefaultPrice(product)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
