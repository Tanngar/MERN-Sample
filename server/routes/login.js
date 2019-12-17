const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');

router.route('/').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    // Find user by username compare passwords if error send message
    if(username && password) {
        User.findOne( { username: username }, function(err, user){
            if(!user){
                return res.json({msg: "Wrong username or password."});
            }

            bcrypt.compare(password, user.password, (err, result) =>{
                if(err) { console.log(err)}

                if (result) {

                    res.json({
                        msg: 'User authenticated successfully',
                        authorized: true,
                        user: {
                            username: user.username,
                            userId: user._id
                        }
                    });
                } else {
                    res.json({msg: "Wrong username or password."});
                }
            })

        });
    }
});

module.exports = router;