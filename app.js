// # Citation for project
// # Adapted from starter app code provided by CS340 class.
//# Code Modified to better reflect the needs of the project.
//# Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Added the update and delete routes for other tables.  All are modeled after the original get, update, and delete for students, but modified for each entity.
// For adding DOM Event Listeners in HBS files and the Endpoints added to the App.JS, used W3Schools to better understand fetching and event listeners.
// Source URL: https://www.w3schools.com/js/js_api_fetch.asp?ref=buildwithnode.com
// Date Retrieved: 6/10/2024
var express = require('express');
var app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

PORT = 19134;// please add PORT number here  

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

// database connection
const db = require('./database/db-connector')

// routes
app.get('/', function(req, res){
    res.render('index');
});

app.get('/students', function(req, res){
    let query = "SELECT * FROM Students;";
    db.pool.query(query, (err, rows, fields) =>{
        res.render('students', {data: rows});
    })
});
//`INSERT INTO Enrollments (studentID) SELECT studentID FROM Students;`;
app.get('/enrollments', function(req, res){
    let query = "SELECT * FROM Enrollments;";
    db.pool.query(query, (err, rows, fields) =>{
        res.render('enrollments', {data: rows});
    })
});

app.get('/courses', function(req, res){
    let query = "SELECT * FROM Courses;";
    db.pool.query(query, (err, rows, fields) =>{
        res.render('courses', {data: rows});
    })
});

app.get('/statecoursecodes', function(req, res){
    let query = "SELECT * FROM StateCourseCodes;";
    db.pool.query(query, (err, rows, fields) =>{
        res.render('statecoursecodes', {data: rows});
    })
});

app.get('/courseenrollments', function(req, res){
    let query = "SELECT * FROM CourseEnrollments;";
    db.pool.query(query, (err, rows, fields) =>{
        res.render('courseenrollments', {data: rows});
    })
});

app.get('/grades', function(req, res){
    let query = "SELECT * FROM Grades;";
    db.pool.query(query, (err, rows, fields) =>{
        res.render('grades', {data: rows});
    })
});

// add a student to the Students tables
app.post('/addStudent-form', (req, res) => {
    let data = req.body;
    let query = `INSERT INTO Students (firstName, lastName, dob, gradeLevel, entryDate, leaveDate, email, phoneNumber, address, city, state, zipCode, parentGuardian) VALUES ('${data['first_name']}', '${data['last_name']}', '${data['dob']}', '${data['grade_level']}', '${data['entry_level']}', '${data['leave_date']}', '${data['email']}', '${data['phone_number']}', '${data['address']}', '${data['city']}', '${data['state']}', '${data['zip_code']}', '${data['parent_guardian']}');`;
    db.pool.query(query, (err, rows, fields) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.redirect('/students');
    })
});

//add enrollment to enrollment table
app.post('/addEnrollment-form', (req, res) => {
    let data = req.body;
    let query = `INSERT INTO Enrollments (enrollmentStartDate, enrollmentEndDate) VALUES ('${data['enrollment_start_date']}', '${data['enrollment_end_date']}');`;
    db.pool.query(query, (err, rows, fields) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.redirect('/enrollments');
    })
});

//add courses
app.post('/addCourse-form', (req, res) => {
    let data = req.body;
    let query = `INSERT INTO Courses (courseName, stateCourseCode) VALUES ('${data['course_name']}', '${data['course_code']}');`;
    db.pool.query(query, (err, rows, fields) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.redirect('/courses');
    })
});

//add state course code
app.post('/addStateCode-form', (req, res) => {
    let data = req.body;
    let query = `INSERT INTO StateCourseCodes (stateCourseCode, subject) VALUES ('${data['course_code_id']}', '${data['subject']}');`;
    db.pool.query(query, (err, rows, fields) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.redirect('/statecoursecodes');
    })
});

//
app.post('/addCourseEnroll-form', (req, res) => {
    let data = req.body;
    let query = `INSERT INTO CourseEnrollments (courseID, enrollmentID, courseStartDate, courseEndDate) VALUES('${data['course_id']}', '${data['student_id']}', '${data['course_start_date']}', '${data['course_end_date']}');`;
    db.pool.query(query, (err, rows, fields) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.redirect('/courseenrollments');
    })
});

//
app.post('/addGrades-form', (req, res) => {
    let data = req.body;
    let query = `INSERT INTO Grades (courseID, studentID, gradeAssigned) VALUES('${data['course_id']}', '${data['student_id']}', '${data['grade_value']}');`;
    db.pool.query(query, (err, rows, fields) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.redirect('/grades');
    })
});
// delete a student from the students table
app.delete('/deleteStudent/:studentID', function(req,res,next){
    console.log("HIIIII")
    let query = `DELETE FROM Students WHERE studentID = ?`;
          db.pool.query(query, [req.params.studentID], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }
            else {
                res.sendStatus(204);
            }
    })
});

app.delete('/deleteCourseEnrollment/:enrollmentID', function(req,res,next){
    console.log("HIIIII")
    let query = `DELETE FROM CourseEnrollments WHERE enrollmentID = ?`;
          db.pool.query(query, [req.params.enrollmentID], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }
            else {
                res.sendStatus(204);
            }
    })
});

app.delete('/deleteCourse/:courseID', function(req,res,next){
    let query = `DELETE FROM Courses WHERE courseID = ?`;
          db.pool.query(query, [req.params.studentID], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }
            else {
                res.sendStatus(204);
            }
    })
});

app.delete('/deleteEnrollment/:enrollmentID', function(req,res,next){
    let query = `DELETE FROM Enrollments WHERE enrollmentID = ?`;
          db.pool.query(query, [req.params.enrollmentID], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }
            else {
                res.sendStatus(204);
            }
    })
});

app.delete('/deleteGrade/:courseID', function(req,res,next){
    let query = `DELETE FROM Grades WHERE courseID = ?`;
          db.pool.query(query, [req.params.courseID], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }
            else {
                res.sendStatus(204);
            }
    })
});

app.delete('/deleteStateCourseCode/:stateCourseCode', function(req,res,next){
    let query = `DELETE FROM StateCourseCodes WHERE stateCourseCode = ?`;
          db.pool.query(query, [req.params.stateCourseCode], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }
            else {
                res.sendStatus(204);
            }
    })
});
// update a student in the students table
app.put('/updateStudent', (req, res) => {
    let studentID = req.params.studentID;
    let { firstName, lastName, dob, gradeLevel, entryDate, leaveDate, email, phoneNumber, address, city, state, zipCode, parentGuardian } = req.body;
    const query = 'UPDATE Students SET firstName = ?, lastName = ?, dob = ?, gradeLevel = ?, entryDate = ?, leaveDate = ?, email = ?, phoneNumber = ?, address = ?, city = ?, state = ?, zipCode = ?, parentGuardian = ? WHERE studentID = ?';
    db.pool.query(query, [firstName, lastName, dob, gradeLevel, entryDate, leaveDate, email, phoneNumber, address, city, state, zipCode, parentGuardian, studentID], (err, results, fields) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.redirect('/students');
    })
});

// update a state course code in the StateCourseCodes table
app.put('/statecoursecodes/:stateCourseCode', (req, res) => {
    const query = 'DELETE FROM StateCourseCodes WHERE stateCourseCode = ?';
    db.pool.query(query, [req.params.stateCourseCode], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'deleted', stateCourseCode: req.params.stateCourseCode });
    });
});

// enrollment update
app.put('/enrollments/:enrollmentID', (req, res) => {
    const enrollmentID = req.params.enrollmentID;
    const { studentID, enrollmentStartDate, enrollmentEndDate } = req.body;
    const query = 'UPDATE Enrollments SET studentID = ?, enrollmentStartDate = ?, enrollmentEndDate = ? WHERE enrollmentID = ?';
    db.pool.query(query, [studentID, enrollmentStartDate, enrollmentEndDate, enrollmentID], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'updated', enrollmentID });
    });
});

app.put('/courses/:courseID', (req, res) => {
    const courseID = req.params.courseID;
    const { courseName, stateCourseCode } = req.body;
    const query = 'UPDATE Courses SET courseName = ?, stateCourseCode = ? WHERE courseID = ?';
    db.pool.query(query, [courseName, stateCourseCode, courseID], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'updated', courseID });
    });
});

// course enrollments update
app.put('/courseenrollments/:enrollmentID/:courseID', (req, res) => {
    const enrollmentID = req.params.enrollmentID;
    const courseID = req.params.courseID;
    const { enrollmentID: newEnrollmentID, courseID: newCourseID, courseStartDate, courseEndDate } = req.body;
    const query = 'UPDATE CourseEnrollments SET enrollmentID = ?, courseID = ?, courseStartDate = ?, courseEndDate = ? WHERE enrollmentID = ? AND courseID = ?';
    db.pool.query(query, [newEnrollmentID, newCourseID, courseStartDate, courseEndDate, enrollmentID, courseID], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'updated', enrollmentID, courseID });
    });
});

// grades update
app.put('/grades/:courseID/:studentID', (req, res) => {
    const courseID = req.params.courseID;
    const studentID = req.params.studentID;
    const { courseID: newCourseID, studentID: newStudentID, gradeAssigned } = req.body;
    const query = 'UPDATE Grades SET courseID = ?, studentID = ?, gradeAssigned = ? WHERE courseID = ? AND studentID = ?';
    db.pool.query(query, [newCourseID, newStudentID, gradeAssigned, courseID, studentID], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'updated', courseID, studentID });
    });
});

// Endpoint to get StudentIDs for Enrollments and Grades dropdown
app.get('/get_student_ids', (req, res) => {
    let query = 'SELECT studentID FROM Students';
    db.pool.query(query, (err, results) => {
        if (err) throw err;
        const studentIDs = results.map(row => row.studentID);
        res.json({ studentIDs });
    });
});

// Endpoint to get CourseIDs for use in dropdown dropdown
app.get('/get_course_ids', (req, res) => {
    let query = 'SELECT courseID FROM Courses';
    db.pool.query(query, (err, results) => {
        if (err) throw err;
        const courseIDs = results.map(row => row.courseID);
        res.json({ courseIDs });
    });
});

// Endpoint to get EnrollmentIDs for use in CourseEnrollments dropdown
app.get('/get_enrollment_ids', (req, res) => {
    let query = 'SELECT enrollmentID FROM Enrollments';
    db.pool.query(query, (err, results) => {
        if (err) throw err;
        const enrollmentIDs = results.map(row => row.enrollmentID);
        res.json({ enrollmentIDs });
    });
});

// Endpoint to get StateCourseCodes for Courses dropdown
app.get('/get_state_course_codes', (req, res) => {
    let query = 'SELECT stateCourseCode FROM StateCourseCodes';
    db.pool.query(query, (err, results) => {
        if (err) throw err;
        const stateCourseCodes = results.map(row => row.stateCourseCode);
        res.json({ stateCourseCodes });
    });
});

app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
