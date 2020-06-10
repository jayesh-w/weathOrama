// All Requirements
const app = require('express')();
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrfProtection = require('csurf')();

// All Requirements
const mainRoutes = require('./Routes/mainRoutes');

// SET THE DEFAULT VIEW ENGINE ==> EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

/// SET bodyParser urlencoded to false
app.use(bodyParser.urlencoded({ extended: false }));

// SET THE SESSION STORE 
const store = new MongoDBStore({
    uri: process.env.MONGO_URL,
    collection: 'sessions'
});

/// Make public folder static
app.use(express.static(path.join(__dirname, 'Public')));

// set the session 
sessionOptions = {
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
}
app.use(session(sessionOptions));
/// CSRF TOKEN SET
app.use(csrfProtection);
//// local usage variables in ejs
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

/// SET THE GENERAL ROUTES

app.use(mainRoutes);


/// connect Mongodb
mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(process.env.MONGO_URL, mongooseOptions)
.then(result => {
    // console.log(result);
    app.listen(process.env.PORT || 3001);
    console.log("Server Started at port 3000");
})
.catch(err => {
    console.log(err);
});












