
$(".edit-button").click(function() {
    const selectDate = $( this ).siblings(".date-value").text();
    $('#editModal').modal('show');
    $('#exampleModalLabel').text(`Edit Reminders For ${selectDate}`);
    console.log(selectDate);
});

$(".edit-appt-button").click(function(){
    $(".edit-appt-button").addClass("hide");
    $(".delete-appt-button").addClass("hide");
    $(".save-edit-appt-button").removeClass("hide");
    $(".cancel-edit-appt-button").addClass("hide");
    $(".name-input").removeAttr("readonly");
    $(".date-input").removeAttr("readonly");
});

$(".save-edit-appt-button").click(function(){
    /* osborn - send the data here */
    $(".edit-appt-button").removeClass("hide");
    $(".delete-appt-button").removeClass("hide");
    $(".save-edit-appt-button").addClass("hide");
    $(".cancel-edit-appt-button").addClass("hide");
    $(".name-input").attr("readonly");
    $(".date-input").attr("readonly");
});

$(".cancel-edit-appt-button").click(function(){
    $(".edit-appt-button").removeClass("hide");
    $(".delete-appt-button").removeClass("hide");
    $(".save-edit-appt-button").addClass("hide");
    $(".cancel-edit-appt-button").addClass("hide");
    $(".name-input").attr("readonly");
    $(".date-input").attr("readonly");
});


