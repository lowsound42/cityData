var shelterModel = require('../models/Shelter.js');

let router = require('express').Router();

router.get('/', async (req, res) => {
  console.log('awdawdawdawd')
  const shelters = await shelterModel.find({"OCCUPANCY_DATE":"2020-04-10T00:00:00"});
  try {
    console.log('TEDWEDQW')
    res.send(shelters);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/:date', async (req, res) => {
  var date = req.params.date;
    console.log(date);
    console.log(`${date}`);
    const shelters = await shelterModel.find({"OCCUPANCY_DATE":`${date}`});
    try {
      res.send(shelters);
    } catch (err) {
      res.status(500).send(err);
    }
});

module.exports = router;