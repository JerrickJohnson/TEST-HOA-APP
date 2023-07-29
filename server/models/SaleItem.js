const mongoose = require('mongoose');

const { Schema } = mongoose;

const SaleItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  salecategory: {
    type: Schema.Types.ObjectId,
    ref: 'SaleCategory',
    required: true
  }
});

const SaleItem = mongoose.model('SaleItem', SaleItemSchema);

module.exports = SaleItem;