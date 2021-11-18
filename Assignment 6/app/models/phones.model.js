const mongoose = require('mongoose');
 
// create a mongoose schema for an order
const PhoneSchema = mongoose.Schema({
    Manufacturer : String,
    Model : String,
    Price : String
}, {
    timestamps: true
});
// export the model to our app
module.exports = mongoose.model('Phone', PhoneSchema);
