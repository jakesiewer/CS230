const Order = require('../models/orders.model.js');

/*  == USER INTERFACE ADDITIONS == */
// Default message for / (get)
exports.root = (req, res) => {
    phone.find()
    .then(phones => {
        res.render('phones_view',{
            results: phones
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Phones."
        });
    });
};

// Create a new Quotation and save to the database
// Create and Save a new Quotation
exports.create = (req, res) => {
    //Validate the request
    if(!req.body.CustomerID || !req.body.Receipt.Item1) {
        return res.status(400).send({
            message: "Order content cannot be empty!"
        });
    }

    // Create a new Order (using schema)
    const order = new Order({
        CustomerID: req.body.CustomerID,
        Receipt: {
            Item1: req.body.Receipt.Item1,
            Item2: req.body.Receipt.Item2,
            Item3: req.body.Receipt.Item3,
            Item4: req.body.Receipt.Item4,
            Item5: req.body.Receipt.Item5
        }
    });

    // Save Order in the database
    order.save()
    .then(data => {
        /*  == USER INTERFACE ADDITIONS == */
        // res.redirect('/');
        /*  == USER INTERFACE ADDITIONS == */
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Order."
        });
    });
    console.log("Order created successfully!");
};

// Return all Quotations in the database
exports.findAll = (req, res) => {
    Order.find()
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Orders."
        });
    });
    console.log("Orders found successfully!");
};

// Update a Quotation identified by the quotationId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Order content cannot be empty"
        });
    }
    console.log()
    // Find the Quotation and update it with the request body
    Order.findByIdAndUpdate(req.params.orderID, {
        CustomerID: req.body.CustomerID,
        Receipt: {
            Item1: req.body.Receipt.Item1,
            Item2: req.body.Receipt.Item2,
            Item3: req.body.Receipt.Item3,
            Item4: req.body.Receipt.Item4,
            Item5: req.body.Receipt.Item5
        }
    }, 
       { new: true })  // "new: true" return updated object
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderID
            });
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderID
            });                
        }
        return res.status(500).send({
            message: "Error updating Order with id " + req.params.orderID
        });
    });
    console.log("Order updated successfully!");
};
 
// Delete a Quotation identified by quotationId
exports.delete = (req, res) => {
    Order.findByIdAndRemove(req.params.orderID)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderID
            });
        }
        res.send({message: "Order deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderID
            });                
        }
        return res.status(500).send({
            message: "Could not delete Order with id " + req.params.orderID
        });
    });
    console.log("Order deleted successfully!");
};