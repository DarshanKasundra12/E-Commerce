import React, { useState } from 'react';
import './addproduct.css';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState(''); // Reintroduce the description state
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(''); // Price field for non-variant products
  const [variants, setVariants] = useState([{ type: '', description: '', price: '', variantImageUrl: '', ram: '', storage: '', color: '' }]);

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { type: '', description: '', price: '', variantImageUrl: '', ram: '', storage: '', color: '' }]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const hasVariants = (category) => {
    return category === 'Laptop' || category === 'Mobile' || category === 'T.V' || category === 'Books';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const product = { name, category };

    if (hasVariants(category)) {
      product.variants = variants.map(variant => ({
        type: variant.type,
        description: variant.description,
        price: parseFloat(variant.price.replace(/,/g, '')),
        variantImageUrl: variant.variantImageUrl,
        ram: variant.ram,
        storage: variant.storage,
        color: variant.color,
      }));
    } else {
      product.imageUrl = imageUrl;
      product.price = parseFloat(price.replace(/,/g, ''));
      product.description = description;
    }

    try {
      const response = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });

      if (response.ok) {
        alert('Product added successfully!');
        // Reset form fields here
        setName('');
        setDescription(''); // Reset description
        setImageUrl('');
        setCategory('');
        setPrice('');
        setVariants([{ type: '', description: '', price: '', variantImageUrl: '', ram: '', storage: '', color: '' }]);
      } else {
        const errorData = await response.json();
        alert(`Failed to add product: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-form">
        <h1>Add Product</h1>
        <form id="productForm" onSubmit={handleSubmit}>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select category</option>
            <option value="Laptop">Laptop</option>
            <option value="Mobile">Mobile</option>
            <option value="Books">Books</option>
            <option value="Toys">Toys</option>
            <option value="T.V">T.V</option>
            <option value="WATCHES">WATCHES</option>
          </select>

          {hasVariants(category) ? (
            <div>
              <h3>Variants</h3>
              {variants.map((variant, index) => (
                <div key={index} className="variant">
                  <label htmlFor={`variantImageUrl-${index}`}>Variant Image URL</label>
                  <input
                    type="url"
                    id={`variantImageUrl-${index}`}
                    name="variantImageUrl"
                    value={variant.variantImageUrl}
                    onChange={(e) => handleVariantChange(index, 'variantImageUrl', e.target.value)}
                    required
                  />

                  {category === 'Books' ? (
                    <div>
                      <label htmlFor={`type-${index}`}>Type</label>
                      <select
                        id={`type-${index}`}
                        name={`type-${index}`}
                        value={variant.type}
                        onChange={(e) => handleVariantChange(index, 'type', e.target.value)}
                        required
                      >
                        <option value="" disabled>Select type</option>
                        <option value="paperback">Paperback</option>
                        <option value="hardcover">Hardcover</option>
                      </select>
                    </div>
                  ) : (
                    <div>
                      {category === 'Mobile' && (
                        <div>
                          <label htmlFor={`color-${index}`}>Color</label>
                          <input
                            type="text"
                            id={`color-${index}`}
                            name={`color-${index}`}
                            value={variant.color}
                            onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                            required
                          />
                        </div>
                      )}
                      <label htmlFor={`ram-${index}`}>RAM (GB)</label>
                      <input
                        type="number"
                        id={`ram-${index}`}
                        name={`ram-${index}`}
                        value={variant.ram}
                        onChange={(e) => handleVariantChange(index, 'ram', e.target.value)}
                        required
                      />

                      <label htmlFor={`storage-${index}`}>Storage (GB)</label>
                      <input
                        type="number"
                        id={`storage-${index}`}
                        name={`storage-${index}`}
                        value={variant.storage}
                        onChange={(e) => handleVariantChange(index, 'storage', e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <label htmlFor={`description-${index}`}>Description</label>
                  <textarea
                    id={`description-${index}`}
                    name={`description-${index}`}
                    rows="2"
                    value={variant.description}
                    onChange={(e) => handleVariantChange(index, 'description', e.target.value)}
                    required
                  />

                  <label htmlFor={`price-${index}`}>Price (₹)</label>
                  <input
                    type="number"
                    id={`price-${index}`}
                    name={`price-${index}`}
                    value={variant.price}
                    onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                    required
                  />

                  {variants.length > 1 && (
                    <button type="button" onClick={() => removeVariant(index)}>Remove Variant</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addVariant}>Add Another Variant</button>
            </div>
          ) : (
            <div>
              <label htmlFor="imageUrl">Image URL</label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <ul>
                {description.split('\n').map((line, index) => (
                  // Check if the line is not empty before rendering it as a list item
                  line.trim() !== '' && <li key={index}>{line}</li>
                ))}
              </ul>


              <label htmlFor="price">Price (₹)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
