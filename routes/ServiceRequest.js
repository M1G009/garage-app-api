var express = require('express');
var router = express.Router();
const ServiceRequest = require('../models/ServiceRequest');


router.post('/requests', async (req, res) => {
  try {
    const { userId, stationId, requestType, requestTime } = req.body;
    const request = new ServiceRequest({ userId, stationId, requestType, requestTime, status: 'Pending' });
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a service request' });
  }
});

router.put('/requests/accept/:id', async (req, res) => {
  try {
    const requestId = req.params.id;
    const stationId = req.body.stationId; // You can include the stationId in the request body for validation
    const request = await ServiceRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ error: 'Service request not found' });
    }

    // Ensure that the request is associated with the station attempting to accept it
    if (request.stationId.toString() !== stationId) {
      return res.status(403).json({ error: 'Unauthorized: The request does not belong to your station.' });
    }

    if (request.status === 'Accepted') {
      return res.status(400).json({ error: 'Service request already accepted' });
    }

    request.status = 'Accepted';
    request.scheduledTime = new Date(); // Set the scheduled time as needed
    await request.save();

    res.json({ message: 'Service request accepted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to accept the service request' });
  }
});

module.exports = router;
