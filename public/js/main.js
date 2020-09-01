
$(".edit-button").click(function() {
    const selectDate = $( this ).siblings(".date-value").text();
    $('#editModal').modal('show');
    $('#exampleModalLabel').text(`Edit Reminders For ${selectDate}`);
    console.log(selectDate);
});


