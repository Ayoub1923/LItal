const express = require('express')
const getproduct =require('../controllers/product')
const router =express.Router()
router.get('/product',getproduct.get)
router.delete('/deleteProduct',getproduct.delete)
router.post('/putProduct',getproduct.postProduct)


module.exports=router;