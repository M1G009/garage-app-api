var express = require('express');
var router = express.Router();
const ServiceRating = require("../models/ServiceRating");

// Add a service rating
router.post('/ratings', async (req, res) => {
    try {
        const { stationId, userId, rating, comment } = req.body;
        const serviceRating = new ServiceRating({ stationId, userId, rating, comment });
        await serviceRating.save();
        res.status(201).json(serviceRating);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add a service rating' });
    }
});

// Get service station details with ratings
router.get('/stations/:id', async (req, res) => {
    try {
        const stationId = req.params.id;
        const station = await ServiceStation.findById(stationId).populate('requests');
        if (!station) {
            return res.status(404).json({ error: 'Service station not found' });
        }
        const ratings = await ServiceRating.find({ stationId: stationId });
        const stationWithRatings = {
            ...station._doc,
            ratings: ratings,
        };
        res.json(stationWithRatings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve service station details' });
    }
});

module.exports = router;
