const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/product');
const Category = require('./models/categories');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

const mongoURI = 'mongodb+srv://kavybhavsar3011:kavy3011@cluster0.1fwqsln.mongodb.net/NOC?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('Error connecting to MongoDB Atlas', err);
});

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

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send(error);
  }
});

app.get('/api/products/count', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get product count' });
  }
});

app.get('/api/categories/count', async (req, res) => {
  try {
    const count = await Category.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get category count' });
  }
});

app.post('/api/categories', async (req, res) => {
  const category = new Category(req.body);
  try {
    const savedCategory = await category.save();
    res.status(201).send(savedCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/products/:id', async (req, res) => {
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

app.get('/api/products/:productId/variants/:variantId', async (req, res) => {
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
// Route handler for product search
app.get('/api/search', async (req, res) => {
  const searchQuery = req.query.query;
  try {
    // Perform a case-insensitive partial match on the product name
    const filteredProducts = await Product.find({
      name: { $regex: searchQuery, $options: 'i' }
    });
    res.status(200).json(filteredProducts);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ message: 'Failed to fetch search results' });
  }
});


app.use('/api', authRoutes);
app.use('/api', contactRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
