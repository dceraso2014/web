const Post = require('../models/post');

module.exports = (app, passport) => {

	
	// index routes
	app.get('/', (req, res, next) => {
 
		Post
		  .find({}) 
		  .sort({"date" : -1}) 
		  .limit(3) 
		  .exec((err, posts) => {
			  //console.log(posts);
			  if (err) return next(err);
			  res.render('index', {
				posts
			});
		  });
		
	  });

	//login view
	app.get('/login', (req, res) => {
		res.render('login/login', {
			layout: 'login',
			message: req.flash('loginMessage')
		});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/listpost/1',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// signup view
	app.get('/signup', (req, res) => {
		res.render('signup', {
			message: req.flash('signupMessage')
		});
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true // allow flash messages
	}));

	//profile view
	app.get('/profile', isLoggedIn, (req, res) => {
		res.render('profile', {
			user: req.user
		});
	});

	// logout
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}
