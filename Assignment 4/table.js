var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "USERS"
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE USERS", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
//   });

  // con.connect(function(err) {
  //   if (err) throw err;
  //   console.log("Connected!");
  //   var sql = "ALTER TABLE customers ADD COLUMN id SERIAL PRIMARY KEY";
  //   con.query(sql, function (err, result) {
  //     if (err) throw err;
  //     console.log("Table altered");
  //   });
  // });

  // con.connect(function(err) {
  //   if (err) throw err;
  //   console.log("Database: Connected!");
  //   //   con.query("SELECT ID, FNAME, LNAME FROM TestTable", function (err, result, fields) {
  //   con.query("SELECT * FROM customers where name = 'Jake Siewer'", function (err, result, fields) {
  //     if (err) throw err;
  //     console.log(result);
  //     //console.log("id: " + result[0].ID + " Name: " + result[0].NAME + " " + result[0].ADDRESS + "<br>");
  //     con.end(function(err) {
  //       if (err) {
  //         return console.log('error:' + err.message);
  //       }
  //       console.log('Database: Connection closed!');
  //     }); 
  //   });
  // });