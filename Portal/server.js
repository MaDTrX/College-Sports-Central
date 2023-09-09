const express = require('express');
const path = require('path');
const cors = require("cors");
const favicon = require('serve-favicon');
const logger = require('morgan');
const passport = require("passport");
const cookieSession = require("express-session");
const authRoute = require("./routes/api/auth");

require('dotenv').config();
require('./config/database');
require('./config/passport.js')


const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(
  cookieSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    name: "session",
    keys: ["lama"],
    maxAge: 24 * 60 * 60 * 100
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

// Check if token and create req.user
app.use(require('./config/checkToken'));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));


// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 8000;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`)
});