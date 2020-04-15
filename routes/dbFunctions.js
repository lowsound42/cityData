var shelterModel = require('../models/Shelter.js');

let router = require('express').Router();

router.get('/', async (req, res) => {
  console.log('awdawdawdawd')
  const shelters = await shelterModel.find({"OCCUPANCY_DATE":"2020-01-03T00:00:00"});
  try {
    console.log('TEDWEDQW')
    res.send(shelters);
  } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = router;