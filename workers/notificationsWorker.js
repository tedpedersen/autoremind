'use strict'

const Appointment = require('../models/Appointment')

const notificationWorkerFactory = function () {
  return {
    run: function () {
      Appointment.getAppointments()
      // Appointment.staticFunction()
    }
  }
}

module.exports = notificationWorkerFactory()
