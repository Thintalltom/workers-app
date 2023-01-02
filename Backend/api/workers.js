const express = require("express");
const multer = require("multer");
const router = express.Router();
const workers = require("../workers");
const db = require("../database/database");


/// this is the storage location using the middleware multer
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

//function for upload image
const upload = multer({
    storage: storage
})

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

module.exports = router;
