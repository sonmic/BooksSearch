const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  authors: { type: Array, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true }
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
