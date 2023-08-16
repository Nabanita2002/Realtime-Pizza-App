const express= require('express');
const ejs=require('ejs')
const  expresslayout=require('express-ejs-layouts')

const path=require('path')

const app= express();

const PORT= process.env.PORT|| 4000




app.get('/',(req,res)=>{
    res.render('home')
})

//set template engine

app.use(expresslayout)

app.set('views',path.join(__dirname,'/resources/views'))

app.set('view engine','ejs')

app.listen(PORT,()=>{
    console.log(`listening on port  ${PORT} `); 
})

