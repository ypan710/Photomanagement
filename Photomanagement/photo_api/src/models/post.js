// define the schema for database

// bring in mongoose
const mongoose = require("mongoose");

// initialize a new schema
const postSchema = new mongoose.Schema({
    postTitle: {
        type: String,
        required: true
    },
    postDescription: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    }

});

// create the actual model for user
const Post = mongoose.model("Post", postSchema); // make Post available for export
module.exports = Post;
