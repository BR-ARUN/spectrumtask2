var mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var con=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER ,
    password: process.env.DATABASE_PASSWORD,
    
  database: process.env.DATABASE
});



exports.register= (req,res)=>{
    console.log(req.body);


 //const { name, email, phno, branch, year, domain, password ,confirmPassword}=req.body;

 const name=req.body.fname;
 const email=req.body.email;
 const phno=req.body.number;
 const branch=req.body.branchs;
 const year=req.body.years;
 const domain=req.body.domains;
 const password=req.body.password;
 const confirmPassword=req.body.cpassword;


   con.query("SELECT email FROM customers WHERE email=?",[email],(error,results)=>{
       if(error){
           console.log(error);

       }
       if(results.length > 0){
           return res.render('register',{
               message:'That email is already in use'
           })
       }
       else if(password !== confirmPassword){
        return res.render('register',{
            message:'Passwords do not match'
        });

       }
      
    //  let hashedPassword = await bcrypt.hash(password, 8);
    
    //  console.log(hashedPassword);
    con.query('INSERT INTO customers SET ?', {name: name, email: email, mbno: phno, branch:branch, year:year, domain:domain, passw:password },(error,results)=>{
if(error){
    console.log(error);
    }
    else{
        console.log(results);
        return res.render('register',{
            message:'User registered'
        });
    }
    })

   });


    
   
}