const express = require('express')
const router = express.Router()
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const config = require('../config')


router.post('/login', function(req, res) {
    const { email, password} = req.body

    if(!email) {
        // invalid error
        return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill email'}]})
    }
    if(!password) {
        // invalid error
        return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill password'}]})
    }

    User.findOne({email})
        .then(foundUser => {
            if(!foundUser) {
                // invalid error
                return res.status(422).send({errors: [{title: 'User error', detail: 'User is not exist'}]})
            }
            if(!foundUser.hasSamePassword(password)) {
                // invalid error
                return res.status(422).send({errors: [{title: 'User error', detail: 'Incorrect password'}]})
            }
            const token = jwt.sign({
                userId: foundUser.id,
                username: foundUser.username
            }, config.SECRET, { expiresIn: '1h' })

            return res.json(token)
    })
})

router.post('/register', function(req, res) {
    const { username, email, password, confirmPassword } = req.body

    /* 上と下は同じ意味
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    */

    if(!username) {
        // invalid error
        return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill username'}]})
    }
    if(!email) {
        // invalid error
        return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill email'}]})
    }
    if(!password) {
        // invalid error
        return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill password'}]})
    }
    if(password !== confirmPassword) {
        // invalid error
        return res.status(422).send({errors: [{title: 'User error', detail: 'Please check password'}]})
    }

    User.findOne({email})
        .then(foundUser => {
            if(foundUser) {
                // invalid error
                return res.status(422).send({errors: [{title: 'User error', detail: 'User already exist'}]})
            }

            const user = new User({username, email, password})
            user.save()
                .then(savedUser => {
                    return res.json({"registered": true})
                })
                .catch(err => {
                    // error message
                    return res.status(422).send({errors: [{title: 'User error', detail: 'Something went wrong'}]})
                })
    })

    // Product.findById(productId)
    //     .then(foundProduct => {
    //         return res.json(foundProduct)
    //     })
    //     .catch(err => {
    //         return res.status(422).send({errors: [{title: 'Product error', detail: 'Product not found'}]})
    //     })

})

module.exports = router