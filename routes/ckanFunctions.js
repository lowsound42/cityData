var shelterModel = require('../models/Shelter.js');
const https = require('https');
const packageName = "daily-shelter-occupancy";
let router = require('express').Router();

var recordCount;

shelterModel.countDocuments({}, function( err, count){
  recordCount = count;
  console.log('records in db', recordCount)
})

var date = new Date();
var day = date.getDate() - 1;
var year = date.getFullYear();
var month = date.getMonth() + 1;
console.log(month);
console.log(year);
if (day < 10){
  day = '0' + day;
}
if (month < 10){
  month = '0' + month;
}
console.log(day);
console.log(month);

var schedule = require('node-schedule');
 
var rule = new schedule.RecurrenceRule();
rule.hour = 16;
 
// weird
var j = schedule.scheduleJob(rule, function(){

const getNewData = resource => new Promise((resolve, reject) => {
  https.get(`https://ckan0.cf.opendata.inter.prod-toronto.ca//api/3/action/datastore_search?id=5097e562-9ee0-41d2-bfd7-86878cf8fbcd&filters={"OCCUPANCY_DATE":"${year}-${month}-${day}T00:00:00"}`, (response) => {
      let dataChunks = [];
      response.on("data", (chunk) => {dataChunks.push(chunk)})
          .on("end", () => {
              let data = Buffer.concat(dataChunks)
              var infor = (JSON.parse(data.toString()));
              console.log(infor);
              (async () => {
                try {
                    for(let i=0; i<infor.result.records.length; i++) {
                      console.log(i);
                          var sData = new shelterModel();
                          sData._id = infor.result.records[i]._id;
                          sData.OCCUPANCY_DATE = infor.result.records[i].OCCUPANCY_DATE;
                          sData.SECTOR = infor.result.records[i].SECTOR;
                          sData.SHELTER_POSTAL_CODE = infor.result.records[i].SHELTER_POSTAL_CODE;
                          sData.CAPACITY = infor.result.records[i].CAPACITY;
                          sData.SHELTER_PROVINCE = infor.result.records[i].SHELTER_PROVINCE;
                          sData.FACILITY_NAME = infor.result.records[i].FACILITY_NAME;
                          sData.SHELTER_NAME = infor.result.records[i].SHELTER_NAME;
                          sData.OCCUPANCY = infor.result.records[i].OCCUPANCY;
                          sData.ORGANIZATION_NAME = infor.result.records[i].ORGANIZATION_NAME;
                          sData.SHELTER_ADDRESS = infor.result.records[i].SHELTER_ADDRESS;
                          sData.SHELTER_CITY = infor.result.records[i].SHELTER_CITY;
                          sData.PROGRAM_NAME = infor.result.records[i].PROGRAM_NAME;
                          sData.save().then(function (err, result){
                            console.log('created!!!!');
                          })
                    }
                  getNewDataOffset();
                } catch (err) {
                    console.error(err)
                }
            })()
          })
          .on("error", (error) => {
              reject(error)
          })
  })
});

const getNewDataOffset = resource => new Promise((resolve, reject) => {
  https.get(`https://ckan0.cf.opendata.inter.prod-toronto.ca//api/3/action/datastore_search?id=5097e562-9ee0-41d2-bfd7-86878cf8fbcd&filters={"OCCUPANCY_DATE":"${year}-${month}-${day}T00:00:00"}&offset=100`, (response) => {
      let dataChunks = [];
      response.on("data", (chunk) => {dataChunks.push(chunk)})
          .on("end", () => {
              let data = Buffer.concat(dataChunks)
              var infor = (JSON.parse(data.toString()));
              console.log(infor);
              (async () => {
                try {
                    for(let i=0; i<infor.result.records.length; i++) {
                      console.log(i);
                          var sData = new shelterModel();
                          sData._id = infor.result.records[i]._id;
                          sData.OCCUPANCY_DATE = infor.result.records[i].OCCUPANCY_DATE;
                          sData.SECTOR = infor.result.records[i].SECTOR;
                          sData.SHELTER_POSTAL_CODE = infor.result.records[i].SHELTER_POSTAL_CODE;
                          sData.CAPACITY = infor.result.records[i].CAPACITY;
                          sData.SHELTER_PROVINCE = infor.result.records[i].SHELTER_PROVINCE;
                          sData.FACILITY_NAME = infor.result.records[i].FACILITY_NAME;
                          sData.SHELTER_NAME = infor.result.records[i].SHELTER_NAME;
                          sData.OCCUPANCY = infor.result.records[i].OCCUPANCY;
                          sData.ORGANIZATION_NAME = infor.result.records[i].ORGANIZATION_NAME;
                          sData.SHELTER_ADDRESS = infor.result.records[i].SHELTER_ADDRESS;
                          sData.SHELTER_CITY = infor.result.records[i].SHELTER_CITY;
                          sData.PROGRAM_NAME = infor.result.records[i].PROGRAM_NAME;
                          sData.save().then(function (err, result){
                            console.log('created!!!!');
                          })
                    }
                } catch (err) {
                    console.error(err)
                }
            })()
              
          })
          .on("error", (error) => {
              reject(error)
          })
  })
});

getNewData();

});


 module.exports = router;