// Get the objects we need to modify. Based on the u.students.js file but refocused for courses.
let updateCourseForm = document.getElementById('updateCourse');

// Modify the objects we need
updateCourseForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let courseId = document.getElementById("updateCourseID");
    let courseName = document.getElementById("updateCourseName");
    let courseCode = document.getElementById("updateCourseCode");

    // Get the values from the form fields
    let courseIdValue = courseId.value;
    let courseNameValue = courseName.value;
    let courseCodeValue = courseCode.value;

    // Put our data we want to send in a javascript object
    let data = {
        z: courseIdValue,
        a: courseNameValue,
        b: courseCodeValue
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateCourse", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update the row in the table
            updateRow(xhttp.response, courseIdValue);
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

function updateRow(data, z) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("courseTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // Iterate through rows
        if (table.rows[i].getAttribute("data-value") == z) {
            // Get the location of the row where we found the matching course ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Update the relevant td elements
            updateRowIndex.getElementsByTagName("td")[1].innerHTML = parsedData[0].a;
            updateRowIndex.getElementsByTagName("td")[2].innerHTML = parsedData[0].b;
        }
    }
}
