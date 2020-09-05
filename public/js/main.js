let selectDate = '';

$(".edit-button").click(function () {
    selectDate = $(this).siblings(".date-value").text();
    $('#editModal').modal('show');
    $('#exampleModalLabel').text(`Edit Reminders For ${selectDate}`);
    console.log(selectDate);
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
    console.log(clientName, clientTime);

    fetch('http://localhost:3001/api/appointments', {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: clientName,
            time: clientTime,
            date: selectDate,
            id: Date.now()
        })
    }).then(res => res.text()).then(res => {
        console.log(res);
        //clear when submitted
        $('#clientNameInput, #clientTimeInput').val("");
        $("#newAppointment").addClass("hide");
        $(`<tr>
            <td>${clientName}</td>
            <td>${clientTime}</td>
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
    })
});

//Edit Button onclick
const addEditButtonClickListener = () => {
    $(".edit-appt-button").click(function () {
        $(this).addClass("hide");
        $(this).siblings(".delete-appt-button").addClass("hide");
        $(this).siblings(".save-edit-appt-button").removeClass("hide");
        $(this).siblings(".cancel-edit-appt-button").addClass("hide");
        $(".name-input").removeAttr("readonly");
        $(".date-input").removeAttr("readonly");
    });
};
addEditButtonClickListener();

//Save Button onclick
const addSaveButtonClickListener = () => {
    $(".save-edit-appt-button").click(function () {
        $(this).siblings(".edit-appt-button").removeClass("hide");
        $(this).siblings(".delete-appt-button").removeClass("hide");
        $(this).addClass("hide");
        $(this).siblings(".cancel-edit-appt-button").addClass("hide");
        $(this).siblings(".name-input").attr("readonly");
        $(this).siblings(".date-input").attr("readonly");
    });
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
    });
};
addCancelButtonClickListener();
