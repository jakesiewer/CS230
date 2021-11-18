const express = require('express');         // we're making an ExpressJS App
const bodyParser = require('body-parser');  // we'll use body-parser extensively

const app = express();                      // create the ExpressJS app

/*  == USER INTERFACE ADDITIONS == */
const hbs = require('hbs');                 // use hbs view engine
const path = require('path');               // use the path module (for views)
/*  == USER INTERFACE ADDITIONS == */

// parse the different kinds of requests (content-type) the app handles
// use the "use" method to set up the body-parser middlewear
app.use(bodyParser.json())                          //  application/json
app.use(bodyParser.urlencoded({ extended: true }))  // pplication/x-www-form-urlencoded

/*  == USER INTERFACE ADDITIONS == */
app.set('views',path.join(__dirname,'views'));              // set the views directory
app.set('view engine', 'hbs');                              // set the view engine to hbs
app.use('/assets',express.static(__dirname + '/public'));   // set public folder as "static" for static files
/*  == USER INTERFACE ADDITIONS == */


// Set up Mongoose and our Database connection
const dbConnect = require('./config/connect_atlas.js');
const mongoose = require('mongoose');

// Set up connection to the database
mongoose.connect(dbConnect.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the MongoDB database");    
}).catch(err => {
    console.log('Unable to connect to the MongoDB database', err);
    process.exit();
});

require('./app/routes/customer.routes.js')(app);
require('./app/routes/orders.routes.js')(app);
require('./app/routes/phones.routes.js')(app);


// listen for requests on port 3000
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});