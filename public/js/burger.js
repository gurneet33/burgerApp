$(".delete").on("click", function (event) {
    // Get the ID from the button.
    // This is shorthand for $(this).attr("data-planid")
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/burgers/" + id, {
        type: "DELETE"
    }).then(
        function () {
            console.log("deleted id ", id);
            // Reload the page to get the updated list
            location.reload();
        }
    );
});

$("#createburger").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    // [name=plan] will find an element with a "name" attribute equal to the string "plan"
    var newBurger = {
        burger: $("#createburger [name=burg]").val().trim()
    };

    // Send the POST request.
    $.ajax("/burger", {
        type: "POST",
        data: newBurger
    }).then(
        function () {
            console.log("created new burger");
            // Reload the page to get the updated list
            location.reload();
        }
    );
});