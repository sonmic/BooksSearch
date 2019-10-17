const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const Book = require("./models/Book");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks");

// Define API routes here

app.get("/api/books", (req, res) => {
  Book.find({})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

app.post("/api/books", (req, res) => {
  Book.create(req.body, function(err) {
    if (err) {
      console.log(err);
      res.status(500).json({});
    } else {
      res.json({});
    }
  });
});

app.delete("/api/books/:id", (req, res) => {
  Book.findOneAndDelete({ _id: req.params.id }, err => {
    if (err) {
      console.log(err);
      res.status(500).json({});
    } else {
      res.json({});
    }
  });
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
