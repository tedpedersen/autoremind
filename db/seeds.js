const { Appointment } = require('../models')

Appointment.bulkCreate([
  {
    id: 1,
    name: 'JohnDoe',
    phoneNumber: '+14081231234',
    notification: 24,
    timeZone: 'America/Los_Angeles|PST PDT',
    time: '2020-09-07 10:00:00'
  }
])
  .then(apt => {
    console.log('apt create', apt)
  })
  .catch(err => {
    console.log('Err', err)
  })
