const Customer = require('../models/customer.model.js');
const randomData = require('../../genData.js');

// // Create a new Quotation and save to the database
// exports.create = (req, res) => {
//     console.log("Create a new Quotation and save to the database")
//     return res.status(200).send({
//         message: "Create a new Quotation and save to the database"
//     });
// };

// Create a new Quotation and save to the database
// Create and Save a new Quotation
// RANDOMLY GENERATED
exports.create = (req, res) => {
    var fname = randomData.getFirstName();
    var sname = randomData.getLastName();
    var email = randomData.getEmail();
    var street = randomData.getStreet();
    var addline2 = randomData.getaddLine2();
    var citycounty = randomData.getTownandCounty();
    citycounty = citycounty.split("/");
    var town = citycounty[0];
    var county = citycounty[1];
    var eircode = randomData.getEircode();
    // Validate the request
    // if(!req.body.firstname || !req.body.lastname) {
    //     return res.status(400).send({
    //         message: "Customer content cannot be empty!"
    //     });
    // }

    // Create a new Quotation (using schema)
    const customer = new Customer({
        title: randomData.getTitle(),
        fname: fname,
        sname: sname,
        email: fname + "." + sname + email,
        mobile: randomData.getMobile(),
        HomeAddress: {
            street: street,
            addline2: addline2,
            town: town,
            county: county,
            eircode: eircode
        },
        ShippingAddress: {
            street: street,
            addline2: addline2,
            town: town,
            county: county,
            eircode: eircode
        }
    });

    // Save Quotation in the database
    customer.save()
    .then(data => {
        /*  == USER INTERFACE ADDITIONS == */
        // res.redirect('/');
        /*  == USER INTERFACE ADDITIONS == */
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Customer."
        });
    });
    console.log("Customer created successfully!");
};
 
// //Return all Quotations in the database
// exports.findAll = (req, res) => {
//     console.log("Return all Customers in the database")
//     return res.status(200).send({
//         message: "Return all Customers in the database"
//     });
// };

// Return all Quotations in the database
exports.findAll = (req, res) => {
    Customer.find()
    .then(customers => {
        res.send(customers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Customers."
        });
    });
    console.log("Customer found successfully!");
};

// Update a Quotation identified by the quotationId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Quotation content cannot be empty"
        });
    }

    // Find the Quotation and update it with the request body
    Customer.findByIdAndUpdate(req.params.customerId, {
        title: req.body.title, 
        email: req.body.email,
        mobile: req.body.mobile
    }, 
       { new: true })  // "new: true" return updated object
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Quotation not found with id " + req.params.customerId
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Quotation not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Error updating Quotation with id " + req.params.customerId
        });
    });
    console.log("Customer updated successfully!");
};
 
// Delete a Quotation identified by quotationId
exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params.customerId)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        res.send({message: "Customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Customer with id " + req.params.customerId
        });
    });
    console.log("Customer deleted successfully!");
};