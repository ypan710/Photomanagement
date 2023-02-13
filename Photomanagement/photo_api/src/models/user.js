// define the schema for database

// bring in validator, bcrypt, and jsonwebtoken
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// bring in mongoose
const mongoose = require("mongoose");

// initialize a new schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (! validator.isEmail(value)) {
                throw new Error("Email is invalid.");
            }
        },
        trim: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]

});

// hash the password whenever it changes
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
})

// find users by credentials
userSchema.statics.findbycredentials = async function (username, password) {
    try { // find user
        const user = await User.findOne({username: username});
        // if user cannot be found
        if (! user) {
            throw new Error("Unable to login.");
        }
        // check if hashed password matches
        const isMatch = await bcrypt.compare(password, user.password);
        // if passwords don't match
        if (! isMatch) {
            throw new Error("Unable to login.");
        }
        return user;
    } catch (e) {
        return e;
    }
}

// generate authentication token for user
userSchema.methods.generateauthtoken = async function () {
    const token = jwt.sign({
        _id: this._id.toString()
    }, process.env.JWT_SECRET);
    this.tokens = this.tokens.concat({token});
    await this.save();
    return token;
}

// return a user in a format that we would give to client
userSchema.methods.toJSON = function () { // transform mongodb document to regular object
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}


// create the actual model for user
const User = mongoose.model("User", userSchema); // make User available for export
module.exports = User;
