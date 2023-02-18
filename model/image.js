const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  ipAddress: [
    {
      type: String,
    },
  ],
  imageurl: {
    type: String,
  },
  imageContent: {
    type: String,
  },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
