//  Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
const express = require('express');
const app = express();
const PORT = process.env.PORT || ;// please add PORT number here

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

// database connection
const db = require('./database/db-connector');

// app setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(_dirname + '/public'));

// routes
app.get('/', (req, res) => {
    res.render('index');
});

// get students from students table
app.get('/students', (req, res) => {
    const query = 'SELECT * FROM students';
    db.pool.query(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});


// add a student to the students tables
app.post('/students', (req, res) => {
    const data = req.body;
    const query = 'INSERT INTO students (firstName, lastName, dob, gradeLevel, entryDate, leaveDate, email, phoneNumber, address, city, state, zipCode, parentGuardian) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.pool.query(query, [data.firstName, data.lastName, data.dob, data.gradeLevel, data.entryDate, data.leaveDate, data.email, data.phoneNumber, data.address, data.city, data.state, data.zipCode, data.parentGuardian], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'success', data: data });
});
});

// delete a student from the students table
app.delete('/students/:id', (req, res) => {
    const query = 'DELETE FROM students WHERE id = ?';
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
    const query = 'UPDATE students SET firstName = ?, lastName = ?, dob = ?, gradeLevel = ?, entryDate = ?, leaveDate = ?, email = ?, phoneNumber = ?, address = ?, city = ?, state = ?, zipCode = ?, parentGuardian = ? WHERE id = ?';
    db.pool.query(query, [firstName, lastName, dob, gradeLevel, entryDate, leaveDate, email, phoneNumber, address, city, state, zipCode, parentGuardian, studentId], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'updated', id: studentId });
    });
});


// start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});