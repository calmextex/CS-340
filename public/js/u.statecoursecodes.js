// Get the objects we need to modify. Based on the u.students.js file.
let updateStateCourseCodeForm = document.getElementById('updateCourseCode');

// Modify the objects we need
updateStateCourseCodeForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let stateCourseCodeId = document.getElementById("updateCourseCodeID");
    let subject = document.getElementById("updateCourseValue");

    // Get the values from the form fields
    let stateCourseCodeIdValue = stateCourseCodeId.value;
    let subjectValue = subject.value;

    // Put our data we want to send in a javascript object
    let data = {
        z: stateCourseCodeIdValue,
        a: subjectValue
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateStateCourseCode", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update the row in the table
            updateRow(xhttp.response, stateCourseCodeIdValue);
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

function updateRow(data, z) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("stateCourseCodeTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // Iterate through rows
        if (table.rows[i].getAttribute("data-value") == z) {
            // Get the location of the row where we found the matching state course code ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Update the relevant td elements
            updateRowIndex.getElementsByTagName("td")[1].innerHTML = parsedData[0].a;
        }
    }
}
