const mongoose = require('mongoose');
const serviceRatingSchema = new mongoose.Schema({
    stationId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceStation' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number, // A numerical rating (e.g., 1 to 5)
    comment: String, // An optional comment or review
});

const ServiceRating = mongoose.model('ServiceRating', serviceRatingSchema);

module.exports = ServiceRating;
