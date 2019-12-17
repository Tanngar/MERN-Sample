const router = require('express').Router();
let User = require('../models/user.model');

router.route('/login').post((req, res) => {
    User.find()
        .then(users=> res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const newUser = new User({username, email, firstName, lastName});

    newUser.save()
        .then(() => res.json('Registered successfully.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/logout').post((req, res) => {
    res.json('Logging out')
});

module.exports = router;