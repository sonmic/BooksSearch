const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String },
  subtitle: { type: String },
  authors: { type: Array },
  description: { type: String },
  image: { type: String },
  link: { type: String, required: true }
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
