// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app. Modified for use with StateCourseCodes delete.
function deleteStateCourseCode(stateCourseCode) {
    const data = {id: stateCourseCode}
  
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `/deleteStateCourseCode/${stateCourseCode}`, true);
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