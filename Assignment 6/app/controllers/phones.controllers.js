const Phone = require('../models/phones.model.js');

// Create a new Quotation and save to the database
// Create and Save a new Quotation
exports.create = (req, res) => {
    //Validate the request
    if(!req.body.Manufacturer || !req.body.Model || !req.body.Price) {
        return res.status(400).send({
            message: "Phone content cannot be empty!"
        });
    }

    // Create a new Order (using schema)
    const phone = new Phone({
        Manufacturer : req.body.Manufacturer,
        Model : req.body.Model,
        Price : req.body.Price
    });

    // Save Order in the database
    phone.save()
    .then(data => {
        /*  == USER INTERFACE ADDITIONS == */
        // res.redirect('/');
        /*  == USER INTERFACE ADDITIONS == */
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Phone."
        });
    });
    console.log("Phone created successfully!");
};

// Return all Quotations in the database
exports.findAll = (req, res) => {
    Phone.find()
    .then(phones => {
        res.send(phones);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Phones."
        });
    });
    console.log("Phones found successfully!");
};

// Update a Quotation identified by the quotationId in the request
exports.update = (req, res) => {
    //Validate the request
    if(!req.body.Manufacturer || !req.body.Model || !req.body.Price) {
        return res.status(400).send({
            message: "Phone content cannot be empty!"
        });
    }
    console.log()
    // Find the Quotation and update it with the request body
    Phone.findByIdAndUpdate(req.params.phoneID, {
        Manufacturer : req.body.Manufacturer,
        Model : req.body.Model,
        Price : req.body.Price
    }, 
       { new: true })  // "new: true" return updated object
    .then(phone => {
        if(!phone) {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.phoneID
            });
        }
        res.send(phone);
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.phoneID
            });                
        }
        return res.status(500).send({
            message: "Error updating Phone with id " + req.params.phoneID
        });
    });
    console.log("Phone updated successfully!");
};
 
// Delete a Quotation identified by quotationId
exports.delete = (req, res) => {
    Phone.findByIdAndRemove(req.params.phoneID)
    .then(phone => {
        if(!phone) {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.phoneID
            });
        }
        res.send({message: "Phone deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.phoneID
            });                
        }
        return res.status(500).send({
            message: "Could not delete Phone with id " + req.params.phoneID
        });
    });
    console.log("Phone deleted successfully!");
};