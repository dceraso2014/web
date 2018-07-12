//Incluyo el schema de post
const Post = require('../models/post');
const faker  = require('faker');
const multer  = require('multer')



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

app.get('/edit/:id', isLoggedIn, (req, res, next) => {
  //console.log(req.params.id);
  Post
    .findOne({"_id" : req.params.id}) // finding all documents
    .exec((err, post) => {
      //console.log(post);
      // count to calculate the number of pages
        if (err) return next(err);
         res.render('admin/addpost', {
          layout: 'addpost',
          post
        });
     
    });
  });

    app.get('/listpost/:page',  (req, res, next) => {
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
              pages: Math.ceil(count / perPage),
              
            });
          });
        });
    });

    app.get('/del/:id', isLoggedIn, (req, res, next) => {
     
      Post
        .deleteOne({"_id" : req.params.id}) // finding all documents
        .exec((err, posts) => {
          //console.log(posts);
          // count to calculate the number of pages
            if (err) return next(err);
              res.redirect('/listpost/1');
        });
        
    });
     
    app.get('/addpost', (req, res) => {
    res.render('admin/addpost', {
			layout: 'addpost'
		});
    });

    /*
     app.post('/savepost', upload.any(),  (req, res) => {


        console.log(upload);
        var newPost = new Post();
        //newPost.date = req.body.date;
        newPost.titulo = req.body.titulo;
        newPost.desc = req.body.desc;
        newPost.img1 = req.body.img1;
        

        newPost.save( async (err) => {
            if (err) { throw err;
             } else {
             await res.redirect('/listpost/1');
             }
        });
      
    
       
    });
    
};
*/

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file);
      cb(null, Date.now() + '-' + file.originalname)
  }
});

var upload = multer({ storage: storage }).single('img1');


app.post('/savepost', function (req, res) {
  console.log(req);
  upload(req, res, function (err) {
      if (err) {
          // An error occurred when uploading
      }
      res.json({
          success: true,
          message: 'Image uploaded!'
      });

      // Everything went fine
  })
});


 



};

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}