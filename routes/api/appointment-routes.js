
const router = require('express').Router()
// const db = require('../../models')

const appointments = []

// GET /api/appointments
router.get('/', (req, res) => {
  res.json(appointments)
})

// GET /api/appointments/:id
router.get('/:id', (req, res) => {
  var findAppointment = appointments.find(function (appointment) {
    return appointment.id === req.params.id
  });
  if (findAppointment) {
    console.log('Appointment found');
    res.json(findAppointment)
  } else {
    res.status(400).send('Can not find appointment')
  }
})

// POST /api/appointments
router.post('/', (req, res) => {
  appointments.push(req.body)
  res.json(appointments)
  // db.Appointment.create(req.body).then(dbAppointmentSchema => {
  //   res.json(dbAppointmentSchema)
  // })
})

// PUT /api/appointments/:id
router.put('/:id', (req, res) => {
  var findAppointmentIndex = appointments.findIndex(function (appointment) {
    return appointment.id === req.params.id
  });
  if (findAppointmentIndex > -1) {
    appointments[findAppointmentIndex] = req.body
    res.json(appointments[findAppointmentIndex])
  } else {
    res.status(400).send('Can not find appointment')
  }
})

// DELETE /api/appointments/:id
router.delete('/:id', (req, res) => {
  var findAppointmentIndex = appointments.findIndex(function (appointment) {
    return appointment.id === req.params.id
  });
  if (findAppointmentIndex > -1) {
    appointments.splice(findAppointmentIndex, 1)
    res.json(appointments)
  } else {
    res.status(400).send('Can not find appointment')
  }
})


module.exports = router
