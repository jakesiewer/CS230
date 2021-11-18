module.exports = (app) => {
    const phones = require('../controllers/phones.controllers.js');
 
    // Create a new order
    app.post('/phones', phones.create);
 
    // Retrieve all orders
    app.get('/phones', phones.findAll);
 
    // // Retrieve a single order specified by orderId
    // app.get('/quotations/:quotationId', quotations.findOne);
 
    // Update an order specified by quotationId
    app.put('/phone/:phoneID', phones.update);
 
    // Delete an order specified by orderId
    app.delete('/phones/:phoneID', phones.delete);
}