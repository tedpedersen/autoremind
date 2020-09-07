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
      res.status(400).send({
        error: err
      })
    })
})

// GET /api/appointments/:id
router.get('/:id', (req, res) => {
  console.log('GET /api/appointments/:id')
  const id = req.params.id
  Appointment.findOne({
    where: { id: id }
  })
    .then(app => {
      console.log('anything', app)
      res.json(app)
    })
    .catch(err => {
      console.log(err)
      res.status(400).send({
        error: err
      })
    })
})

// POST /api/appointments
router.post('/', (req, res) => {
  console.log(req.body)
  Appointment.create(req.body)
    .then(app => {
      console.log('POST /api/appointments')
      res.json(app)
    })
    .catch(err => {
      console.log(err)
      res.status(400).send({
        error: err
      })
    })
})

// PUT /api/appointments/:id = updates
router.put('/:id', (req, res) => {
  console.log(req.body)
  const id = req.params.id
  Appointment.findOne({ where: { id: id } })
    .then(appointment => {
      console.log(appointment);
      appointment.update(req.body)
        .then(updatedAppointment => {
          console.log('PUT /api/appointments', updatedAppointment)
          res.json(updatedAppointment)
        })
        .catch(err => {
          res.status(400).send({
            error: err
          })
        })
    })
    .catch(err => {
      console.log(err)
      res.status(400).send({
        error: err
      })
    })
})

// DELETE /api/appointments/:id
router.delete('/:id', (req, res) => {
  console.log(req.body)
  const id = req.params.id
  Appointment.destroy({
    where: { id: id }
  })
    .then(app => {
      console.log('delete successfully')
      res.status(200).send({ message: 'Successfully deleted' })
    })
    .catch(err => {
      console.log(err)
      res.status(400).send({
        error: err
      })
    })
})

module.exports = router
