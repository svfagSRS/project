const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var welcomeRouter = require('./routes/welcome');
var carRouter = require('./routes/car')
var busRouter = require('./routes/bus')
var suvRouter = require('./routes/suv')
var galleryRouter = require('./routes/gallery')
var cartRouter = require('./routes/cart')
var paymentRouter = require('./routes/payment')
var searchRouter = require('./routes/search')
var companyRouter = require('./routes/company')
var contactRouter = require('./routes/contact')
var teamRouter = require('./routes/team')
var loginRouter = require('./routes/login')
var logoutRouter = require('./routes/logout')


const app = express();
const port = 3000;

app.listen(port, () => {
    console.log('Server is running on port ${port}');
});

//Set EJS as the view engine

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: "Your secret key"}));




//Middleware to parse JSON and urlencoded request bodies
app.use (express.json());
app.use (express.urlencoded ({ extended : true }));

app.use('/', indexRouter)
app.use('/register', registerRouter)
app.use('/welcome', welcomeRouter)
app.use('/cars', carRouter)
app.use('/suvs', suvRouter)
app.use('/buses', busRouter)
app.use('/gallery', galleryRouter)
app.use('/cart', cartRouter)
app.use('/payment', paymentRouter)
app.use('/search', searchRouter)
app.use('/company', companyRouter)
app.use('/contact', contactRouter)
app.use('/team', teamRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)



//Start The Server
module.exports = app;

