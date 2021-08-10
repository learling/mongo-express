var express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get('/appointments', (req, res, _next) => {
  req.collection.find({}).toArray()
    .then(results => res.json(results))
    .catch(error => res.send(error));
});

router.post('/appointments', (req, res, _next) => {
  const { appointmentDate, name, email } = req.body;
  if (!appointmentDate || !name || !email) {
    return res.status(400).json({
      message: 'Appointment date, name and email are required'
    });
  }
  const payload = { appointmentDate, name, email };
  req.collection.insertOne(payload)
    .then(result => res.json(result))
    .catch(error => res.send(error));
});

router.delete('/appointments/:id', (req, res, _next) => {
  const { id } = req.params;
  const _id = ObjectId(id);
  req.collection.deleteOne({ _id })
    .then(result => res.json(result))
    .catch(error => res.send(error));
})

module.exports = router;
