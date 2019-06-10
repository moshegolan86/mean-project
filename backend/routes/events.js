const express = require('express');

const router = express.Router();

const Event = require("../models/event");

router.post("", (req, res, next) => {
  const event = new Event({
    title: req.body.title,
    place: req.body.place,
    eventDate: req.body.eventDate,
    studentPrice: req.body.studentPrice,
    guestPrice: req.body.guestPrice,
    description: req.body.description
  });
  event.save().then(createdEvent => {
    res.status(201).json({
      message: "Event added successfully",
      eventId: createdEvent._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const event = new Event({
    _id: req.body.id,
    title: req.body.title,
    place: req.body.place,
    eventDate: req.body.eventDate,
    studentPrice: req.body.studentPrice,
    guestPrice: req.body.guestPrice,
    description: req.body.description
  });
  Event.updateOne({ _id: req.params.id }, event).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get("", (req, res, next) => {
  Event.find().then(documents => {
    res.status(200).json({
      message: "Events fetched successfully!",
      events: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Event.findById(req.params.id).then(event => {
    if(event) {
      res.status(200).json(event);
    } else {
      res.status(404).json('Post Not Found!');
    }
  })
})

router.delete("/:id", (req, res, next) => {
  Event.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Event deleted!" });
  });
});

module.exports = router;
