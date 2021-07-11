
var mysql = require('mysql2');
const express=require("express");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require('body-parser');


dotenv.config({path:'./.env'});



const app=express();

var con=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER ,
    password: process.env.DATABASE_PASSWORD,
    
  database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.set('view engine','hbs');



con.connect(function(err){
    if(err) throw err;
    console.log("Connected!");
});

//define routes 
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

app.listen(5000,()=>{
    console.log("Server started on Port 5000");  
})


//login part
app.post("/dash",function(req,res){
    var email = req.body.email;
    var password = req.body.password;

    con.query("select * from customers where email = ? and passw = ?",[email,password],function(error,results,fields){
        if (results.length > 0) {
          
            res.redirect("/dashboard");
        } else {
            res.redirect("/");
        }
        res.end();
    })
})


//when login is success
app.get("/dashboard",function(req,res){
    // res.sendFile(__dirname + "/dashboard");
    res.render("dashboard");
    
})
