const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  type: { type: String },
  price: { type: Number, required: true },
  variantImageUrl: { type: String, required: true },
  ram: { type: Number },
  storage: { type: Number },
  color: { type: String }, // Add the color field
  description: { type: String, required: true } // Add the description field
});

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String }, // This field is optional now
  imageUrl: { type: String },
  category: { type: String, required: true },
  price: { type: Number },
  variants: [variantSchema]
});

module.exports = mongoose.model('Product', productSchema);
