var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ServiceStation = require('../models/ServiceStation');

// Service station registration
router.post('/stations', async (req, res) => {
    try {
        const { name, location, rating, services } = req.body;
        const station = new ServiceStation({ name, location, rating, services });
        await station.save();
        res.status(201).json(station);
    } catch (error) {
        res.status(400).json({ error: 'Failed to register service station' });
    }
});

router.post('/stations/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const station = await ServiceStation.findOne({ username });
        if (!station) {
            return res.status(401).json({ error: 'Invalid login credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, station.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid login credentials' });
        }
        const token = jwt.sign({ stationId: station._id }, 'your-secret-key'); // Generate a token for the station
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;
