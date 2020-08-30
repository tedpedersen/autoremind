const router = require('express').Router()
const { db } = require('../../models')

// GET /api/appointments
router.get('/', (req, res) => {
  console.log(req.body)
  res.json('Hello World')
})

// GET /api/appointments
router.get('/:id', (req, res) => {
  console.log(req.body)
  res.json('Hello World GET')
})

// POST /api/appointments
router.post('/api/appointments', (req, res) => {
  console.log(req.body)
  db.AppointmentSchema.create(req.body).then(dbAppointmentSchema => {
    res.json(dbAppointmentSchema)
  })
})

// PUT /api/appointments
router.put('/:id', (req, res) => {})

// DELETE /api/appointments
router.delete('/:id', (req, res) => {
  console.log(req.body)
})

module.exports = router
