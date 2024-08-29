const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Product = require('../models/product');

const router = express.Router();

app.post('/api/products', async (req, res) => {
  const { name, price, description, imageUrl, category, variants } = req.body;
  console.log('Request body:', req.body); // Log the request body for debugging

  try {
    const productId = uuidv4();
    const productData = {
      productId,
      name,
      description,
      category,
      variants: []
    };

    // Check if variants are provided and handle them accordingly based on the category
    if (variants && variants.length > 0) {
      if (category === 'Mobile' || category === 'Laptop' || category === 'T.V' || category === 'Books') {
        productData.variants = variants.map(variant => ({
          type: variant.type,
          description: variant.description,
          price: variant.price,
          variantImageUrl: variant.variantImageUrl,
          ram: variant.ram,
          storage: variant.storage,
          color: variant.color
        }));
      }
    } else {
      // Handle non-variant products
      productData.imageUrl = imageUrl;
      productData.price = price;
    }

    // Create a new Product instance with the product data
    const product = new Product(productData);

    // Save the product to the database
    const savedProduct = await product.save();

    // Send the saved product in the response
    res.status(201).json({ product: savedProduct });
  } catch (error) {
    // Handle errors
    console.error('Error saving product:', error);
    res.status(400).json({ message: 'Failed to save product', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send(error);
  }
});

router.get('/count', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get product count' });
  }
});

router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findOne({ productId: productId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

router.get('/:productId/variants/:variantId', async (req, res) => {
  const productId = req.params.productId;
  const variantId = req.params.variantId;
  try {
    const product = await Product.findOne({ productId: productId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const variant = product.variants.find(variant => variant._id.toString() === variantId);
    if (!variant) {
      return res.status(404).json({ message: 'Variant not found' });
    }
    res.json(variant);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch variant' });
  }
});


// Route handler for product search
router.get('/products/search', async (req, res) => {
  try {
    const query = req.query.q; // Get the search query from the request query parameters

    // Perform a case-insensitive search for products that match the query
    const products = await Product.find({ name: { $regex: new RegExp(query, 'i') } });

    res.json(products); // Return the matching products as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' }); // Handle server errors
  }
});

module.exports = router;


module.exports = router;
