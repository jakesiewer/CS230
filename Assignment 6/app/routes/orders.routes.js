module.exports = (app) => {
    const orders = require('../controllers/orders.controllers.js');
 
    // Create a new order
    app.post('/orders', orders.create);
 
    // Retrieve all orders
    app.get('/orders', orders.findAll);
 
    // // // Retrieve a single order specified by orderId
    // // app.get('/quotations/:quotationId', quotations.findOne);
 
    // Update an order specified by quotationId
    app.put('/orders/:orderID', orders.update);
 
    // Delete an order specified by orderId
    app.delete('/orders/:orderID', orders.delete);
}