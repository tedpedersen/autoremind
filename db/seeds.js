const { Appointment } = require('../models')

Appointment.bulkCreate([
  {
    id: 1,
    name: 'MukulS',
    phoneNumber: '+14085949964',
    notification: 24,
    timeZone: 'America/Los_Angeles|PST PDT',
    time: '2020-09-04 10:00:00'
  }
])
  .then(apt => {
    console.log('apt create', apt)
  })
  .catch(err => {
    console.log('Err', err)
  })
