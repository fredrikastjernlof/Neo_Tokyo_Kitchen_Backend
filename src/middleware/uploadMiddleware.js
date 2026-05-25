// Import multer
const multer = require("multer");

// Import path
const path = require("path");

// Configure storage for uploaded category images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads/temp");
    },

    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);

        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

// Validate uploaded file type
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|webp/;

    const extName = allowedFileTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimeType = allowedFileTypes.test(file.mimetype);

    console.log(file.originalname);
    console.log(file.mimetype);

    if (extName && mimeType) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"));
    }
};

// Create upload middleware
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

// Export upload middleware
module.exports = upload;