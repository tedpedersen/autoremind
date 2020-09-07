const router = require('express').Router()
const { Appointment } = require('../models')

router.get('/', (req, res) => {
  console.log(req.session)

  res.render('index', {
    //add something for testes
    success: true
  })
})

router.get('/calendar', (req, res) => {
  console.log(req.session)

  //get all Appointment
  Appointment.findAll({})
    .then(allAppointments => {
      console.log('anything', allAppointments)
      const dateAppointments = {}
      allAppointments.forEach(function (appointment) {
        console.log(appointment.time);
        var appointmentDate = `SEPT${appointment.time.getDate()}`
        if (!dateAppointments[appointmentDate]) {
          dateAppointments[appointmentDate] = []
        }
        dateAppointments[appointmentDate].push(appointment)
      })

      res.render('calendar', {
        dateAppointments,
        totalCount: allAppointments.length
      })
    })
    .catch(err => {
      console.log(err)
    });
})

//login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  res.render('login')
})

module.exports = router
