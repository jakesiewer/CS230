module.exports = (app) => {
    const customers = require('../controllers/customer.controllers.js');
 
    // Default message for /
    app.get('/', customers.findCustomers);

    // Create a new Customer
    app.post('/customers', customers.create);

    // Update a Customer specified by customerId
    app.put('/customers/:customerId', customers.update);
 
    // Retrieve all Customers
    app.get('/customers', customers.findAll);
 
    // // // Retrieve a single Quotation specified by quotationId
    // // app.get('/quotations/:quotationId', quotations.findOne);
 
    // Delete a Quotation specified by quotationId
    app.delete('/customers/:customerId', customers.delete);

    
    // /*  == USER INTERFACE ADDITIONS == */
    // // Search for Quotations matching s
    // app.get('/fname/:s', customers.searchFirstname); 
    // app.get('/sname/:s', customers.searchSurname); 
    // /*  == USER INTERFACE ADDITIONS == */
}