// Built on top of code given by John Keating



//load database
var mysql = require('mysql');

// Load the NodeJS modules required

var http = require("http"); // creating an API using http
var url = require("url"); // using url to extract the route (e.g. /, /api/user)
var querystring = require("querystring"); // this will contain the body of the POST request
var fs = require("fs"); // file handling to read the assignment-04.html served for / route
var port = 8000; // port the server with listen on

var server = http.createServer(); // create the server

var userDatabase = []; // this is the in-memory database that holds the JSON records
// supplied by the POST request via route /api/user

// listen for requests from clients
server.on("request", function (request, response) {
  var currentRoute = url.format(request.url); // get the route (/ or /api/user)
  var currentMethod = request.method; // get the HTTP request type (POST - Create; GET - Retrieve)
  var requestBody = ""; // will contain the extracted POST data later

  // determine the route (/ or /api/user)
  switch (currentRoute) {
    //
    // If no API call made then the default route is / so
    // just return the default assignment-04.html file to the user.
    // This contains the forms, etc. for making the CRUD
    // requests (only Create and Retrieve implemented)
    //
    case "/":
      fs.readFile(__dirname + "/assignment-04.html", function (err, data) {
        // get the file and add to data
        var headers = {
          // set the appropriate headers
          "Content-Type": "text/html",
        };
        response.writeHead(200, headers);
        response.end(data); // return the data (assignment-04.html)
      }); // as part of the response

      break;

    //
    // Handle the requests from client made using the route /api/user
    // These come via AJAX embedded in the earlier served assignment-04.html
    // There will be a single route (/api/user) but two HTTP request methods
    // POST (for Create) and GET (for Retrieve)
    //

    
    // CREATE Request
    case "/api/user":
      // Handle a POST request;  the user is sending user data via AJAX!
      // This is the CRUD (C)reate request. These data need to be
      // extracted from the POST request and saved to the database!

      if (currentMethod === "POST") {
        // read the body of the POST request
        request.on("data", function (chunk) 
        {
          requestBody += chunk.toString();
        });
        
        // connect to USERS database
        var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "USERS"
        });

        // determine the POST request Content-type (and log to console)
        // Either: (i)  application/x-www-form-urlencoded or (ii) application/json
        const { headers } = request;
        let ctype = headers["content-type"];
        console.log("RECEIVED Content-Type: " + ctype + "\n");

        // finished reading the body of the request
        request.on("end", function () 
        {
          var userData = "";

          // saving the user from the body to the database
          if (ctype.match(new RegExp('^application/x-www-form-urlencoded'))) {
            userData = querystring.parse(requestBody);
          } else {
            userData = JSON.parse(requestBody);
          }
          userDatabase.push(userData);

          // log the user data to console
          console.log(
            "USER DATA RECEIVED: \n\n" +
              JSON.stringify(userData, null, 2) +
              "\n"
          );
          
          // respond to the user with confirmation message
          var headers = {
            "Content-Type": "text/plain",
          };
          response.writeHead(200, headers);
          response.end(
            "User (" +
              userData.firstname +
              " " +
              userData.surname +
              ") data added to the Database!"
          );
          var sql = "INSERT INTO address (AddressLine1, AddressLine2, Town, CityOrCounty, EIRCODE) VALUES ('"+userData.addressline1+"', '"+userData.addressline2+"', '"+userData.town+"', '"+userData.countycity+"', '"+userData.eircode+"')";
          con.query(sql, function (err, result) 
          {
            if (err) throw err;
              console.log("Address info inserted");
          });

          // check if surname has an apostraphe and replace if so, mysql rejects single apostraphe
          if(userData.surname.includes("'") == true)
          {
            var lname = userData.surname.replace("'", "''");
            userData.surname = lname;
          }

          var sql = "INSERT INTO customer (title, firstname, lastname, mobile, email) VALUES ('"+userData.title+"', '"+userData.firstname+"', '"+userData.surname+"', '"+userData.mobile+"', '"+userData.email+"')";
          con.query(sql, function (err, result) 
          {
            if (err) throw err;
              console.log("Customer info inserted");
          });
        });
      }

      // Handle a GET request;  the user is requesting user data via AJAX!
      // RETRIEVE Request


      else if (currentMethod === "GET") 
      {
        var headers = {
          "Content-Type": "application/json",
        };
          var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "USERS"
        });
        
        
        con.connect(function(err) {
          if (err) throw err;
          // sql statement to retrieve data
          var sql = "SELECT * FROM customer INNER JOIN address ON address.AddressID = customer.CustomerID";
          con.query(sql, function (err, retrieve) {
            if (err) throw err;
            console.log("User info retrieved");
              console.log(
                // stringify data to be sent and dispaly it in console
                "USER DATABASE REQUESTED: \n\n" +
                  JSON.stringify(retrieve, null, 2) +
                  "\n"
              );
              // send data to forn end
              response.writeHead(200, headers);
              response.end(JSON.stringify(retrieve));
          });
        });
      }
      break;
      
      // UPDATE Request
      case "/api/update":
        // Handle a POST request;  the user is sending user data via AJAX!
        // This is the CRUD (D)elete request. These data need to be
        // extracted from the POST request and saved to the database!

        if (currentMethod === "POST") {
          // read the body of the POST request
          request.on("data", function (chunk) {
            requestBody += chunk.toString();
            //console.log(chunk.toString());
          });
          var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "USERS"
          });

          // determine the POST request Content-type (and log to console)
          // Either: (i)  application/x-www-form-urlencoded or (ii) application/json
          const { headers } = request;
          let ctype = headers["content-type"];
          console.log("RECEIVED Content-Type: " + ctype + "\n");

          // finished reading the body of the request
          request.on("end", function () {
            var update = "";

            // saving the user from the body to the database
            if (ctype.match(new RegExp('^application/x-www-form-urlencoded'))) {
              update = querystring.parse(requestBody);
            } else {
              update = JSON.parse(requestBody);
            }
            userDatabase.push(update);

            // log the user data to console
            console.log(
              "USER DATA RECEIVED: \n\n" +
                JSON.stringify(update, null, 2) +
                "\n"
            );
            
            var updateData = [];
            for(var i in update) 
            {
              updateData.push(update[i]);
            }

            // update customer data
            var sql = "UPDATE customer SET title = '"+updateData[1]+"', mobile = '"+updateData[2]+"', email = '"+updateData[3]+"' WHERE CustomerID = '"+updateData[0]+"'";
            con.query(sql, function (err, result) 
            {
              if (err) throw err;
                console.log("Customer info updated");
            });

            // if statements to not update the data if nothing was entered into the field
            if(updateData[4] != "")
            {
              var sql = "UPDATE address SET addressline1 = '"+updateData[4]+"' WHERE AddressID = '"+updateData[0]+"'";
              con.query(sql, function (err, result) 
              {
                if (err) throw err;
                  console.log("Address line 1 updated");
              });
            }
            if(updateData[5] != "")
            {
              var sql = "UPDATE address SET addressline2 = '"+updateData[5]+"' WHERE AddressID = '"+updateData[0]+"'";
              con.query(sql, function (err, result) 
              {
                if (err) throw err;
                  console.log("Address line 2 updated");
              });
            }
            if(updateData[6] != "")
            {
              var sql = "UPDATE address SET town = '"+updateData[6]+"' WHERE AddressID = '"+updateData[0]+"'";
              con.query(sql, function (err, result) 
              {
                if (err) throw err;
                  console.log("Town updated");
              });
            }
            if(updateData[7] != "")
            {
              var sql = "UPDATE address SET cityorcounty = '"+updateData[7]+"' WHERE AddressID = '"+updateData[0]+"'";
              con.query(sql, function (err, result) 
              {
                if (err) throw err;
                  console.log("City/County updated");
              });
            }
            if(updateData[8] != "")
            {
              var sql = "UPDATE address SET eircode = '"+updateData[8]+"' WHERE AddressID = '"+updateData[0]+"'";
              con.query(sql, function (err, result) 
              {
                if (err) throw err;
                  console.log("Eircode updated");
              });
            }

            // respond to the user with confirmation message
            var headers = {
              "Content-Type": "text/plain",
            };
            response.writeHead(200, headers);
            response.end(
              "CustomerID (" +
                updateData[0] +
                ") updated!"
            );
          });
        }
        break;

        // DELETE Request
      case "/api/delete_user":
        // Handle a POST request;  the user is sending user data via AJAX!
        // This is the CRUD (D)elete request. These data need to be
        // extracted from the POST request and saved to the database!

        if (currentMethod === "POST") {
          // read the body of the POST request
          request.on("data", function (chunk) {
            requestBody += chunk.toString();
            //console.log(chunk.toString());
          });
          var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "USERS"
          });

          // determine the POST request Content-type (and log to console)
          // Either: (i)  application/x-www-form-urlencoded or (ii) application/json
          const { headers } = request;
          let ctype = headers["content-type"];
          console.log("RECEIVED Content-Type: " + ctype + "\n");

          // finished reading the body of the request
          request.on("end", function () {
            var deleteData = "";

            // saving the user from the body to the database
            if (ctype.match(new RegExp('^application/x-www-form-urlencoded'))) {
              deleteData = querystring.parse(requestBody);
            } else {
              deleteData = JSON.parse(requestBody);
            }
            userDatabase.push(deleteData);

            // log the user data to console
            console.log(
              "USER DATA RECEIVED: \n\n" +
                JSON.stringify(deleteData, null, 2) +
                "\n"
            );
            // respond to the user with confirmation message
            var headers = {
              "Content-Type": "text/plain",
            };
            response.writeHead(200, headers);
            response.end(
              "User (" +
                deleteData.deletefirstname +
                " " +
                deleteData.deletelastname +
                ") data deleted from the Database!"
            );
            
            // check if surname has an apostraphe and replace if so, mysql rejects single apostraphe
            if(deleteData.deletelastname.includes("'") == true)
            {
              var lname = deleteData.deletelastname.replace("'", "''");
              deleteData.deletelastname = lname;
            }
            
            // SQL staement to delete data from table
            var sql = "SELECT CustomerID FROM customer WHERE firstname = '"+deleteData.deletefirstname+"' AND lastname = '"+deleteData.deletelastname+"' AND email = '"+deleteData.deleteemail+"' AND mobile = '"+deleteData.deletemobile+"'";
            con.query(sql, function (err, result1) 
            {
              if (err) throw err;

              var id = JSON.stringify(result1);
              var json = JSON.parse(id);

              var sql = "DELETE FROM address WHERE AddressID = '"+json[0].CustomerID+"'";
              con.query(sql, function (err, result3) 
              {
                if (err) throw err;
                {
                  console.log("Address data deleted");
                }
              });
            });
            
            var sql = "DELETE FROM customer WHERE firstname = '"+deleteData.deletefirstname+"' AND lastname = '"+deleteData.deletelastname+"' AND email = '"+deleteData.deleteemail+"' AND mobile = '"+deleteData.deletemobile+"'";
            con.query(sql, function (err, result2) 
            {
              if (err) throw err;
              {
                console.log("Customer data deleted");
              }
            });
          });
        }
        break;
  }
});


// Set up the HTTP server and listen on port 8000
server.listen(port, function () {
  console.log("\nCRUD Database Demo");
  console.log("Jake Siewer\n");
  console.log("AJAX (HTTP) API server running on port: " + port + "\n");
});
