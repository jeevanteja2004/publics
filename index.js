const express=require("express");
const app=express();
const request=require('request');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
var serviceAccount = require("./key.json");
initializeApp({
  credential: cert(serviceAccount)
});
const db=getFirestore();
app.get("/signup",function(req,res){
    res.sendFile(__dirname+"/public/"+"signup.html");
});
app.get("/signupSubmit",function(req,res){
    console.log(req.query);
    const Names=req.query.name;
    const Mail=req.query.email;
    const Phones=req.query.phone;
    const Password=req.query.password;
    db.collection('personal info').add({
        Name:Names,
        Email:Mail,
        Phone:Phones,
        password:Password,
    }).then(()=>{
    res.send("signup successfully click here to <a href='/login'>log in</a>.");
    })
});
    app.get("/login",function(req,res){
        res.sendFile(__dirname+"/public/"+"login.html");   
    })
    app.get("/log",function(req,res){
    db.collection('personal info')
    .where('Email','==',req.query.email)
    .where('password','==',req.query.password)
    .get()
        .then((docs)=>{
            console.log(docs);
            console.log(docs.size);
            if(docs.size>0){
              res.sendFile(__dirname+"/public/"+"jee.html");
           }else{
              res.send("Fail");
            }  
    })
}) 
app.listen(2100)
