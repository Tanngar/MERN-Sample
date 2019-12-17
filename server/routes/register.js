const router = require('express').Router();
const bcrypt = require('bcryptjs');
let User = require('../models/user.model');

router.route('/').post((req, res) => {
    const newUser = new User();

    newUser.username = req.body.username;
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.password = req.body.password;

    User.findOne({username: newUser.username})
        .then(user => {
            if (newUser.password !== req.body.repeatPassword) {
                res.send({msg: "Passwords don't match."})
                return
            }

            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err)
                    }
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                })
            } else {
                res.json({msg: "Username already taken."})
            }
        })
        .catch(err => {
            console.log(err)
        })
});

module.exports = router;