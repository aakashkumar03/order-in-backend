const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId:{
        type:Number,
        required:true
    },
    addressId:{
        type:Number,
        required:true
    },
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
    },
    isDefault:{
        type:String,
        default:false
    }
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;