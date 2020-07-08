var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer')
var mangoos = require('./backend/config/configdb')
var nodemailer = require('nodemailer');
var cors = require('cors');
const morgan=require("morgan")
const User = require('./backend/model/user')
/* root */
const users = require("./backend/root/userroot")
const historique = require("./backend/root/historique")
const ListeProduit=require("./backend/root/listedeproduit");

let transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,    //<<here
  auth: {
      user: 'oussamahassanisimplon@gmail.com',
      pass:'ou_2s_ma200'
  }
});

//app.use(morgan("dev"))
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended:false }))
//app.use(express.urlencoded({ extended: false }))
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

let x = Date.now()
let code = x.toString().substring(0,4)
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/imageuplod')
    },
    filename: function (req, file, cb) {
      cb(null, code + '-' +file.originalname )
    }
  })
  
  var upload = multer({ storage: storage }).array('file')
  
app.get('/',function(req,res, next){
    return res.send('Hello Server')
   
})
app.post('/upload',function(req, res , next) {
    
    upload(req, res, function (err) {
     
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err + "muttelerror")
          // A Multer error occurred when uploading.
        } else if (err) {
            return res.status(500).json(err +"uncow error")
          // An unknown error occurred when uploading.
        } 
        
        return res.status(200).send(req.file)
        // Everything went fine.
      })
  
});
//let transporter = nodemailer.createTransport(transport)

transport.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

app.post('/send',async (req, res, next) => {
try{
  let email = req.body.email
  console.log(email)
    const user = await User.findOne({ email: email }).lean()
   if (user)
   {
     let message=user.email + " " + users.password
  let content = `name: ${user.first_name} \n email: ${user.email} \n donner: ${message} `

  let mail = {
    from: "oussamahassanisimplon@gmail.com",
    to: user.email,  
    subject: 'Rest password',
    text: content
  }

  transport.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
}
}
catch(error)
{
console.log(error)
}
//next()
}) 

app.get('/allpost',function(req , res) {

  res.json({
  posts:[
  {title:'first post'},
  {title:'first post'}
  ]
  })}
)
app.use("/app",ListeProduit);
app.use("/app",users);
app.use("/app",historique );
app.listen(8000, function() {
    console.log('App running on port 8000');
});