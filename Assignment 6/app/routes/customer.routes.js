module.exports = (app) => {
    const customers = require('../controllers/customer.controllers.js');
 
    // Create a new Customer
    app.post('/customers', customers.create);
 
    // Retrieve all Customers
    app.get('/customers', customers.findAll);
 
    // // Retrieve a single Quotation specified by quotationId
    // app.get('/quotations/:quotationId', quotations.findOne);
 
    // Update a Quotation specified by quotationId
    app.put('/customers/:customerId', customers.update);
 
    // Delete a Quotation specified by quotationId
    app.delete('/customers/:customerId', customers.delete);
}