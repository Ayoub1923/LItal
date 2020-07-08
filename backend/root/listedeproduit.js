const express = require('express')
const {getProduct , PostsProduct,PutProduct,DelateProduct} =require('../controler/Product')
const router=express.Router()
router.get('/Allproduct',getProduct)
router.post('/ListeProduit',PostsProduct)
router.patch('/ListeProduit/:id',PutProduct)
router.delete('/ListeProduit/:id',DelateProduct)

module.exports=router;
