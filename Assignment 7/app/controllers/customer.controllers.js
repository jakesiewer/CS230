const Customer = require('../models/customer.model.js');

/*  == USER INTERFACE ADDITIONS == */
// Default message for / (get)
exports.findCustomers = (req, res) => {
    Customer.find()
    .then(customers => {
        res.render('customers_view',{
            customersCol: customers
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Customers."
        });
    });
};

// Create a new Quotation and save to the database
// Create and Save a new Quotation

exports.create = (req, res) => {

    // Validate the request
    // if(!req.body.firstname || !req.body.lastname) {
    //     return res.status(400).send({
    //         message: "Customer content cannot be empty!"
    //     });
    // }

    // Create a new Quotation (using schema)
    const customer = new Customer({
        title: req.body.title,
        fname: req.body.fname,
        sname: req.body.sname,
        email: req.body.email,
        mobile: req.body.mobile,
        HomeAddress: {
            street: req.body.street,
            addline2: req.body.addline2,
            town: req.body.town,
            county: req.body.county,
            eircode: req.body.eircode
        },
        ShippingAddress: {
            shipstreet: req.body.shipstreet,
            shipaddline2: req.body.shipaddline2,
            shiptown: req.body.shiptown,
            shipcounty: req.body.shipcounty,
            shipeircode: req.body.shipeircode
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
 
//Return all Quotations in the database
// exports.findAll = (req, res) => {
//     console.log("Return all Customers in the database")
//     return res.status(200).send({
//         message: "Return all Customers in the database"
//     });
// };

// Return all Customers in the database
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

// // Update a Customer identified by the quotationId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Customer content cannot be empty"
        });
    }

     // Find the Customer and update it with the request body
     Customer.findByIdAndUpdate(req.params.customerId, {
         fname: req.body.fname, 
         sname: req.body.sname,
         //mobile: req.body.mobile
     }, 
        { new: true })  // "new: true" return updated object
     .then(customer => {
         if(!customer) {
             return res.status(404).send({
                 message: "Customer not found with id " + req.params.customerId
             });
         }
         res.send(customer);
     }).catch(err => {
         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
             return res.status(404).send({
                 message: "Customer not found with id " + req.params.customerId
             });                
         }
         return res.status(500).send({
             message: "Error updating Customer with id " + req.params.customerId
         });
     });
     console.log("Customer updated successfully!");
 };

// Delete a Quotation identified by quotationId
exports.delete = (req, res) => {
    console.log("got to here");
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
};

// // Delete a Quotation identified by quotationId
// exports.delete = (req, res) => {
//     Customer.findByIdAndRemove(req.params.customerId)
//     .then(customer => {
//         if(!customer) {
//             return res.status(404).send({
//                 message: "Customer not found with id " + req.params.customerId
//             });
//         }
//         res.send({message: "Customer deleted successfully!"});
//     }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "Customer not found with id " + req.params.customerId
//             });                
//         }
//         return res.status(500).send({
//             message: "Could not delete Customer with id " + req.params.customerId
//         });
//     });
//     console.log("Customer deleted successfully!");
//};