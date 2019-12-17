const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    authorId: {
        type: String
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    heading: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    body: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true
    },
    productId: {
        type: String,
        required: true
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;