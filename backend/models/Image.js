const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    filename: String,
    contentType: String,
    imageUrl: String, // If using cloud storage like AWS S3, Firebase
    createdAt: { type: Date, default: Date.now }
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
