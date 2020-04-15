let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
require('dotenv').config()
const db = process.env.mongoURI;
const port = 8080;


// Import routes
let apiRoutes = require("./routes/api-routes");
let ckanFunctions = require('./routes/ckanFunctions');
let dbFunctions = require('./routes/dbFunctions');
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/api', apiRoutes);
app.use('/ckan', ckanFunctions);
app.use('/shelterData', dbFunctions)


mongoose
  .connect(db, {   
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))




app.listen(port, () => console.log(`Server started on port: http://localhost:${port}`));