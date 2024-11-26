const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    fullAddress: {
        type: String,
        required: true
    }
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;