const express = require("express");
const multer = require("multer");
const auth = require("../middleware/authMiddleware");
const Image = require("../models/Image");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Upload Image (Authenticated User)
router.post("/", auth, upload.single("image"), async (req, res) => {
    try {
        const image = new Image({
            userId: req.user.id,
            imageUrl: req.file.buffer.toString("base64"),
        });

        await image.save();
        res.status(201).json({ message: "Image uploaded successfully", image });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch User-Specific Images
router.get("/", auth, async (req, res) => {
    try {
        const images = await Image.find({ userId: req.user.id });
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Image
router.delete("/:id", auth, async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: "Image not found!" });
        }

        if (image.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to delete this image!" });
        }

        await Image.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Image deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete image!" });
    }
});

module.exports = router;
