const express = require('express');
const app = express();

const path = require('path');

// These will handle all our routes
const admin = require('./api/routes/admin');
const agent = require('./api/routes/agent');
const authentication = require('./api/routes/authentication');
const clients = require('./api/routes/clients');
const projects = require('./api/routes/projects');
const property = require('./api/routes/property');

let cors = require('cors');
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
  })
);

// mongoose and mongo connection
const { mongoose } = require('./api/db/mongoose');
mongoose.set('useFindAndModify', false); // for some deprecation issues

// body-parser: middleware for parsing parts of the request into a usable object (onto req.body)
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // parsing JSON body
app.use(bodyParser.urlencoded({ extended: true })); // parsing URL-encoded form data (from form POST requests)

// express-session for managing user sessions
const session = require('express-session');
const MongoStore = require('connect-mongo'); // to store session information on the database in production

// Initialize a session and cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'our hardcoded secret', // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60000*4,
      httpOnly: true,
    },
    // store the sessions on the database in production
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/AgentAPI',
    }),
  })
);

// Middleware for handling all the various routes
app.use('/api/admin', admin);
app.use('/api/agent', agent);
app.use('/api/authentication', authentication);
app.use('/api/clients', clients);
app.use('/api/projects', projects);
app.use('/api/property', property);

app.use(express.static(path.join(__dirname, "/../frontend/build")));

// All routes other than above will go to index.html
app.get('*', (req, res) => {
  // res.status(404).send('404 Not Found');
  // TODO: We can add a cool 404 page here later
  // send index.html
  res.sendFile(path.join(__dirname, "/../frontend/build/index.html"));
});

module.exports = app;
