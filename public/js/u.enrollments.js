// Get the objects we need to modify
let updateEnrollmentForm = document.getElementById('updateEnrollment');

// Modify the objects we need
updateEnrollmentForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let enrollmentId = document.getElementById("updateEnrollmentID");
    let enrollmentStartDate = document.getElementById("updateEnrollmentStartDate");
    let enrollmentEndDate = document.getElementById("updateEnrollmentEndDate");

    // Get the values from the form fields
    let enrollmentIdValue = enrollmentId.value;
    let enrollmentStartDateValue = enrollmentStartDate.value;
    let enrollmentEndDateValue = enrollmentEndDate.value;

    // Put our data we want to send in a javascript object
    let data = {
        z: enrollmentIdValue,
        a: enrollmentStartDateValue,
        b: enrollmentEndDateValue
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateEnrollment", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update the row in the table
            updateRow(xhttp.response, enrollmentIdValue);
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

function updateRow(data, z) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("enrollmentTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // Iterate through rows
        if (table.rows[i].getAttribute("data-value") == z) {
            // Get the location of the row where we found the matching enrollment ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Update the relevant td elements
            updateRowIndex.getElementsByTagName("td")[2].innerHTML = parsedData[0].a;
            updateRowIndex.getElementsByTagName("td")[3].innerHTML = parsedData[0].b;
        }
    }
}
