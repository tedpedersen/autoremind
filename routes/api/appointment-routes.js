const router = require('express').Router()
const db = require('../../models')

// GET /api/appointments
router.get('/', (req, res) => {
  console.log(req.body)
  res.json('Get all appointments')
})

// GET /api/appointments/:id
router.get('/:id', (req, res) => {
  console.log(req.body)
  res.json(`Get appointment id ${req.param.id}`)
})

// POST /api/appointments
router.post('/', (req, res) => {
  console.log(req.body)
  console.log('Creating an appointment')
  db.Appointment.create(req.body).then(dbAppointmentSchema => {
    res.json(dbAppointmentSchema)
  })
})

// PUT /api/appointments/:id
router.put('/:id', (req, res) => {
  console.log("updating an appointment")
})

// DELETE /api/appointments/:id
router.delete('/:id', (req, res) => {
  console.log(req.body)
  console.log('Deleting an appointment')
})

//Change routes to this --> api/appointments/:month/:id
//we only want 1 month of data

module.exports = router
