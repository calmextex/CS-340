SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Creating the Students table
DROP TABLE IF EXISTS Students;
CREATE TABLE Students (
    studentID int NOT NULL AUTO_INCREMENT,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    dob date NOT NULL,
    gradeLevel int NOT NULL,
    entryDate date NOT NULL,
    leaveDate date,
    email varchar(255) NOT NULL,
    phoneNumber varchar(255),
    address varchar(255),
    city varchar(255),
    state varchar(255),
    zipCode varchar(255),
    parentGuardian varchar(255),
    PRIMARY KEY (studentID),
    UNIQUE KEY (studentID)
);

-- Creating the StateCourseCodes table
DROP TABLE IF EXISTS StateCourseCodes;
CREATE TABLE StateCourseCodes (
    stateCourseCode int NOT NULL,
    subject varchar(255) NOT NULL,
    PRIMARY KEY (stateCourseCode),
    UNIQUE KEY (stateCourseCode)
);

-- Creating the Courses table
DROP TABLE IF EXISTS Courses;
CREATE TABLE Courses (
    courseID int NOT NULL AUTO_INCREMENT,
    courseName varchar(255) NOT NULL,
    stateCourseCode int NOT NULL,
    PRIMARY KEY (courseID),
    UNIQUE KEY (courseID),
    FOREIGN KEY (stateCourseCode) REFERENCES StateCourseCodes (stateCourseCode) ON UPDATE CASCADE ON DELETE CASCADE ON DELETE SET NULL
);

-- Creating the Enrollments table
DROP TABLE IF EXISTS Enrollments;
CREATE TABLE Enrollments (
	enrollmentID int NOT NULL AUTO_INCREMENT,
    studentID int NOT NULL,
    enrollmentStartDate date NOT NULL,
    enrollmentEndDate date,
    PRIMARY KEY (enrollmentID),
    UNIQUE KEY (enrollmentID),
    FOREIGN KEY (studentID) references Students (studentID) ON UPDATE CASCADE ON DELETE CASCADE ON DELETE SET NULL
);

-- Creating the CourseEnrollments table
DROP TABLE IF exists CourseEnrollments;
CREATE TABLE CourseEnrollments (
	enrollmentID int NOT NULL,
    courseID int NOT NULL,
    courseStartDate date NOT NULL,
    courseEndDate date,
    CONSTRAINT FOREIGN KEY (courseID) REFERENCES Courses(courseID) ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (enrollmentID) REFERENCES Enrollments (enrollmentID) ON UPDATE CASCADE
);

-- Creating the Grades table
DROP TABLE IF EXISTS Grades;
CREATE TABLE Grades (
    courseID int NOT NULL,
    studentID int NOT NULL,
    gradeAssigned varchar(255) NOT NULL,
    CONSTRAINT FOREIGN KEY (courseID) REFERENCES Courses(courseID) ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (studentID) REFERENCES Students(studentID) ON DELETE CASCADE
);

-- Inserting sample data into the students table
INSERT INTO Students (
    firstName,
    lastName,
    dob,
    gradeLevel,
    entryDate,
    leaveDate,
    email,
    phoneNumber,
    address,
    city,
    state,
    zipCode,
    parentGuardian
)
VALUES ('Abraham', 'Zamora', '1986-05-13', 12, '2023-07-03', NULL, 'abe.zamora86@gmail.com', '510-239-1492', '10944 San Pablo Ave.', 'El Cerrito', 'CA', '94110', 'Roberto Zamora'),
('Bob', 'Loblaw', '1997-04-12', 11, '2023-07-03', '2024-04-21', 'bobloblaw@gmail.com', '510-232-5555', '123 A Street', 'San Francisco', 'CA', '94110', 'Gee Loblaw III'),
('Rohan', 'Jones', '1994-05-20', 12, '2023-07-03', NULL, 'rjones@ymail.com', 415-666-4201, '666 Pengtagram Street', 'Ghoulville', 'TX', '79927', 'Beelzebub Jones');

--SELECT * FROM Students;

-- insert sample data into the enrollments table
INSERT INTO Enrollments (
	studentID,
    enrollmentStartDate,
    enrollmentEndDate
)
VALUES(1, (SELECT Students.entryDate FROM STUDENTS WHERE Students.studentID = '1'), (SELECT students.leaveDate FROM Students WHERE Students.studentID = '1')),
(2, (SELECT Students.entryDate FROM STUDENTS WHERE Students.studentID = '2'), (SELECT Students.leaveDate FROM Students WHERE Students.studentID = '2')),
(3, (SELECT Students.entryDate FROM STUDENTS WHERE Students.studentID = '3'), (SELECT Students.leaveDate FROM Students WHERE Students.studentID = '3'));

--SELECT * FROM Enrollments;
-- insert sample data into the state course codes table
INSERT INTO StateCourseCodes (
    stateCourseCode,
    subject
)
VALUES(765, 'Calculus I'),
(724, 'AP Biology'),
(745, 'Biology');
--SELECT * FROM StateCourseCodes;

-- insert sample data into the courses table
INSERT INTO Courses (
    courseName,
    stateCourseCode
)
VALUES('AP Biology for Nerds', 724),
('Bio', 745),('Bio-Remedial', 745),('Differential Calculus', 765), ('Calculus I', 765);
--SELECT * From Courses;
-- insert sample data into the course enrollments table
INSERT INTO CourseEnrollments (
    courseID,
    enrollmentID,
    courseStartDate,
    courseEndDate
)
VALUES(1, 1, '2023-07-03', '2023-12-15'),(5, 1, '2024-01-05', NULL),(2, 2, '2023-07-03', '2024-04-21'),(3, 3, '2023-07-03', NULL),(4, 3, '2023-07-03', '2024-01-30'),(5,3,'2024-01-05', NULL);
--SELECT * FROM CourseEnrollments;
-- insert sample data into the grades table
INSERT INTO Grades (
    courseID,
    studentID,
    gradeAssigned
)
VALUES(1,1,'A'), (2,2,'B+'), (4,3,'A-');
--SELECT * FROM Grades;

-- Enable foreign key checks and commit changes
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;