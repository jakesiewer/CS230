
//
// Server Connection Test
//

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// const connect = require("./connect");       // url from connect module
const connect = require("./connect_atlas"); // url from connect module
const client = new MongoClient(connect.database.url, { useUnifiedTopology: true } );

// database name
const dbName = 'test';

// Use connect method to connect to the server
client.connect(function(err) {
  // using the assert module for testing
  assert.equal(null, err);
  console.log("Connected successfully to server");
  client.close();
});
