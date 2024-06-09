// Get the objects we need to modify
let updateGradeForm = document.getElementById('updateGrade');

// Modify the objects we need
updateGradeForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let gradeId = document.getElementById("gradeId");
    let studentId = document.getElementById("updateStudentId");
    let courseId = document.getElementById("updateCourseId");
    let grade = document.getElementById("updateGrade");

    // Get the values from the form fields
    let gradeIdValue = gradeId.value;
    let studentIdValue = studentId.value;
    let courseIdValue = courseId.value;
    let gradeValue = grade.value;

    // Put our data we want to send in a javascript object
    let data = {
        z: gradeIdValue,
        a: studentIdValue,
        b: courseIdValue,
        c: gradeValue
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateGrade", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update the row in the table
            updateRow(xhttp.response, gradeIdValue);
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

function updateRow(data, z) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("gradeTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // Iterate through rows
        if (table.rows[i].getAttribute("data-value") == z) {
            // Get the location of the row where we found the matching grade ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Update the relevant td elements
            updateRowIndex.getElementsByTagName("td")[1].innerHTML = parsedData[0].a;
            updateRowIndex.getElementsByTagName("td")[2].innerHTML = parsedData[0].b;
            updateRowIndex.getElementsByTagName("td")[3].innerHTML = parsedData[0].c;
        }
    }
}