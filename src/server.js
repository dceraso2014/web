const express = require('express');
const app = express();

const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const ejs = require('ejs');


const { url } = require('./config/database.js');

mongoose.connect(url, {
	useMongoClient: true
});

require('./config/passport')(passport);

// settings
app.set('port', process.env.PORT || 3000);
/*
app.set('views', [
	__dirname + '/views',
	__dirname + '/views/blog',
	__dirname + '/views/admin',
	__dirname + '/views/login'
]); 


app.set('view engine', 'ejs');
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
// required for passport
app.use(session({
	secret: 'faztwebtutorialexample',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes
require('./app/routes/login')(app, passport); // Rutas de login, logout
require('./app/routes/admin')(app, passport); // Rutas de gestion de admin
require('./app/routes/blog')(app); // Rutas de blog publico
require('./app/routes/contacto')(app); // Ruta de contacto publico


// static files
app.use(express.static(path.join(__dirname, 'public')));

// start the server
app.listen(app.get('port'), () => {
	console.log('server on port ', app.get('port'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
	console.log(err);
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
  
	// render the error page
	res.status(err.status || 500);
	res.render('error');
  });
  
  module.exports = app;