const Post = require('../models/post');
module.exports = (app) => {

	// blog routes
  app.get('/blog', (req, res, next) => {
    let perPage = 10;
    let page = req.params.page || 1;
    Post
      .find({},{titulo: 1})
      .sort({date: -1})
      .limit(5)
      .exec((err, recents_posts) => {
        if (err) return next(err);
      

    Post
      .find({}) // finding all documents
      .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
      .limit(perPage) // output just 9 items
      .exec((err, posts) => {
        //console.log(posts);
        Post.count((err, count) => { // count to calculate the number of pages
          if (err) return next(err);
          res.render('blog/blog', {
            posts,
            current: page,
            pages: Math.ceil(count / perPage),
            recents_posts
          });
        });
      
      });
    });
  });
    
    app.get('/blog/:page', (req, res, next) => {
      let perPage = 10;
      let page = req.params.page || 1;
      Post
      .find({},{titulo: 1})
      .sort({date: -1})
      .limit(5)
      .exec((err, recents_posts) => {
        if (err) return next(err);

      Post
        .find({}) // finding all documents
        .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
        .limit(perPage) // output just 9 items
        .exec((err, posts) => {
          //console.log(posts);
          Post.count((err, count) => { // count to calculate the number of pages
            if (err) return next(err);
            res.render('blog/blog', {
              posts,
              current: page,
              pages: Math.ceil(count / perPage),
              recents_posts
            });
          });
        });
        });
    });
		

		app.get('/blog/post/:id', (req, res, next) => {
      //console.log(req.params.id);
      Post
      .find({},{titulo: 1})
      .sort({date: -1})
      .limit(5)
      .exec((err, recents_posts) => {

        console.log(recents_posts);
        if (err) return next(err);

      Post
        .findOne({"_id" : req.params.id}) // finding all documents
        .exec((err, post) => {
          //console.log(post);
          // count to calculate the number of pages
            if (err) return next(err);
            
           
            res.render('blog/blogview', {
             
               post,
              recents_posts
            });
          });
        });
      });



};