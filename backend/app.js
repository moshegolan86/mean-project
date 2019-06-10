const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const scholarshipRoutes = require('./routes/scholarships');
const tutorRoutes = require('./routes/tutors');
const eventRoutes = require('./routes/events');

const app = express();

mongoose
  .connect(
    'mongodb+srv://moshego:m8525123g@cluster0-grkk1.mongodb.net/My-Project'
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization, Content-Length"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use("/api/posts",postsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/tutors", tutorRoutes);
app.use("/api/events", eventRoutes);

module.exports = app;
