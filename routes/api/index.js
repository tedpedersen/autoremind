const router = require('express').Router()

const appointmentRoutes = require('./appointment-routes.js')

router.use('/appointments', appointmentRoutes)

module.exports = router
