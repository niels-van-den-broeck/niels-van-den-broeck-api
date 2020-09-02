const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  startYear: Number,
  endYear: Number,
  company: String,
  description: String,
  technologies: [String],
});

module.exports = mongoose.model('Jobs', schema);
