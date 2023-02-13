const jwt = require("jsonwebtoken");
const User = require("../models/user");

// authenticate request from client
const auth = async (req, res, next) => {
    try {
        console.log(req.header("Authorization"));
        const token = req.header("Authorization").replace("Bearer ", "");

        console.log(token);
        // takes in token and secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // tries to find user
        const user = await User.findOne({_id: decoded._id, "tokens.token": token});

        if (! user) {
            throw new Error();
        }

        // if user is found
        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        res.status(401).send({error: "please authenticate"});
        console.log(e);
    }
};

module.exports = auth;
