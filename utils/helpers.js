module.exports = {
    getDateAppointmentCount: (dateAppointments, date) => {
        return !dateAppointments[date] ? 0 : dateAppointments[date].length
    }
}