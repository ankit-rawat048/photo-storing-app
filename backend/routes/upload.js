const express = require("express");
const multer = require("multer");
const Image = require("../models/Image");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Upload Image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const image = new Image({
      imageUrl: req.file.buffer.toString("base64"),
    });

    await image.save();
    res.status(201).json({ message: "Image uploaded successfully", image });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch Images
router.get("/", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
