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

DROP TABLE IF EXISTS StateCourseCodes;
CREATE TABLE StateCourseCodes (
    stateCourseCode int NOT NULL,
    subject varchar(255) NOT NULL,
    PRIMARY KEY (stateCourseCode),
    UNIQUE KEY (stateCourseCode)
);

DROP TABLE IF EXISTS Courses;
CREATE TABLE Courses (
    courseID int NOT NULL AUTO_INCREMENT,
    courseName varchar(255) NOT NULL,
    stateCourseCode int NOT NULL,
    PRIMARY KEY (courseID),
    UNIQUE KEY (courseID),
    FOREIGN KEY (stateCourseCode) REFERENCES StateCourseCodes (stateCourseCode)
);

DROP TABLE IF exists CourseEnrollments;
CREATE TABLE CourseEnrollments (
    enrollmentID int NOT NULL AUTO_INCREMENT,
    courseID int NOT NULL,
    studentID int NOT NULL,
    courseStartDate date NOT NULL,
    courseEndDate date,
    PRIMARY KEY (enrollmentID),
    UNIQUE KEY (enrollmentID),
    CONSTRAINT FOREIGN KEY (courseID) REFERENCES Courses(courseID),
    CONSTRAINT FOREIGN KEY (studentID) REFERENCES Students(studentID)
);

DROP TABLE IF EXISTS Grades;
CREATE TABLE Grades (
    gradeID int NOT NULL AUTO_INCREMENT,
    courseID int NOT NULL,
    studentID int NOT NULL,
    gradeAssigned varchar(255) NOT NULL,
    PRIMARY KEY(gradeID),
    UNIQUE KEY(gradeID),
    CONSTRAINT FOREIGN KEY (courseID) REFERENCES Courses(courseID),
    CONSTRAINT FOREIGN KEY (studentID) REFERENCES Students(studentID)
);

/*SAMPLE DATA*/
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

SELECT * FROM Students;
INSERT INTO StateCourseCodes (
    stateCourseCode,
    subject
)
VALUES(765, 'Calculus I'),
(724, 'AP Biology'),
(745, 'Biology');
SELECT * FROM StateCourseCodes;

INSERT INTO Courses (
    courseName,
    stateCourseCode
)
VALUES('AP Biology for Nerds', 724),
('Bio', 745),('Bio-Remedial', 745),('Differential Calculus', 765), ('Calculus I', 765);
SELECT * From Courses;

INSERT INTO CourseEnrollments (
    courseID,
    studentID,
    courseStartDate,
    courseEndDate
)
VALUES(1, 1, '2023-07-03', '2023-12-15'),(5, 1, '2024-01-05', NULL),(2, 2, '2023-07-03', '2024-04-21'),(3, 3, '2023-07-03', NULL),(4, 3, '2023-07-03', '2024-01-30');
SELECT * FROM CourseEnrollments;

INSERT INTO Grades (
    courseID,
    studentID,
    gradeAssigned
)
VALUES(1,1,'A'), (2,2,'B+'), (4,3,'A-');
SELECT * FROM Grades;