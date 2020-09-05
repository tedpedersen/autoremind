'use strict'

const Appointment = require('../models/appointment')

const notificationWorkerFactory = function () {
  return {
    run: function () {
      Appointment.getAppointments()
      // Appointment.staticFunction()
    }
  }
}

module.exports = notificationWorkerFactory()
