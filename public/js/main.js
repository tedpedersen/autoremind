let selectDate = ''; // 'SEPT 12'
let dateAppointments = {}
function getAllAppointments() {
    fetch('/api/appointments').then(res => res.json()).then((allAppointments) => {
        dateAppointments = {}
        allAppointments.forEach(function (appointment) {
            appointment.time = new Date(appointment.time)
            console.log(appointment.time);
            var appointmentDate = `SEPT${appointment.time.getDate()}`
            if (!dateAppointments[appointmentDate]) {
                dateAppointments[appointmentDate] = []
            }
            dateAppointments[appointmentDate].push(appointment)
        })
    });
}
getAllAppointments()

$(".edit-button").click(function () {
    selectDate = $(this).siblings(".date-value").text();
    $('#editModal').modal('show');
    $('#exampleModalLabel').text(`Edit Reminders For ${selectDate}`);
    console.log(selectDate);
    $('.clearExistingAppointments').remove();
    const selectedDateAppointments = dateAppointments[selectDate.replace(/\s+/, '')] || [];
    selectedDateAppointments.forEach(appointment => {
        $(`<tr class="clearExistingAppointments">
            <td>
                <div class="client-name" id="${appointment.id}">${appointment.name}</div>
                <input class="client-name-input hide form-control name-input" type="text" placeholder="Client Name"/>
            </td>
            <td>
                <div class="client-time">${appointment.time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</div>
              <!--  <input class="client-time-input hide form-control time-input" type="text" placeholder="Time"/> -->

                <select class="selectpicker hide client-time-input">
                <option value="0">12 AM</option>
                <option value="1">1 AM</option>
                <option value="2">2 AM</option>
                <option value="3">3 AM</option>
                <option value="4">4 AM</option>
                <option value="5">5 AM</option>
                <option value="6">6 AM</option>
                <option value="7">7 AM</option>
                <option value="8">8 AM</option>
                <option value="9">9 AM</option>
                <option value="10">10 AM</option>
                <option value="11">11 AM</option>
                <option value="12">12 PM</option>
                <option value="13">1 PM</option>
                <option value="14">2 PM</option>
                <option value="15">3 PM</option>
                <option value="16">4 PM</option>
                <option value="17">5 PM</option>
                <option value="18">6 PM</option>
                <option value="19">7 PM</option>
                <option value="20">8 PM</option>
                <option value="21">9 PM</option>
                <option value="22">10 PM</option>
                <option value="23">11 PM</option>
                </select>

            </td>
            <td>
                <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                    <button type="button" class="btn btn-secondary edit-appt-button">EDIT</button>
                    <button type="button" class="hide btn btn-secondary save-edit-appt-button">SAVE</button>
                    <button type="button" class="hide btn btn-secondary cancel-edit-appt-button">CANCEL</button>
                    <button type="button" class="btn btn-secondary delete-appt-button">DELETE</button>
                </div>
            </td>
        </tr>`).insertAfter("#newAppointment");
    })
    addEditButtonClickListener();
    addSaveButtonClickListener();
    addCancelButtonClickListener();
    deleteButton();
});

$("#addReminder").click(function () {
    console.log('add reminder clicked');
    $("#newAppointment").toggleClass("hide");
    // const selectDate = $( this ).siblings(".date-value").text();
    // $('#editModal').modal('show');
    // $('#exampleModalLabel').text(`Edit Reminders For ${selectDate}`);
    // console.log(selectDate);
});

$("#saveNewAppointmentBtn").click(function () {
    const clientName = $('#clientNameInput').val();
    const clientTime = $('#clientTimeInput').val();
    console.log(selectDate);
    const clientDay = selectDate.split(/\s+/)[1];
    console.log(clientName, clientTime, clientDay);

    fetch('/api/appointments', {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: clientName,
            phoneNumber: "5555555555",
            notification: 5,
            timeZone: "PDT",
            time: new Date(`September ${clientDay}, 2020 ${clientTime}:00:00`)
        })
    }).then(res => res.json()).then(appointment => {
        console.log(appointment);
        //clear when submitted
        $('#clientNameInput, #clientTimeInput').val("");
        $("#newAppointment").addClass("hide");
        $(`<tr class="clearExistingAppointments">
            <td>
                <div class="client-name" id="${appointment.id}">${appointment.name}</div>
                <input class="client-name-input hide form-control name-input" type="text" placeholder="Client Name"/>
            </td>
            <td>
                <div class="client-time">${new Date(appointment.time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</div>
             <!-- <input class="client-time-input hide form-control time-input" type="text" placeholder="Time"/> -->

             <select class="selectpicker hide client-time-input">
             <option value="0">12 AM</option>
             <option value="1">1 AM</option>
             <option value="2">2 AM</option>
             <option value="3">3 AM</option>
             <option value="4">4 AM</option>
             <option value="5">5 AM</option>
             <option value="6">6 AM</option>
             <option value="7">7 AM</option>
             <option value="8">8 AM</option>
             <option value="9">9 AM</option>
             <option value="10">10 AM</option>
             <option value="11">11 AM</option>
             <option value="12">12 PM</option>
             <option value="13">1 PM</option>
             <option value="14">2 PM</option>
             <option value="15">3 PM</option>
             <option value="16">4 PM</option>
             <option value="17">5 PM</option>
             <option value="18">6 PM</option>
             <option value="19">7 PM</option>
             <option value="20">8 PM</option>
             <option value="21">9 PM</option>
             <option value="22">10 PM</option>
             <option value="23">11 PM</option>
                </select>


            </td>
            <td>
                <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                    <button type="button" class="btn btn-secondary edit-appt-button">EDIT</button>
                    <button type="button" class="hide btn btn-secondary save-edit-appt-button">SAVE</button>
                    <button type="button" class="hide btn btn-secondary cancel-edit-appt-button">CANCEL</button>
                    <button type="button" class="btn btn-secondary delete-appt-button">DELETE</button>
                </div>
            </td>
        </tr>`).insertAfter("#newAppointment");
        addEditButtonClickListener();
        addSaveButtonClickListener();
        addCancelButtonClickListener();
        deleteButton();
        getAllAppointments();

        const selectedElement = $(`.date-value`).filter(function () {
            return $(this).text() === selectDate;
        });
        const beforeCount = selectedElement.siblings(`.reminder-count`).text();
        console.log(beforeCount);
        selectedElement.siblings(`.reminder-count`).text(parseInt(beforeCount) + 1);
        console.log(selectedElement.siblings(`.reminder-count`).text());
    })
});

//Edit Button onclick
const addEditButtonClickListener = () => {
    $(".edit-appt-button").click(function () {
        $(this).addClass("hide");
        $(this).siblings(".delete-appt-button").addClass("hide");
        $(this).siblings(".save-edit-appt-button").removeClass("hide");
        $(this).siblings(".cancel-edit-appt-button").removeClass("hide");
        $(".name-input").removeAttr("readonly");
        $(".date-input").removeAttr("readonly");
        $(this).parents().eq(1).siblings().find('.client-name-input, .client-name, .client-time-input, .client-time').toggleClass('hide');
    });
};
addEditButtonClickListener();

//Save Button onclick
const addSaveButtonClickListener = () => {
    $(".save-edit-appt-button").click(function () {
        const clientName = $(this).parents().eq(1).siblings().find('.client-name-input').val();
        const clientTime = $(this).parents().eq(1).siblings().find('.client-time-input').val();
        console.log(selectDate);
        const clientDay = selectDate.split(/\s+/)[1];
        console.log(clientName, clientTime, clientDay);

        const id = $(this).parents().eq(1).siblings().find('.client-name').attr('id')
        fetch(`/api/appointments/${id}`, {
            method: 'put',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: clientName,
                phoneNumber: "5555555555",
                notification: 5,
                timeZone: "PDT",
                time: new Date(`September ${clientDay}, 2020 ${clientTime}:00:00`)
            })
        }).then(res => res.json()).then(res => {
            $(this).siblings(".edit-appt-button").removeClass("hide");
            $(this).siblings(".delete-appt-button").removeClass("hide");
            $(this).addClass("hide");
            $(this).siblings(".cancel-edit-appt-button").addClass("hide");
            $(this).siblings(".name-input").attr("readonly");
            $(this).siblings(".date-input").attr("readonly");
            $(this).parents().eq(1).siblings().find('.client-name').text(clientName)

            const clientDay = selectDate.split(/\s+/)[1];
            const clientAppointmentDate = new Date (`September ${clientDay}, 2020 ${clientTime}:00:00`).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            $(this).parents().eq(1).siblings().find('.client-time').text(clientAppointmentDate)
            console.log(res);

            //clear when submitted
            $(this).parents().eq(1).siblings().find('.client-name-input, .client-name, .client-time-input, .client-time').toggleClass('hide');
            getAllAppointments();
        });
    })
};
addSaveButtonClickListener();


//Cancel Button onclick
const addCancelButtonClickListener = () => {
    $(".cancel-edit-appt-button").click(function () {
        $(this).siblings(".edit-appt-button").removeClass("hide");
        $(this).siblings(".delete-appt-button").removeClass("hide");
        $(this).siblings(".save-edit-appt-button").addClass("hide");
        $(this).addClass("hide");
        $(this).siblings(".name-input").attr("readonly");
        $(this).siblings(".date-input").attr("readonly");
        $(this).parents().eq(1).siblings().find('.client-name-input, .client-name, .client-time-input, .client-time').toggleClass('hide');
    });
};
addCancelButtonClickListener();

//Delete Button onclick
const deleteButton = () => {
    $(".delete-appt-button").click(function () {
        const id = $(this).parents().eq(1).siblings().find('.client-name').attr('id')
        fetch(`/api/appointments/${id}`, {
            method: 'delete'
        }).then(res => res.json()).then(res => {
            $(this).parents().eq(2).remove();
            console.log(res);

            const selectedElement = $(`.date-value`).filter(function () {
                return $(this).text() === selectDate;
            });
            const beforeCount = selectedElement.siblings(`.reminder-count`).text();
            console.log(beforeCount);
            selectedElement.siblings(`.reminder-count`).text(parseInt(beforeCount) - 1);
            console.log(selectedElement.siblings(`.reminder-count`).text());
            getAllAppointments();
        });
    })
};
deleteButton();
