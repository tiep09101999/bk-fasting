const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
  title: String,
  Content: String,
});

module.exports = mongoose.model("article", ArticleSchema);
