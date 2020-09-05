const router = require('express').Router()
const { Appointment } = require('../../models')

// GET /api/appointments
router.get('/', (req, res) => {
  Appointment.findAll({})
    .then(app => {
      console.log('anything', app)
      // app.testThisFunction()
      res.json(app)
    })
    .catch(err => {
      console.log(err)
    })
})

// GET /api/appointments/:name
router.get('/:name', (req, res) => {
  console.log('GET /api/appointments/:name')
  const name = req.params.name
  Appointment.findOne({
    where: { name: name }
  })
    .then(app => {
      console.log('anything', app)
      res.json(app)
    })
    .catch(err => {
      console.log(err)
    })
})

// POST /api/appointments
router.post('/api/appointments', (req, res) => {
  console.log(req.body)
  Appointment.create(req.body)
    .then(app => {
      console.log('POST /api/appointments')
      res.json(app)
    })
    .catch(err => {
      console.log(err)
    })
})

// PUT /api/appointments ? Do we need it ?
router.put('/:id', (req, res) => {})

// DELETE /api/appointments/:id
router.delete('/:id', (req, res) => {
  console.log(req.body)
  Appointment.destroy(req.body)
    .then(app => {
      console.log('delete successfully')
      res.status(200).send({ message: 'Succesffully deleted' })
    })
    .catch(err => {
      console.log(err)
      res.status(400).send({
        error: err
      })
    })
})

module.exports = router
