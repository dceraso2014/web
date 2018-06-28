//Incluyo el schema de post
const Post = require('../models/post');
const faker  = require('faker');

module.exports = (app, passport) => {
  
  app.get('/generate-fake-data', (req, res, next) => {
		for(let i = 0; i < 90; i++) {
      var newPost = new Post();
      newPost.date = faker.date.recent();
			newPost.titulo = faker.lorem.sentence();
			newPost.desc = faker.lorem.paragraphs();
			newPost.img1 = faker.image.business();
      newPost.img2 = faker.image.business();
      newPost.img3 = faker.image.business();
			newPost.save( async (err) => {
        if (err) { throw next(err); 
        } else {
          await res.redirect('/');
        }
        
			});
		}
		
	});
  

  
  /*
    app.get('/listpost', isLoggedIn, async (req, res) => {
      const posts = await Post.find();
      console.log(posts);
      res.render('listpost', {
      layout: 'listpost',
      posts
		});
    });
*/
    app.get('/listpost/:page', isLoggedIn, (req, res, next) => {
      let perPage = 9;
      let page = req.params.page || 1;
    
      Post
        .find({}) // finding all documents
        .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
        .limit(perPage) // output just 9 items
        .exec((err, posts) => {
          //console.log(posts);
          Post.count((err, count) => { // count to calculate the number of pages
            if (err) return next(err);
            res.render('admin/listpost', {
              layout: 'listpost',
              posts,
              current: page,
              pages: Math.ceil(count / perPage)
            });
          });
        });
    });
     
    app.get('/addpost', isLoggedIn, (req, res) => {
    res.render('admin/addpost', {
			layout: 'addpost'
		});
    });

     app.post('/savepost', isLoggedIn, (req, res) => {
        console.log(req.body);
        var newPost = new Post();
        //newPost.date = req.body.date;
        newPost.titulo = req.body.titulo;
        newPost.desc = req.body.desc;
        newPost.img1 = req.body.img1;
        newPost.img2 = req.body.img2;
        newPost.img3 = req.body.img3;

        newPost.save( async (err) => {
            if (err) { throw err;
             } else {
             await res.redirect('/listpost/1');
             }
        });
      
    
       
    });
    
};

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}