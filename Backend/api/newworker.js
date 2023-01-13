const express = require('express');
const multer = require('multer');
const router = express.Router();
const newworker = require('../Newworker')
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
    console.log("connected to db2");
  });


  //step2: make sure you get th infos
router.get("/", (req, res) => {
    db.query("SELECT * from newworker", (err, result) => {
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
      console.log(result);
     const data={
         name: req.body.name,
         avatar: result.secure_url,
         position: req.body.position,
         cloudinary_id: result.public_id,
         Date: new Date()
     }
    
      console.log(Date)
      //in order  to not get an error res.json must not be used twice
      // it is either res.json is used with the result of the cloudinary uploader or used in the mysql
      //advicable to be used in the clousinary uploader so the secutre url can be seen
      db.query(
        "INSERT INTO newworker SET ?",
        [data],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.json(result);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

  //step 4: how to delete information from the table in a databse and also
/* deleting the images from the cloudinary in order to remove from cloudinary 
the cloudinary image id needes to be stated pronto or else the image wont be able to removed from the cloudinary */
router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      //two functions must be used one to destroy the cloudinary image by selecting the id 
      db.query('SELECT cloudinary_id FROM newworker WHERE idnewworker = ?', [id], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          cloudinary.uploader.destroy(result[0].cloudinary_id, function(error, result) {
            console.log(result)
          })
        }
      });
  
      db.query('DELETE FROM newworker WHERE idnewworker = ?', [id], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json({result,
            message: "User successfully deleted"}
            ); 
        }
      });
    } catch (error) {
      console.log(error)
    }
   
  });
  
  //step5: change the information using put 
router.put("/:id", upload.single("profile"), async (req, res) => {
    try {
      const data = req.params.id
      // the image will be added in it again
    const name = req.body.name 
    const position = req.body.position 
     
      //in order  to not get an error res.json must not be used twice
      // it is either res.json is used with the result of the cloudinary uploader or used in the mysql
      //advicable to be used in the clousinary uploader so the secutre url can be seen
      db.query(
        "UPDATE  newworker SET `name` = ?, `position` = ?, WHERE id = ? ",
        [name, position, data],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

  module.exports = router;