----- Students -----
-- get all students to populate the table on the view students page
SELECT * FROM Students;

-- add a new student
INSERT INTO Students (
    firstName, 
    lastName, 
    dateOfBirth, 
    gradeLevel, 
    entryDate, 
    leaveDate, 
    email, 
    phoneNumber, 
    address, 
    city, 
    state, 
    zipCode, 
    parentGuardian) 
VALUES (:firstNameInput,
    :lastNameInput, 
    :dateOfBirthInput, 
    :gradeLevelInput, 
    :entryDateInput, 
    :leaveDateInput, 
    :emailInput, 
    :phoneNumberInput, 
    :addressInput, 
    :cityInput, 
    :stateInput, 
    :zipCodeInput, 
    :parentGuardianInput);

-- get a single student's information for the update student form
SELECT * FROM Students WHERE studentID = :studentIDSelectedFromBrowsePage;

-- delete student
DELETE FROM Students WHERE studentID = :studentIDSelectedFromBrowsePage;

-- update student
UPDATE Students SET 
    firstName = :firstNameInput, 
    lastName = :lastNameInput, 
    dateOfBirth = :dateOfBirthInput, 
    gradeLevel = :gradeLevelInput, 
    entryDate = :entryDateInput, 
    leaveDate = :leaveDateInput, 
    email = :emailInput, 
    phoneNumber = :phoneNumberInput, 
    address = :addressInput, 
    city = :cityInput, 
    state = :stateInput, 
    zipCode = :zipCodeInput, 
    parentGuardian = :parentGuardianInput 
WHERE studentID = :studentIDSelectedFromUpdateForm;

----- State Course Codes -----
-- get all state course codes to populate the table on the view state course codes page
SELECT * FROM StateCourseCodes;

-- add a new state course code
INSERT INTO StateCourseCodes (stateCourseCode, courseName) VALUES (:stateCourseCodeInput, :courseNameInput);

-- get a single state course code's information for the update state course code form
SELECT * FROM StateCourseCodes WHERE stateCourseCode = :stateCourseCodeSelectedFromBrowsePage;

-- delete state course code
DELETE FROM StateCourseCodes WHERE stateCourseCode = :stateCourseCodeSelectedFromBrowsePage;

-- update state course code
UPDATE StateCourseCodes SET stateCourseCode = :stateCourseCodeInput, courseName = :courseNameInput WHERE stateCourseCode = :stateCourseCodeSelectedFromUpdateForm;

----- Courses -----
-- get all courses to populate the table on the view courses page
SELECT * FROM Courses;

-- add a new course
INSERT INTO Courses (courseName, stateCourseCode) VALUES (:courseNameInput, :stateCourseCodeDropdownInput);

-- get a single course's information for the update course form
SELECT * FROM Courses WHERE courseID = :courseIDSelectedFromBrowsePage;

-- delete course
DELETE FROM Courses WHERE courseID = :courseIDSelectedFromBrowsePage;

-- update course
UPDATE Courses SET courseName = :courseNameInput, stateCourseCode = :stateCourseCodeDropdownInput WHERE courseID = :courseIDSelectedFromUpdateForm;

----- Enrollments -----
-- get all enrollments to populate the table on the view enrollments page
SELECT * FROM Enrollments;

-- add a new enrollment
INSERT INTO Enrollments (studentID, enrollmentStartDate, enrollmentEndDate) VALUES (:studentIDDropdownInput, :enrollmentStartDateInput, :enrollmentEndDateInput);

-- get a single enrollment's information for the update enrollment form
SELECT * FROM Enrollments WHERE enrollmentID = :enrollmentIDSelectedFromBrowsePage;

-- delete enrollment
DELETE FROM Enrollments WHERE enrollmentID = :enrollmentIDSelectedFromBrowsePage;

-- update enrollment
UPDATE Enrollments SET studentID = :studentIDDropdownInput, enrollmentStartDate = :enrollmentStartDateInput, enrollmentEndDate = :enrollmentEndDateInput WHERE enrollmentID = :enrollmentIDSelectedFromUpdateForm;

----- Course Enrollments -----
-- get all course enrollments to populate the table on the view course enrollments page
SELECT * FROM CourseEnrollments;

-- add a new course enrollment
INSERT INTO CourseEnrollments (enrollmentID, courseID, courseStartDate, courseEndDate) VALUES (:enrollmentIDDropdownInput, :courseIDDropdownInput, :courseStartDateInput, :courseEndDateInput);

-- get a single course enrollment's information for the update course enrollment form
SELECT * FROM CourseEnrollments WHERE enrollmentID = :enrollmentIDSelectedFromBrowsePage AND courseID = :courseIDSelectedFromBrowsePage;

-- delete course enrollment
DELETE FROM CourseEnrollments WHERE enrollmentID = :enrollmentIDSelectedFromBrowsePage AND courseID = :courseIDSelectedFromBrowsePage;

-- update course enrollment
UPDATE CourseEnrollments SET enrollmentID = :enrollmentIDDropdownInput, courseID = :courseIDDropdownInput, courseStartDate = :courseStartDateInput, courseEndDate = :courseEndDateInput WHERE enrollmentID = :enrollmentIDSelectedFromUpdateForm AND courseID = :courseIDSelectedFromUpdateForm;

----- Grades -----
-- get all grades to populate the table on the view grades page
SELECT * FROM Grades;

-- add a new grade
INSERT INTO Grades (courseID, studentID, gradeAssigned) VALUES (:courseIDDropdownInput, :studentIDDropdownInput, :gradeAssignedInput);

-- get a single grade's information for the update grade form
SELECT * FROM Grades WHERE courseID = :courseIDSelectedFromBrowsePage AND studentID = :studentIDSelectedFromBrowsePage;

-- delete grade
DELETE FROM Grades WHERE courseID = :courseIDSelectedFromBrowsePage AND studentID = :studentIDSelectedFromBrowsePage;

-- update grade
UPDATE Grades SET courseID = :courseIDDropdownInput, studentID = :studentIDDropdownInput, gradeAssigned = :gradeAssignedInput WHERE courseID = :courseIDSelectedFromUpdateForm AND studentID = :studentIDSelectedFromUpdateForm;
