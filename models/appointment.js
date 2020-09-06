'use strict'

const moment = require('moment')
const cfg = require('../cfg')
const Twilio = require('twilio')

const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class AppointmentSchema extends Model {
  testThisFunction () {
    console.log('I was called')
  }
}

AppointmentSchema.staticFunction = function () {
  console.log('Static called')
}

AppointmentSchema.getAppointments = function (callback) {
  // now
  console.log('getAppointments called')

  const searchDate = new Date()
  AppointmentSchema.findAll().then(function (appointments) {
    // console.log(appointments)
    appointments = appointments.filter(function (appointment) {
      return requiresNotification(appointment, searchDate)
    })
    if (appointments.length > 0) {
      sendNotifications(appointments)
    }
  })

  /**
   * Send messages to all appoinment owners via Twilio
   * @param {array} appointments List of appointments.
   */
  function sendNotifications (appointments) {
    const client = new Twilio(cfg.twilioAccountSid, cfg.twilioAuthToken)
    appointments.forEach(function (appointment) {
      // Create options to send the message
      const options = {
        to: `+ ${appointment.phoneNumber}`,
        from: cfg.twilioPhoneNumber,
        /* eslint-disable max-len */
        body: `Hi ${appointment.name}. Just a reminder that you have an appointment coming up.`
        /* eslint-enable max-len */
      }

      // Send the message!
      client.messages.create(options, function (err, response) {
        if (err) {
          // Just log it for now
          console.error(err)
        } else {
          // Log the last few digits of a phone number
          let masked = appointment.phoneNumber.substr(
            0,
            appointment.phoneNumber.length - 5
          )
          masked += '*****'
          console.log(`Message sent to ${masked}`)
        }
      })
      appointment
        .update(
          {
            notification: -1
          },
          {
            where: {
              name: appointment.id
            }
          }
        )
        .then(appnt => {
          if (!appnt) {
            res.status(404).json({ message: 'no appnt with that name' })
            return
          }
        })
        .catch(err => {
          console.log(err)
        })
    })

    // Don't wait on success/failure, just indicate all messages have been
    // queued for delivery
    if (callback) {
      callback.call()
    }
  }
}

const requiresNotification = function (appointment, date) {
  let appntTime = moment(appointment.time).utc()
  let sTime = moment(date).utc()
  let diff = moment.duration(appntTime.diff(sTime)).asHours()
  console.log(`requires notification appntTime: ${appntTime}`)
  console.log(`requires notification sTime: ${sTime}`)
  console.log(`requires notification diff: ${diff}`)

  let timeDiff = Math.round(
    moment
      .duration(
        moment(appointment.time)
          .utc()
          .diff(moment(date).utc())
      )
      .asHours()
  )
  return timeDiff >= 1 && timeDiff <= appointment.notification
}

AppointmentSchema.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        len: [1]
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'phone_number',
      validate: {
        len: [1]
      }
    },
    notification: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    timeZone: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'time_zone',
      validate: {
        len: [1]
      }
    },
    time: { type: DataTypes.DATE }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'appointment'
  }
)
module.exports = AppointmentSchema
