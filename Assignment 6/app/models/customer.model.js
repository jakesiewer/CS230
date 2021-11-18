const mongoose = require('mongoose');
 
// create a mongoose schema for a quotation
const CustomerSchema = mongoose.Schema({
    title : String,
    fname: String,
    sname: String,
    email: String,
    mobile: String,
    HomeAddress: {
        street: String,
        addline2: String,
        town: String,
        county: String,
        eircode: String
    },
    ShippingAddress: {
        street: String,
        addline2: String,
        town: String,
        county: String,
        eircode: String
    }
}, {
    timestamps: true
});
// export the model to our app
module.exports = mongoose.model('Customer', CustomerSchema);
