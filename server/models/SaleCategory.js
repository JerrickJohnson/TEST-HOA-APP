const mongoose = require('mongoose');

const { Schema } = mongoose;

const SaleCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const SaleCategory = mongoose.model('SaleCategory', SaleCategorySchema);

module.exports = SaleCategory;