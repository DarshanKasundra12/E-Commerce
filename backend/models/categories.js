const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

const Category = mongoose.model('Category', CategorySchema); // Corrected model name

module.exports = Category;
