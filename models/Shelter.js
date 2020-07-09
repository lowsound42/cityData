const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ShelterSchema = new Schema({

  _id: {
    type: Number,
    required: true
  },
  OCCUPANCY_DATE: {
    type: String,
    required: true
  },
  ORGANIZATION_NAME: {
    type: String,
    required: true
  },
  SHELTER_NAME: {
    type: String,
    required: true
  },
  SHELTER_ADDRESS: {
    type: String,
    required: true
  },
  SHELTER_CITY: {
    type: String,
    required: true
  },
  SHELTER_PROVINCE: {
    type: String,
    required: true
  },
  SHELTER_POSTAL_CODE: {
    type: String,
    required: true
  },
  FACILITY_NAME: {
    type: String,
    required: true
  },
  PROGRAM_NAME: {
    type: String,
    required: false
  },
  SECTOR: {
    type: String,
    required: false
  },
  OCCUPANCY: {
    type: Number,
    required: true
  },
  CAPACITY: {
    type: Number,
    required: true
  },
  TARGET: {
    type: Number,
    required: false
  }
}, {collection: 'shelterData'});


const shelterData = mongoose.model("shelterData", ShelterSchema, "shelterData")

module.exports = shelterData;