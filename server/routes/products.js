let Review = require('../models/review.model');
const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/').get((req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/reviews/:id').get((req, res) => {
    Review.find({productId: req.params.id})
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/add-review').post((req, res) => {
    const newReview = new Review();

    newReview.heading = req.body.heading;
    newReview.body = req.body.body;
    newReview.author = req.body.author;
    newReview.authorId = req.body.authorId;
    newReview.dateCreated = req.body.dateCreated;
    newReview.productId = req.params.id;

    newReview
        .save()
        .then(user => res.json(user))
});

router.route('/:productId/edit-review/:reviewId').get((req, res) => {
    Review.findById(req.params.reviewId)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:productId/edit-review/:reviewId').put((req, res) => {
    Review.findOneAndUpdate({_id: req.params.reviewId}, {
        '$set': {
            heading: req.body.heading,
            body: req.body.body
        }
    })
        .then(review => res.json(review))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:productId/delete-review/:reviewId').delete((req, res) => {
    Review.findOneAndDelete({_id: req.params.reviewId})
        .then(review => res.json(review))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;