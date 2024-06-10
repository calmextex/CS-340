// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app. Modified for students delete.
function deleteStudent(studentID) {
    console.log(studentID)
    const data = {id: studentID}
    console.log(JSON.stringify(data))
  
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `/deleteStudent/${studentID}`, true);
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