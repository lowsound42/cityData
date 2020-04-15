let mongoose = require('mongoose');
const db = process.env.mongoURI;
var shelterModel = require('../models/Shelter.js');

let router = require('express').Router();

router.get('/', async (req, res) => {
  const shelters = await shelterModel.find({"OCCUPANCY_DATE":"2020-01-01T00:00:00"});
  try {
    res.send(shelters);
  } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = router;