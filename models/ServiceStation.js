const mongoose = require('mongoose');
const serviceStationSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    name: String,
    location: String,
    rating: Number,
    services: [String],
    contact: {
        phone: String,
        email: String,
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
    },
});

const ServiceStation = mongoose.model('ServiceStation', serviceStationSchema);

module.exports = ServiceStation;
