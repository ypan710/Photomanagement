const express = require("express");
const User = require("../models/user")
const router = new express.Router();
const auth = require("../middleware/auth");


router.post('/login', async function (req, res) {
    try {
        const user = await User.findbycredentials(req.body.username, req.body.password);
        const token = await user.generateauthtoken();
        res.send({user, token});
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.post('/signup', async function (req, res) {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateauthtoken();
        res.status(201).send({user, token});
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.post('/logout', auth, async function (req, res) {
    try {
        console.log(req);
        req.user.tokens = []; // clear tokens
        await req.user.save(); // save user to database
        res.send("Logged out!");
        console.log("Logged out!");
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});
module.exports = router;
