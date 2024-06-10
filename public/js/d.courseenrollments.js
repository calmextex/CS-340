// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app. Modified for course enrollment delete.
function deleteCourseEnrollment(enrollmentID) {
    console.log(enrollmentID)
    const data = {id: enrollmentID}
    console.log(JSON.stringify(data))
  
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `/deleteCourseEnrollment/${enrollmentID}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            location.reload()
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
  }