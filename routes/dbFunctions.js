var shelterModel = require('../models/Shelter.js');

let router = require('express').Router();

router.get('/', async (req, res) => {
  console.log('awdawdawdawd')
  const shelters = await shelterModel.find({"OCCUPANCY_DATE":"2020-05-01T00:00:00"});
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


router.get('/shelter/:name', async (req, res) => {
  var name = req.params.name;
  console.log(name);
  if (name == 'main'){
    const shelters = await shelterModel.find({$and: [
      {"PROGRAM_NAME": "Womens' Residence - Main Program"},
      {$or: [{"OCCUPANCY_DATE": {"$regex":"2020-03"}}, {"OCCUPANCY_DATE": {"$regex":"2020-04"}},{"OCCUPANCY_DATE": {"$regex":"2020-05"}}, {"OCCUPANCY_DATE": {"$regex":"2020-06"}}]}
    ]
    })
    try {
      res.send(shelters);
    } catch (err) {
      res.status(500).send(err)
    }
  }
  else  if (name == 'alexandra'){
    const shelters = await shelterModel.find({$and: [
      {"PROGRAM_NAME": "Women's Res-Alexandra Hotel"},
      {$or: [{"OCCUPANCY_DATE": {"$regex":"2020-03"}}, {"OCCUPANCY_DATE": {"$regex":"2020-04"}},{"OCCUPANCY_DATE": {"$regex":"2020-05"}}, {"OCCUPANCY_DATE": {"$regex":"2020-06"}}]}
    ]
    })
    try {
      res.send(shelters);
    } catch (err) {
      res.status(500).send(err)
    }
  }
  else  if (name == 'bellwoods'){
    const shelters = await shelterModel.find({$and: [
      {"PROGRAM_NAME": "Womens' Residence - Bellwoods House"},
      {$or: [{"OCCUPANCY_DATE": {"$regex":"2020-03"}}, {"OCCUPANCY_DATE": {"$regex":"2020-04"}},{"OCCUPANCY_DATE": {"$regex":"2020-05"}}, {"OCCUPANCY_DATE": {"$regex":"2020-06"}}]}
    ]
    })
    try {
      res.send(shelters);
    } catch (err) {
      res.status(500).send(err)
    }
  }
  else  if (name == 'weather'){
    const shelters = await shelterModel.find({$and: [
      {"PROGRAM_NAME": "Women's Residence Extreme Weather Program"},
      {$or: [{"OCCUPANCY_DATE": {"$regex":"2020-03"}}, {"OCCUPANCY_DATE": {"$regex":"2020-04"}},{"OCCUPANCY_DATE": {"$regex":"2020-05"}}, {"OCCUPANCY_DATE": {"$regex":"2020-06"}}]}
    ]
    })
    try {
      res.send(shelters);
    } catch (err) {
      res.status(500).send(err)
    }
  }
})

module.exports = router;