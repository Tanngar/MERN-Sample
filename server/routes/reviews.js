const router = require('express').Router();
let Review = require('../models/review.model');
let Product = require('../models/product.model');


router.route('/').get((req, res) => {
    Review.find()
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Review.findById(req.params.id)
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/my-reviews/:id').get((req, res) => {
    Review.find({authorId: req.params.id})
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id/add-review').post((req, res) => {
    const newReview = new Review();

    newReview.heading = req.body.heading;
    newReview.body = req.body.body;
    newReview.author = req.body.author;
    newReview.authorId = req.body.authorId;
    newReview.productId = req.body.id;

    newReview
        .save()
});

router.route('/edit-review/:id').get((req, res) => {
    Review.findById(req.params.reviewId)
        .then(review => res.json(review))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/edit-review/:id').put((req, res) => {
    Review.findOneAndUpdate({_id: req.params.reviewId}, {
        '$set': {
            heading: req.body.heading,
            body: req.body.body
        }
    })
        .then(review => res.json(review))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('edit-review/:id').post((req, res) => {
    Review.findById(req.params.id, (err, review) => {
        review.heading = req.params.heading;
        review.body = req.params.body;
        review.save();
    })
});

router.route('/delete-review/:id').delete((req, res) => {
    Review.findOneAndDelete({_id: req.params.id})
        .then(review => res.json(review))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;