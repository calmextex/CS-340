// Get the objects we need to modify
let updateStudentForm = document.getElementById('updateStudent');

// Modify the objects we need
updateStudentForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let studentId = document.getElementById("StudentId");
    let firstName = document.getElementById("updateFirstName");
    let lastName = document.getElementById("updateLastName");        
    let dob = document.getElementById("updateDOB" );
    let gradeLevel = document.getElementById("updateGradeLevel" );
    let entryDate = document.getElementById("updateEntryDate" );
    let leaveDate = document.getElementById("updateLeaveDate" );
    let email = document.getElementById("updateEmail" );
    let phoneNumber = document.getElementById("updatePhoneNumber" );
    let address = document.getElementById("updateAddress" );
    let city = document.getElementById("updateCity" );
    let state = document.getElementById("updateState" );
    let zipCode = document.getElementById("updateZipCode" );
    let parentGuardian = document.getElementById("updateParentGuardian" );

    // Get the values from the form fields
    let studentIdValue = studentId.value
    let firstNameValue = firstName.value;
    let lastNameValue = lastName.value;        
    let dobValue = dob.value;
    let gradeLevelValue = gradeLevel.value;
    let entryDateValue = entryDate.value;
    let leaveDateValue = leaveDate.value;
    let emailValue = email.value;
    let phoneNumberValue = phoneNumber.value;
    let addressValue = address.value;
    let cityValue = city.value;
    let stateValue = state.value;
    let zipCodeValue = zipCode.value;
    let parentGuardianValue = parentGuardian.value;

    // Put our data we want to send in a javascript object
    let data = {
        z: studentIdValue,
        a: firstNameValue,
        b: lastNameValue,
        c: dobValue,
        d: gradeLevelValue,
        e: entryDateValue,
        f: leaveDateValue,
        g: emailValue,
        h: phoneNumberValue,
        i: addressValue,
        j: cityValue,
        k: stateValue,
        l: zipCodeValue,
        m: parentGuardianValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateStudent", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update the row in the table
            updateRow(xhttp.response, studentIdValue);
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

function updateRow(data, z) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("studentTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // Iterate through rows
        if (table.rows[i].getAttribute("data-value") == z) {
            // Get the location of the row where we found the matching artist ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Update the relevant td elements
            updateRowIndex.getElementsByTagName("td")[1].innerHTML = parsedData[0].a;
            updateRowIndex.getElementsByTagName("td")[2].innerHTML = parsedData[0].b;
            updateRowIndex.getElementsByTagName("td")[3].innerHTML = parsedData[0].c;
            updateRowIndex.getElementsByTagName("td")[4].innerHTML = parsedData[0].d;
            updateRowIndex.getElementsByTagName("td")[5].innerHTML = parsedData[0].e;
            updateRowIndex.getElementsByTagName("td")[6].innerHTML = parsedData[0].f;
            updateRowIndex.getElementsByTagName("td")[7].innerHTML = parsedData[0].g;
            updateRowIndex.getElementsByTagName("td")[8].innerHTML = parsedData[0].h;
            updateRowIndex.getElementsByTagName("td")[9].innerHTML = parsedData[0].i;
            updateRowIndex.getElementsByTagName("td")[10].innerHTML = parsedData[0].j;
            updateRowIndex.getElementsByTagName("td")[11].innerHTML = parsedData[0].k;
            updateRowIndex.getElementsByTagName("td")[12].innerHTML = parsedData[0].l;
            updateRowIndex.getElementsByTagName("td")[13].innerHTML = parsedData[0].m;
        }
    }
}