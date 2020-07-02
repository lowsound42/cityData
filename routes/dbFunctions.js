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

router.post('/array', async(req, res) => {
  let shelters;
  let date;
  console.log(req.body.data[0].substring(0,4));
    req.body.data.map(item => {
      console.log('HERES AN ITEM', item);
    })
    if (req.body.data != [])
    {
      let sheltersArray = [];
      for (let i = 0; i < req.body.data.length; i++){
        if (req.body.data[i].substring(0,4) == '2020'){
        shelters = await shelterModel.find({$and: [
          {"OCCUPANCY_DATE":`${req.body.data[i]}T00:00:00`},
          {"SECTOR":`${req.body.sector}`}
        ]})
        sheltersArray.push(shelters);  
      }
      else {
        shelters = await shelterModel.find({$and: [
          {"OCCUPANCY_DATE":`${req.body.data[i]}`},
          {"SECTOR":`${req.body.sector}`}
        ]})
        sheltersArray.push(shelters);  
      }
      }
      try {
        res.send(sheltersArray);
      } catch (err) {
        res.status(500).send(err);
      }
    }
})

router.post('/singleShelter', async(req, res) => {
  let shelters;
  console.log(req.body.shelter);
    req.body.data.map(item => {
      console.log('HERES AN ITEM', item);
    })
    if (req.body.data != [])
    {
      let sheltersArray = [];
      for (let i = 0; i < req.body.data.length; i++){
        if (req.body.data[i].substring(0,4) == '2020'){
        shelters = await shelterModel.find({$and: [
          {"OCCUPANCY_DATE":`${req.body.data[i]}T00:00:00`},
          {"FACILITY_NAME":`${req.body.shelter}`}
        ]})
        sheltersArray.push(shelters);  
      }
      else {
        shelters = await shelterModel.find({$and: [
          {"OCCUPANCY_DATE":`${req.body.data[i]}`},
          {"PROGRAM_NAME":`${req.body.shelter}`}
        ]})
        sheltersArray.push(shelters);  
      }
    }
      try {
        res.send(sheltersArray);
      } catch (err) {
        res.status(500).send(err);
      }
    }
})

// router.get('/shelter/:name', async (req, res) => {
//   var name = req.params.name;
//   console.log(name);
//   if (name == 'main'){
//     const shelters = await shelterModel.find({$and: [
//       {"PROGRAM_NAME": "Womens' Residence - Main Program"},
//       {$or: [{"OCCUPANCY_DATE": {"$regex":"2020-03"}}, {"OCCUPANCY_DATE": {"$regex":"2020-04"}},{"OCCUPANCY_DATE": {"$regex":"2020-05"}}, {"OCCUPANCY_DATE": {"$regex":"2020-06"}}]}
//     ]
//     })
//     try {
//       res.send(shelters);
//     } catch (err) {
//       res.status(500).send(err)
//     }
//   }
//   else  if (name == 'alexandra'){
//     const shelters = await shelterModel.find({$and: [
//       {"PROGRAM_NAME": "Women's Res-Alexandra Hotel"},
//       {$or: [{"OCCUPANCY_DATE": {"$regex":"2020-03"}}, {"OCCUPANCY_DATE": {"$regex":"2020-04"}},{"OCCUPANCY_DATE": {"$regex":"2020-05"}}, {"OCCUPANCY_DATE": {"$regex":"2020-06"}}]}
//     ]
//     })
//     try {
//       res.send(shelters);
//     } catch (err) {
//       res.status(500).send(err)
//     }
//   }
//   else  if (name == 'bellwoods'){
//     const shelters = await shelterModel.find({$and: [
//       {"PROGRAM_NAME": "Womens' Residence - Bellwoods House"},
//       {$or: [{"OCCUPANCY_DATE": {"$regex":"2020-03"}}, {"OCCUPANCY_DATE": {"$regex":"2020-04"}},{"OCCUPANCY_DATE": {"$regex":"2020-05"}}, {"OCCUPANCY_DATE": {"$regex":"2020-06"}}]}
//     ]
//     })
//     try {
//       res.send(shelters);
//     } catch (err) {
//       res.status(500).send(err)
//     }
//   }
//   else  if (name == 'weather'){
//     const shelters = await shelterModel.find({$and: [
//       {"PROGRAM_NAME": "Women's Residence Extreme Weather Program"},
//       {$or: [{"OCCUPANCY_DATE": {"$regex":"2020-03"}}, {"OCCUPANCY_DATE": {"$regex":"2020-04"}},{"OCCUPANCY_DATE": {"$regex":"2020-05"}}, {"OCCUPANCY_DATE": {"$regex":"2020-06"}}]}
//     ]
//     })
//     try {
//       res.send(shelters);
//     } catch (err) {
//       res.status(500).send(err)
//     }
//   }
// })

module.exports = router;