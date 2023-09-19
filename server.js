require('dotenv').config()
const express = require('express');
const ejs = require('ejs')
const expresslayout = require('express-ejs-layouts')
const mongoose = require('mongoose');




const session = require('express-session');

const flash = require('express-flash')

const MongoStore = require('connect-mongo')

const passport=require('passport')





const path = require('path')

const app = express();

const PORT = process.env.PORT || 7000
const connection = mongoose.connection;


const mongoClientPromise = new Promise((resolve) => {
    mongoose.connection.on("connected", () => {
        const client = mongoose.connection.getClient();
        resolve(client);
    });
});


//session config
MONGO_URI='mongodb://127.0.0.1:27017/Pizza'
app.use(session({
    secret: '$secret!',
    resave: false,
    store: MongoStore.create({
        clientPromise:mongoClientPromise,
        dbName: 'Pizza'
      }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //24 hours

}))



//passport config

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

const passportInit= require('./app/config/passport')

passportInit(passport)

app.use(passport.initialize())

app.use(passport.session())
//session store

// let mongoStore = new MongoStore({ 
//     mongooseConnection: connection,
//     collection: 'sessions'
// })












app.use(flash()); 
 



// assets 

app.use(express.static('public'))

app.use(express.urlencoded({extended:false}))

app.use(express.json())

//global middleware

app.use((req,res, next)=>{
    res.locals.session= req.session
    res.locals.user = req.user
    next()
})




//set template engine

app.use(expresslayout)

app.set('views', path.join(__dirname, '/resources/views'))

app.set('view engine', 'ejs')


require('./routes/web')(app)

const { stripVTControlCharacters } = require('util');
const { Session } = require('inspector');
const { log } = require('console');




// connect to database 

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Pizza').then(() => console.log("connected")).catch((err) => {
        console.log(`unable to connect with the server ${err}`);
    })
}



app.listen(PORT, () => {
    console.log(`listening on port  ${PORT} `);
})