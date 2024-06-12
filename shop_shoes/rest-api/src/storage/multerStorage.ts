import multer from "multer";

const storage = multer.diskStorage({
  destination: function (_req, _file, _cb) {
    _cb(null, "public/Uploads");
  },
  filename: function (_req, _file, _cb) {
    const ext = _file.mimetype.split("/")[1];
    _cb(null, `image-${Date.now() * Math.ceil(Math.random() * 1000)}.${ext}`);
  },
});

export const multerStorage = multer({ storage: storage });
