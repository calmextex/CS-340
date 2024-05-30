//  Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
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

// delete a student from the students table
app.delete('/students/:id', (req, res) => {
    const query = 'DELETE FROM Students WHERE id = ?';
    db.pool.query(query, [req.params.id], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'deleted', id: req.params.id });
    });
});

// update a student in the students table
app.put('/students/:id', (req, res) => {
    const studentId = req.params.id;
    const { firstName, lastName, dob, gradeLevel, entryDate, leaveDate, email, phoneNumber, address, city, state, zipCode, parentGuardian } = req.body;
    const query = 'UPDATE Students SET firstName = ?, lastName = ?, dob = ?, gradeLevel = ?, entryDate = ?, leaveDate = ?, email = ?, phoneNumber = ?, address = ?, city = ?, state = ?, zipCode = ?, parentGuardian = ? WHERE id = ?';
    db.pool.query(query, [firstName, lastName, dob, gradeLevel, entryDate, leaveDate, email, phoneNumber, address, city, state, zipCode, parentGuardian, studentId], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'updated', id: studentId });
    });
});
/** DELETE and PUT for other entities. Commented out for now. When merged, feel free to move around as needed.

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

// delete a state course code from the StateCourseCodes table
app.delete('/statecoursecodes/:stateCourseCode', (req, res) => {
    const query = 'UPDATE StateCourseCodes SET stateCourseCode = ?';
    db.pool.query(query, [req.params.stateCourseCode], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'updated', stateCourseCode: req.params.stateCourseCode });
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

// enrollment delete
app.delete('/enrollments/:enrollmentID', (req, res) => {
    const query = 'DELETE FROM Enrollments WHERE enrollmentID = ?';
    db.pool.query(query, [req.params.enrollmentID], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'deleted', enrollmentID: req.params.enrollmentID });
    });
});

// course update 

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


// courses delete

app.delete('/courses/:courseID', (req, res) => {
    const query = 'DELETE FROM Courses WHERE courseID = ?';
    db.pool.query(query, [req.params.courseID], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'deleted', courseID: req.params.courseID });
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

// course enrollments delete
app.delete('/courseenrollments/:enrollmentID/:courseID', (req, res) => {
    const query = 'DELETE FROM CourseEnrollments WHERE enrollmentID = ? AND courseID = ?';
    db.pool.query(query, [req.params.enrollmentID, req.params.courseID], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'deleted', enrollmentID: req.params.enrollmentID, courseID: req.params.courseID });
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


// grades delete

app.delete('/grades/:courseID/:studentID', (req, res) => {
    const query = 'DELETE FROM Grades WHERE courseID = ? AND studentID = ?';
    db.pool.query(query, [req.params.courseID, req.params.studentID], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'deleted', courseID: req.params.courseID, studentID: req.params.studentID });
    });
});

*/

app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
