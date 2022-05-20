const mongoose = require("mongoose");

// create mongoose schema object
const Schema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    default: `hello world`,
  },
  color: {
    type: String,
    required: true,
    default: '{"r": 254, "g": 240, "b": 138, "a": 0.8}',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

// The collection name for this DB is defined in the export
module.exports = mongoose.models.Note || mongoose.model("Note", Schema);
