const express = require('express');

const router = express.Router();

const Scholarship = require("../models/scholarship");

router.post("", (req, res, next) => {
  console.log("hereeeeee " + req.body.title);
  const scholarship = new Scholarship({
    title: req.body.title,
    content: req.body.content,
    scholarImg: req.body.scholarImg,
    finalDate: req.body.finalDate,
    publishedDate: req.body.publishedDate,
    scholarFile: req.body.scholarFile
  });
  console.log("in scolarships.js" + scholarship);
  scholarship.save().then(createdScholar => {
    res.status(201).json({
      message: "scholarship added successfully",
      scholarId: createdScholar._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const post = new Scholarship({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    scholarImg: req.body.scholarImg,
    finalDate: req.body.finalDate,
    publishedDate: req.body.publishedDate,
    scholarFile: req.body.scholarFile
  });
  Scholarship.updateOne({ _id: req.params.id }, post).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get("", (req, res, next) => {
  Scholarship.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      scholarships: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Scholarship.findById(req.params.id).then(scholarship => {
    if(scholarship) {
      res.status(200).json(scholarship);
    } else {
      res.status(404).json('scholar Not Found!');
    }
  })
})

router.delete("/:id", (req, res, next) => {
  Scholarship.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Scholar deleted!" });
  });
});

module.exports = router;