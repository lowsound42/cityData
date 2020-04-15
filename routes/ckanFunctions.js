let mongoose = require('mongoose');
const db = process.env.mongoURI;
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
console.log(day);

var schedule = require('node-schedule');
 
var rule = new schedule.RecurrenceRule();
rule.hour = 9;
 
var j = schedule.scheduleJob(rule, function(){

  // promise to retrieve the package
  const getPackage = new Promise((resolve, reject) => {
    https.get(`https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show?id=${packageName}`, (response) => {
        let dataChunks = [];
        response
            .on("data", (chunk) => {  
                dataChunks.push(chunk)
            })
            .on("end", () => {
                let data = Buffer.concat(dataChunks)
                resolve(JSON.parse(data.toString())["result"])
                
            })
            .on("error", (error) => {
                reject(error)
            })
    });
  });

  getPackage.then(pkg => {
    // this is the metadata of the package
    console.log(pkg);
  }).catch(error => {
    console.error(error);
  })

    
  // since this package has resources in the datastore, one can get the data rather than just the metadata of the resources
  // promise to retrieve data of a datastore resource 
  const getDatastoreResource = resource => new Promise((resolve, reject) => {
    https.get(`https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/datastore_search?id=${resource["id"]}`, (response) => {
        let dataChunks = [];
        response
            .on("data", (chunk) => {
                dataChunks.push(chunk)
            })
            .on("end", () => {
                let data = Buffer.concat(dataChunks)
                resolve(JSON.parse(data.toString())["result"])
                getNewData();
            })
            .on("error", (error) => {
                reject(error)
            })
    })
  });

  const getNewData = resource => new Promise((resolve, reject) => {
    https.get(`https://ckan0.cf.opendata.inter.prod-toronto.ca//api/3/action/datastore_search?id=5097e562-9ee0-41d2-bfd7-86878cf8fbcd&filters={"OCCUPANCY_DATE":"2020-04-${day}T00:00:00"}`, (response) => {
        let dataChunks = [];
        response
            .on("data", (chunk) => {
                dataChunks.push(chunk)
            })
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


  // get the package information again
  getPackage.then(package => {
    // get the datastore resources for the package
    let datastoreResources = package["resources"].filter(r => r.datastore_active);

    // retrieve the first datastore resource as an example
    getDatastoreResource(datastoreResources[0])
        .then(resource => {
            // this is the actual data of the resource
            console.log(resource);
            var totalRecords = (resource.total);
            console.log(totalRecords);
            recordNum = totalRecords;
          })
        .catch(error => {
            console.error(error);
        })
  }).catch(error => {
    console.error(error);
  })

});

router.get('/', function (req, res){
console.log('ckan working')

});
 
 module.exports = router;