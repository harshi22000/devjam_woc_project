const express  = require("express");

const path = require("path");

const app = express();

const templatePath = path.join(__dirname, "../templates");

const staticPath = path.join(__dirname,"../public");
const bodyparser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/woc', {useNewUrlParser: true});
const port = 8000;
app.use(express.urlencoded({extended:true}));
// define mongoose schema...
var contactSchema = new mongoose.Schema({
   first_name: String,
   last_name: String,
       number: String,
      mail_address: String,
      places: String,
      date_dep: String,
      date_arr: String,
});

var Contact = mongoose.model('Contact', contactSchema);
// sending mails
const nodemailer = require('nodemailer');
// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'codenation4devjam@gmail.com',
        pass: '#Readytofight4'
    }
});
//step 2
let mailOptions = {
    from: 'codenation4devjam@gmail.com',
    to: 'harshita.20204080@mnnit.ac',
    cc: 'codenation4devjam',
    subject: 'Travel & Tourism',
    text: 'Check out this attached pdf file',
    // attachments: [{
    //     filename: 'Temples_Odisha.pdf',
    //     path: 'D:\\projects\\project devjam\\odissa\\Temples_Odisha.pdf',
    //     contentType: 'application/pdf'
    // }]
};

//step 3
transporter.sendMail(mailOptions, function(err, date){
    if(err){
        console.log('Error occurs', err);
    }else {
        console.log('Email sent !!');
    }
});
// viewing pages

app.set("view engine","hbs");
app.set("views", templatePath);
 app.use("/public",express.static(staticPath));
app.get("/",(req,res) => {
    res.render("home");
});
app.get("/about",(req,res) => {
    res.render("aboutus");
});
app.get("/contact", (req,res) => {
    res.render("contactus");
});


app.post("/contact", (req,res) => {
    console.log(req.body);
    var myData = new Contact(req.body);
    myData.save().then(() =>{
        res.send("this item has been saved to databse")
    }).catch(() =>{
        res.status(400).send("item is not saved to database")
    });
    // res.status(200).render("contactus.hbs", params);
});


app.get("/gallery", (req,res) =>{ 
    res.render("gallery");
});
app.get("/reviews", (req,res) => {
    res.render("reviews");
});
app.get("/home", (req,res) => {
    res.render("home");
});
app.get("/Places", (req,res) => {
    res.render("Places");
});
app.get("*", (req,res) => {
    res.render("error");
});
app.get("/Places/contact", (req,res) => {
    res.render("contactus");
});
// listening port
app.listen(8000,() => {
    console.log("listening to port 8000");
});

