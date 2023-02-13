// bring the mongoose package in from node module
const mongoose = require("mongoose")

// load the connection url from the environment variable
mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
});
