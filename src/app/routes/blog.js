const Post = require('../models/post');
module.exports = (app) => {

	// blog routes
	app.get('/blog', (req, res) => {
		res.render('blog', {layout: 'layout'});  
		});
		
/*
		app.get('/blog/post/:id', (req, res, next) => {
			console.log(req.params.id);
      Post
        .find({"_id" : req.params.id}) // finding all documents
        .exec((err, post) => {
          console.log(post);
          // count to calculate the number of pages
            if (err) return next(err);
            res.render('blogview', {
              layout: 'layout',
              post
              
            });
         
        });
    });
*/

app.get('/blog/post/:id', (req, res, next) => {
  res.render('blogview', {layout: 'layout'});  
  });
   

};