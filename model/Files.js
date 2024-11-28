const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: String,
  mime: String,
  filename: String,
  fileId: String,
  url: String,
  user: mongoose.Schema.Types.ObjectId,
  size: Number,
});

const Files = mongoose.model('Files', fileSchema);
module.exports = Files;
