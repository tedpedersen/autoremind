const router = require('express').Router()

const appointmentRoutes = require('./appointment-routes.js')
const userRoutes = require('./user-routes')
router.use('/appointments', appointmentRoutes)
router.use('/users', userRoutes)

module.exports = router
