CREATE OR REPLACE TABLE Students (
    studentID int NOT NULL AUTO_INCREMENT,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    dob date NOT NULL,
    gradeLevel int NOT NULL,
    entryDate date NOT NULL,
    leaveDate date,
    email varchar(255) NOT NULL,
    phoneNumber varchar(255),
    adress varchar(255),
    city varchar(255),
    state varchar(255),
    zipCode varchar(255),
    parentGuardian varchar(255),
    PRIMARY KEY (studentID),
    UNIQUE KEY (studentID)
);

CREATE OR REPLACE TABLE Courses (
    courseID int NOT NULL AUTO_INCREMENT,
    coursName varchar(255) NOT NULL,
    stateCourseCode varchar(255) NOT NULL,
    PRIMARY KEY (courseID),
    UNIQUE KEY (courseID),
    FOREIGN KEY (stateCourseCode)
);

CREATE OR REPLACE TABLE StateCourseCode (
    stateCourseCode int NOT NULL AUTO_INCREMENT,
    subject varchar(255) NOT NULL,
    PRIMARY KEY (stateCourseCode),
    UNIQUE KEY (stateCourseCode)
);

CREATE OR REPLACE TABLE CourseEnrollments (
    enrollemntID int NOT NULL AUTO_INCREMENT,
    courseID int NOT NULL,
    studentID int NOT NULL,
    courseStartDate date NOT NULL,
    courseEndDate date,
    PRIMARY KEY (enrollemntID),
    UNIQUE KEY (enrollemntID),
    CONSTRAINT FOREIGN KEY (courseID) REFERENCES Courses(courseID),
    CONSTRAINT FOREIGN KEY (studentID) REFERENCES Students(studentID)
);

CREATE OR REPLACE TABLE Grades (
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
    studentID,
    firstName,
    lastName,
    dob,
    gradeLevel,
    entryDate,
    leaveDate,
    email,
    phoneNumber,
    adress,
    city,
    state,
    zipCode,
    parentGuardian
)
VALUES();

INSERT INTO Courses (
    courseID,
    coursName,
    stateCourseCode
)
VALUES();

INSERT INTO StateCourseCode (
    stateCourseCode,
    subject
)
VALUES();

INSERT INTO CourseEnrollments (
    enrollemntID,
    courseID,
    studentID,
    courseStartDate,
    courseEndDate
)
VALUES();

INSERT INTO Grades (
    gradeID,
    courseID,
    studentID,
    gradeAssigned
)
VALUES();