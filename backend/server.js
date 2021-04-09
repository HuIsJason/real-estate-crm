"use strict";

const express = require('express');
const app = express();

const path = require('path');

// These will handle all our different API routes
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
mongoose.set('useFindAndModify', false);

// body-parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // parsing JSON body
app.use(bodyParser.urlencoded({ extended: true })); // parsing URL-encoded form data (from POST requests)

// express-session for managing user sessions
const session = require('express-session');
const MongoStore = require('connect-mongo'); // to store session information on the database in production

// Initialize a session and cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'our hardcoded secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60000 * 4,
      httpOnly: true,
    },
    // store the sessions on the database in production
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/AgentAPI',
    }),
  })
);

// Middleware for handling all the various API routes
app.use('/api/admin', admin);
app.use('/api/agent', agent);
app.use('/api/authentication', authentication);
app.use('/api/clients', clients);
app.use('/api/projects', projects);
app.use('/api/property', property);

// Serve the frontend build
app.use(express.static(path.join(__dirname, "/../frontend/build")));

// All routes other than above will go to index.html
app.get('*', (req, res) => {
  // Page routes that we expect in the frontend
  const goodPageRoutes = ["/", "/login", "/admin", "/admin/accounts", 
    "/admin/auth-requests", "/client-list", "/agent-details"];
  if (!goodPageRoutes.includes(req.url)) {
      // if url not in expected page routes, set status to 404.
      res.status(404).send("<h1> Sorry, it looks like you reached an non-existent page </h1>");
  }
  // otherwise, send index.html
  res.sendFile(path.join(__dirname, "/../frontend/build/index.html"));
});

module.exports = app;
