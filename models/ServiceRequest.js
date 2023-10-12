const mongoose = require('mongoose');
const ServiceRequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    stationId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceStation' },
    requestType: String, // E.g., "General Service," "Engine Service"
    requestTime: Date,
    status: String, // E.g., "Pending," "Accepted," "Completed"
});

const ServiceRequest = mongoose.model('ServiceRequest', ServiceRequestSchema);

module.exports = ServiceRequest;
