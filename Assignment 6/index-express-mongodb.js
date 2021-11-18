//
// AJAX - API - Database Demo
//
// CS230 Demo Program - John G. Keating
//
// (c) 2021
//

//
// Note: This version (index-db.js) connects to a MongoDB Database rather than
//       maintaining an "in-memory" database using a variable! You will need
//       access to a database in order for this to work (use Webcourse, etc.)
//

// Load the NodeJS modules required (ExpressJS)
var express = require("express"); // using ExpressJS package
var bodyParser = require("body-parser"); // using body-parser for parsing!

var app = express(); // create the ExpressJS server app

// parse JSON and URL Encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8000; // port the server app with listen on

// watch for Ctrl-C and then close database connection!
process.on("SIGINT", function () {
  console.log("\nDatabase (AjaxAPIDemo): Disconnected!\n");
  process.exit();
});

//
// Setup up the MongoDB connection - note that this sets up a variable
// client which is used to make connections, etc. The connection code
// was generated and copied from the MongoDB Atlas Cluster ("Connect"
// botton). You need to have already set this up and have created a
// user and database callec "test". My user is called Admin user.
// I have created a collection called "AjaxAPIDemo" that will hold the data.
//

const MongoClient = require("mongodb").MongoClient;
require('dotenv').config();

/*
console.log(process.env.username,"\n");
console.log(process.env.password,"\n");
*/

const uri =
  "mongodb+srv://adminUser:Irelandtoamerica@cluster0.7auld.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//
// This section manages a collection-based (mogodb) database connection
// This Demo services the routes using ExpressJS. Notice that with MongoDB
// we organise the app by setting up the connection and issue the ExpressJS
// commands "inside" the callback function. When we worked with MySQL the
// database setup code was outside and before ExpressJS services.
//

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then((client) => {
    // connect to the collection used by the app
    const collection = client.db("lab6").collection("AjaxAPIDemo");
    console.log("Database (AjaxAPIDemo): Connected!\n");
    //
    // If no API call made then the default route is / so
    // just return the default index.html file to the user.
    // This contains the forms, etc. for making the CRUD
    // requests (only Create and Retrieve implemented)
    //
    app.get("/", function (req, res) {
      res.sendFile(__dirname + "/index.html");
    });

    //
    // Handle the requests from client made using the route /api/user
    // These come via AJAX embedded in the earlier served index.html
    // There will be a single route (/api/user) but two HTTP request methods
    // POST (for Create) and GET (for Retrieve). We use app.get() and app.post()
    // to handle the route services. Notice there is much less code involved
    // than in the earlier example thanks to ExpressJS.
    //

    // Handle a GET request;  the user is requesting user data via AJAX!
    // This is the CRUD (R)etrieve request. These data need to be
    // extracted from the database and returned to the user as JSON!
    app.get("/api/user", function (req, res) {
      // make the database query using the connection created earlier
      collection
        .find()
        .toArray()
        .then((results) => {
          console.log(
            "USER DATABASE REQUESTED: \n\n" +
              JSON.stringify(results, null, 2) +
              "\n"
          );
          res.json(results); // return unprocessed result from MongoDB "find" Query
        })
        .catch((error) => console.error(error));
    });

    // Handle a POST request;  the user is sending user data via AJAX!
    // This is the CRUD (C)reate request. These data need to be
    // extracted from the POST request and saved to the database!
    app.post("/api/user", function (req, res) {
      var userData = req.body;
      console.log(
        "USER DATA RECEIVED: \n\n" + JSON.stringify(userData, null, 2) + "\n"
      );
      // we have the data supplied so make the database connection and
      // the (unvalidated) data. Without validation we just hope everything
      // works out okay - for production we would need to perform validation
      collection
        .insertOne(userData)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.error(error));
      console.log(
        `USER RECORD INSERTED: ['${userData.firstname}','${userData.surname}','${userData.email}']\n`
      );
      // respond to the user with confirmation message
      res.send(
        "User (" +
          userData.firstname +
          " " +
          userData.surname +
          ") data added to the Database!"
      );
    });

    // Set up the HTTP server and listen on port 8000
    app.listen(port, function () {
      console.log("\nAJAX - API - Database Demo");
      console.log("CS230 Demo Program - John G. Keating\n(c) 2021\n");
      console.log("AJAX (HTTP) API server running on port: " + port + "\n");
    });
  })
  .catch(console.error);
