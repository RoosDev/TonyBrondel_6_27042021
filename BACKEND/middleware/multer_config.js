const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    const justName = name.split("." + extension).join("__");
    callback(null, justName + Date.now() + "." + extension);
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) return cb(null, true);
    else
      cb("Error: Images Only!") &&
        console.log(
          "Un format de fichier non authorisé a tenté d'être envoyé. Loupé !! :)"
        );
  },
});

module.exports = multer({ storage }).single("image");
