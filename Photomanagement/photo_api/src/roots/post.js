const express = require("express");
const Post = require("../models/post")
const router = new express.Router();
const multer = require("multer");

// path is a default node module that works with file paths
const path = require("path");
const auth = require("../middleware/auth");

// set up how multer saves images to file system
const storage = multer.diskStorage({
    destination(req, file, callBack) {
        callBack(null, path.join(__dirname, "../images"));
    },
    filename(req, file, callBack) { // saving to file system before saving the post to database
        const uniqueName = Date.now() + file.originalname;
        // access to new name inside root
        req.uniqueName = uniqueName;
        callBack(null, uniqueName);
    }
});

// uploader is a function that will upload images
// create uploader for postman
const Uploader = multer({storage})

// will have image labeled as newImage inside post request body
// make sure user is authorized in the backend before posting images
router.post('/post', auth, Uploader.single("newImage"), async function (req, res) {
    console.log(req.uniqueName);
    const imageUrl = req.uniqueName;
    const {postTitle, postDescription} = req.body;
    console.log(postTitle);
    console.log(postDescription);
    const post = new Post({imageUrl, postTitle, postDescription})
    await post.save(); // save post
    res.send();
});

// tells the server where to serve images from
// get into image folder and look for path for images we set up
router.use("/images", express.static(path.join(__dirname, "../images")));

// get the posts from backend
router.get("/post", async function (req, res) { // if query exists, find the post
    console.log(req.query);
    if (req.query.title) {
        const searchRegex = new RegExp(req.query.title, "i");
        const posts = await Post.find({postTitle: searchRegex});
        res.send(posts);

    } else { // if query doesn't exist, return all posts
        const posts = await Post.find({});
        res.send(posts);
    }
});

// make route to get a single post by id from backend
router.get("/post/:id", async function (req, res) {
    const id = req.params.id; // anything with a colon in front gets saved as params
    const post = await Post.findById(id);
    res.send(post);
})

module.exports = router;
