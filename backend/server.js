const express = require('express');
const app = express();

// These will handle all our routes
const admin = require("./routes/admin");
const agent = require("./routes/agent");
const authentication = require("./route/authentication");
const clients = require("./routes/clients");
const projects = require("./routes/projects");
const property = require("./routes/property");


let cors = require('cors');
app.use(cors());

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// body-parser: middleware for parsing parts of the request into a usable object (onto req.body)
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // parsing JSON body
app.use(bodyParser.urlencoded({ extended: true })); // parsing URL-encoded form data (from form POST requests)

// express-session for managing user sessions
const session = require("express-session");
const MongoStore = require('connect-mongo') // to store session information on the database in production

// Initialize a session and cookie
app.use(
    session({
        secret: process.env.SESSION_SECRET || "our hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        },
        // store the sessions on the database in production
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/AgentAPI'})
    })
);

// Middleware for handling all the various routes
app.use('/api/admin', admin);
app.use('/api/agent', agent);
app.use('/api/authentication', authentication);
app.use('/api/clients', clients);
app.use('/api/projects', projects);
app.use('/api/property', property);

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.status(404).send("404 Not Found");
    // TODO: We can add a cool 404 page here later
});

module.exports = app;