const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },

    category: {
        type: String,
        required: true},

    reviewsCount: {
        type: String,
        required: true}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;