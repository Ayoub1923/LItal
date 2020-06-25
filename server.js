var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer')
var nodemailer = require('nodemailer');
var cors = require('cors');
let transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,    //<<here
  auth: {
      user: 'oussamahassanisimplon@gmail.com',
      pass:'ou_2s_ma200'
  }
});
/*let transport = {
  //host: 'smtp.gmail.com',
  service: 'Gmail',
  secure: false,
  auth: {
    user: "oussamahassanisimplon@gmail.com",
    pass: "ou_2s_ma200",
    port:465
  }
}*/
app.use(cors())
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended:false }))


let x = Date.now()
let code = x.toString().substring(0,6)

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/imageuplod')
    },
    filename: function (req, file, cb) {
      cb(null, code + '-' +file.originalname )
    }
  })
  
  var upload = multer({ storage: storage }).array('file')
  
app.get('/',function(req,res){
    return res.send('Hello Server')
})
app.post('/upload',function(req, res) {
    
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

app.post('/send', (req, res, next) => {

  let names =  req.body.name
  let email =  req.body.email
  let message = req.body.messsage
  let content = `name: ${names} \n email: ${email} \n donner: ${message} `
  console.log(req, req.body.messsage)
  let mail = {
    from: names,
    to: email,  
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
}) 

app.listen(8000, function() {
    console.log('App running on port 8000');
});