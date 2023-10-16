const express = require('express')
const router = express.Router()
const Product = require('../model/product')


router.get('', function(req, res) {
    Product.find({})
        .then(foundProducts => {
            return res.json(foundProducts)
        })
})

router.get('/:productId', function(req, res) {
    const productId = req.params.productId
    Product.findById(productId)
        .then(foundProduct => {
            return res.json(foundProduct)
        })
        .catch(err => {
            return res.status(422).send({errors: [{title: 'Product error', detail: 'Product not found'}]})
        })
})

module.exports = router