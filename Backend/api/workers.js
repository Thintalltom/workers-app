const express = require("express");
const multer = require("multer");
const router = express.Router();
const workers = require("../workers");
const db = require("../database/database");
const path = require("path");
const cloudinary = require("../utils/cloudinary");

/// this is the storage location using the middleware multer
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

//function for upload image
const upload = multer({
  storage: storage,
});

//step1 connect to the databse using the db.connect method and throw the error if there is
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connected to db");
});

//step2: make sure you get th infos
router.get("/", (req, res) => {
  db.query("SELECT * from info", (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(result);
    }
  });
});

//step3 post information into the information table in the database
router.post("/", upload.single("profile"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.json(result);

    const name = req.body.name;
    const avatar = result.secure_url;
    const age = req.body.age;

   await db.query(
      "INSERT INTO info (name, avatar, age) VALUES (?,?,?) ",
      [name, avatar, age],
      (err, result) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.json(result);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
