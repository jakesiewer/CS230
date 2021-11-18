const mongoose = require('mongoose');
 
// create a mongoose schema for an order
const OrderSchema = mongoose.Schema({
    CustomerID : String,
    Receipt: {
        Item1: String,
        Item2: String,
        Item3: String,
        Item4: String,
        Item5: String
    }
}, {
    timestamps: true
});
// export the model to our app
module.exports = mongoose.model('Order', OrderSchema);
