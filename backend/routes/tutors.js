const express = require('express');

const router = express.Router();

const Tutor = require("../models/tutor");

router.post("", (req, res, next) => {
  const tutor = new Tutor({
    name: req.body.name,
    fieldOfStudy: req.body.fieldOfStudy,
    academicBackground: req.body.academicBackground,
    price: req.body.price,
    description: req.body.description,
    tutorImg: req.body.tutorImg,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  });
  tutor.save().then(createdTutor => {
    res.status(201).json({
      message: "tutor added successfully",
      tutorId: createdTutor._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const tutor = new Tutor({
    _id: req.body.id,
    name: req.body.name,
    fieldOfStudy: req.body.fieldOfStudy,
    academicBackground: req.body.academicBackground,
    price: req.body.price,
    description: req.body.description,
    tutorImg: req.body.tutorImg,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  });
  Tutor.updateOne({ _id: req.params.id }, tutor).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get("", (req, res, next) => {
  Tutor.find().then(documents => {
    res.status(200).json({
      message: "Tutors fetched successfully!",
      tutors: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Tutor.findById(req.params.id).then(tutor => {
    if(tutor) {
      res.status(200).json(tutor);
    } else {
      res.status(404).json('tutor Not Found!');
    }
  })
})

router.delete("/:id", (req, res, next) => {
  Tutor.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Tutor deleted!" });
  });
});

module.exports = router;
