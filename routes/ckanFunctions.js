const https = require('https');
const packageName = "daily-shelter-occupancy";
const schedule = require('node-schedule');
let router = require('express').Router();

router.get('/', function (req, res){

let recordNum, recordDifference;
let url = `https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/datastore_search?id=5097e562-9ee0-41d2-bfd7-86878cf8fbcd&offset=`
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
          })
          .on("error", (error) => {
              reject(error)
          })
  })
});

const getNewData = resource => new Promise((resoive, reject) => {
  https.get(`https://ckan0.cf.opendata.inter.prod-toronto.ca//api/3/action/datastore_search?id=5097e562-9ee0-41d2-bfd7-86878cf8fbcd&offset=${resource}`, (response) => {
      let dataChunks = [];
      response
          .on("data", (chunk) => {
              dataChunks.push(chunk)
          })
          .on("end", () => {
              let data = Buffer.concat(dataChunks)
              var infor = (JSON.parse(data.toString()));
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
          res.json(resource);
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
 
 module.exports = router;