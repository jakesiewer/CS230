//
// CRUD Example example based on MongoDB NodeJS Driver Docs
// Developed uisng the Quickstart Guide:
// http://mongodb.github.io/node-mongodb-native/3.5/quick-start/quick-start/

// Tested with Windows 10 using VSCode

//import random data generator
const randomData = require('./genData.js');

// file to connect to the atlas database
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const connect = require("./connect_atlas"); // url from connect module

const client = new MongoClient(connect.database.url, { useUnifiedTopology: true } );

// database name
const dbName = 'test';

// Use connect method to connect to the server
client.connect(function(err) {
  // using the assert module for testing
  assert.equal(null, err);
  console.log("Connected successfully to server\n");

  // use this database
  const db = client.db(dbName);


  // various callbacks to execute the functions
  createCustomer(db, function() {
    updateCustomer(db, function() {
      retrieveCustomers(db, function() {
        updatePhone(db, function() {
          retrievePhones(db, function() {
            deletePhone(db, function() {
              createPhone(db, function() {
                createOrder(db, function() {
                  retrieveOrders(db, function() {
                    deleteOrder(db, function() {
                      updateOrder(db, function() {
                        client.close();
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

// pull random documents from their respective collections

const getRandomCustomer = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('customers');
  // Find some documents
  collection.aggregate(
    [ { $sample: { size: 1 } } ]).toArray(function(err, docs) {

    // using the assert module for testing
    assert.equal(err, null);
    // all good if we get to here

    callback(docs);
  });
}

const getRandomPhone = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('phones');
  // Find a document
  collection.aggregate(
    [ { $sample: { size: 1 } } ]).toArray(function(err, doc) {
      
    // using the assert module for testing
    assert.equal(err, null);
    // all good if we get to here

    callback(doc);
  });
}

const getRandomPhones = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('phones');
  // Find 5 random documents
  collection.aggregate(
    [ { $sample: { size: 5 } } ]).toArray(function(err, docs) {
      
    // using the assert module for testing
    assert.equal(err, null);
    // all good if we get to here

    callback(docs);
  });
}

const getRandomOrder = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('orders');
  // Find some documents
  collection.aggregate(
    [ { $sample: { size: 1 } } ]).toArray(function(err, docs) {
      
    // using the assert module for testing
    assert.equal(err, null);
    // all good if we get to here

    callback(docs);
  });
}

//R Retreive Customer
const retrieveCustomers = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('customers');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    // using the assert module for testing
    assert.equal(err, null);
    // all good if we get to here
    console.log("Found the following customer records\n");
    console.log(docs);

    callback(docs);
  });
}

//R Retreive Phones
const retrievePhones = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('phones');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    // using the assert module for testing
    assert.equal(err, null);
    // all good if we get to here
    console.log("Found the following item records\n");
    console.log(docs);

    callback(docs);
  });
}

//R Retreive Orders
const retrieveOrders = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('orders');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    // using the assert module for testing
    assert.equal(err, null);
    // all good if we get to here
    console.log("Found the following order records\n");
    console.log(docs);

    callback(docs);
  });
}

//C Create Customer
const createCustomer = function(db, callback) {
  // pull random data from getData.js
  var fname = randomData.getFirstName();
  var sname = randomData.getLastName();
  var email = randomData.getEmail();
  var street = randomData.getStreet();
  var addline2 = randomData.getaddLine2();
  var citycounty = randomData.getTownandCounty();
  citycounty = citycounty.split("/");
  var eircode = randomData.getEircode();

  // Using the "customers" collection
  const collection = db.collection('customers');
  // Insert the document
  collection.insertMany([
    {"title": randomData.getTitle(), "fname": fname, "lname": sname, "email": fname + "." + sname + email, "mobile": randomData.getMobile(), "ShipingAddress":{"AddressLine1": street, "AddressLine2": addline2, "Town": citycounty[0], "County": citycounty[1], "Eircode": eircode}, "BillingAddress":{"AddressLine1": street, "AddressLine2": addline2, "Town": citycounty[0], "County": citycounty[1], "Eircode": eircode}}
  ], function(err, result) {
    // using the assert module for testing
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    // all good if we get to here
    console.log("Inserted 1 auto generated customer into the collection\n");
    callback(result);
  });
}

//C Create Phone
const createPhone = function(db, callback) {
  // Using the "phones" collection
  const collection = db.collection('phones');
  // Insert some documents
  collection.insertMany([
    {"Manufacturer": "Samsung", "Model": "Galaxy S21+ 5G", "Price": "€1089.00"}
  ], function(err, result) {
    // using the assert module for testing
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    // all good if we get to here
    console.log("Inserted Galaxy S21+ 5G into database\n");
    callback(result);
  });
}

//C Create Order
const createOrder = function(db, callback) {
  // Get the orders collection
  const collection = db.collection('orders');

  getRandomCustomer(db, function(doc) {
    getRandomPhones(db, function(doc1) {
      var randomCustomer = doc[0]._id;
      var randomPhones = doc1;

      // gen random number for oders
      var order;
      var numItems = Math.floor(Math.random() * 5);
      // switch statement for each query up to 5
      switch (numItems) {
        case 0:
          order = {"Customer ID": randomCustomer, "Receipt": {"Item 1": randomPhones[0]._id}};
          break;
        case 1:
          order = {"Customer ID": randomCustomer, "Receipt": {"Item 1": randomPhones[0]._id, "Item 2": randomPhones[1]._id}};
          break;
        case 2:
          order = {"Customer ID": randomCustomer, "Receipt": {"Item 1": randomPhones[0]._id, "Item 2": randomPhones[1]._id, "Item 3": randomPhones[2]._id}};
          break;
        case 3:
          order = {"Customer ID": randomCustomer, "Receipt": {"Item 1": randomPhones[0]._id, "Item 2": randomPhones[1]._id, "Item 3": randomPhones[2]._id, "Item 4": randomPhones[3]._id}};
          break;
        case 4:
          order = {"Customer ID": randomCustomer, "Receipt": {"Item 1": randomPhones[0]._id, "Item 2": randomPhones[1]._id, "Item 3": randomPhones[2]._id, "Item 4": randomPhones[3]._id,"Item 5": randomPhones[4]._id}};
      }

      collection.insertMany([
        order
      ], function(err, result) {
        // using the assert module for testing
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        assert.equal(1, result.ops.length);
        // all good if we get to here
        console.log("Inserted random order with " + numItems + " items\n");
        callback(result);
      });
    });  
  });
}

//U Update Customer
const updateCustomer = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('customers');

  getRandomCustomer(db, function(doc) {

    // Update random document with random values
    collection.updateOne({_id : doc[0]._id }
      , { $set: { email :  doc[0].fname + "." + doc[0].lname + randomData.getEmail() + "(updated)", title :  randomData.getTitle() + "(updated)", mobile : randomData.getMobile() + "(updated)"} }
      , function(err, result) {
      // using the assert module for testing
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      // all good if we get to here
      console.log("Updated random document: " + doc[0].fname + " " + doc[0].lname + " with random values");
      callback(result);
    });  
  });
}

//U Update Phone
const updatePhone = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('phones');

  // Update random document with random values
  collection.updateOne({Manufacturer: "Samsung", Model: "Galaxy S21+ 5G", Price: "€1089.00"}
  , { $set: {Manufacturer: "Samsung", Model: "Galaxy S21+ 5G", Price: "€989.00(updated)"} }
  , function(err, result) {
    // using the assert module for testing
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    // all good if we get to here
    console.log("Updated Galaxy S21+ 5G price\n");
    callback(result); 
  });
}

//U Update Order
const updateOrder = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('orders');

  getRandomOrder(db, function(doc) {
    getRandomPhone(db, function(randomphone) {
    var doclength = doc.length;;
    var randomdoc = Math.floor(Math.random() * doclength);

    // Update random document with random values
    collection.updateOne({_id : doc[randomdoc]._id }
      , { $set: { "Receipt.Item 1" :  randomphone[0]._id + "(updated)"} }
      , function(err, result) {
      // using the assert module for testing
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      // all good if we get to here
      console.log("Updated random order: " + doc[0]._id + "/item 1 with random item\n");
      callback(result);
      });
    });  
  });
}

const deleteCustomer = function(db, callback) {              //D Deletes Customer
  // Get the documents collection
  const collection = db.collection('customers');

    //get random document
    getRandomCustomer(db, function(doc) {

    collection.deleteOne({_id : doc[0]._id }, function(err, result) {
      // using the assert module for testing
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      // all good if we get to here      
      console.log("Removed random document: " + doc[0].fname + " " + doc[0].lname + " from collection\n");
      callback(result);
    });
  });    
}

const deletePhone = function(db, callback) {              //D Deletes Phone
  // Get the documents collection
  const collection = db.collection('phones');

  collection.deleteOne({Manufacturer: "Samsung", Model: "Galaxy S21+ 5G", Price: "€989.00(updated)"}, 
  function(err, result) {
    // using the assert module for testing
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    // all good if we get to here      
    console.log("Removed Galaxy S21+ 5G from database\n");
    callback(result);
  });  
}

const deleteOrder = function(db, callback) {              //D Deletes Customer
  // Get the documents collection
  const collection = db.collection('orders');

    //get random document
    getRandomOrder(db, function(doc) {

    collection.deleteOne({_id : doc[0]._id }, function(err, result) {
      // using the assert module for testing
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      // all good if we get to here      
      console.log("Removed random order: " + doc[0]._id + " from collection\n");
      callback(result);
    });
  });    
}