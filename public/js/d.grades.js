// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app. Modified for grades delete.
function deleteGrade(courseID) {
    const data = {id: courseID}
  
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `/deleteGrade/${courseID}`, true);
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