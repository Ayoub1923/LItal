
const Product = require("../shema/product")
const router = require("../root/product")

module.exports={

get : (req,res)=>{

    res.send("hello ")


},

delete : (req,res)=>{

    res.send("fasa55")


},

postProduct : (req,res)=>{
    const product = new Product(req.body)
    product.save ((err,result)=>{
        if (err){
            return res.status(400).json({
                error:err
            })
        }
        res.status(200).json({
            product: result
        })
    })
    // res.send('hi')
}


}






// exports.products_get_all=(req,res,)=>{
//     const product = Product.find()
//     product.save ((err,result)=>{
//         if (err){
//             return res.status(400).json({
//                 error:err
//             })
//         }
//         res.status(200).json({
//             product: result
//         })
//     })
// }



// exports.products_get_all=(req,res,)=>{
//     try{
//         const product = Product.find()
//        return res.send(product)
        
//     }
// catch{
//     res.status(500).send("error serveur")
// }
//     }
