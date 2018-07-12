const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    date: Date,
    titulo: String,
    desc: String,
    img1: String,
});



// create the model for post and expose it to our app
module.exports = mongoose.model('Post', postSchema);
