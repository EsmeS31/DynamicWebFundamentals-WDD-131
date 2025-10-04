
console.log ("Hello")
function convertGradeToPoints(grade) {

}

function calculateGPA(gpapoints) {
    
}

function cleanGrade (grade) {
 return grade.trim().toUpperCase();
}

function getGrades() {
//get the grades from the input field
const gradesEL = document.querySelector("#grades");
//split the grades on comma
let grades = gradesEL;value.split(",")
//trim whitespace
//conver all of the grades to uppercase
grades = grades.map (cleanGrade)
//return grade list
return grades;
}

function calculateHandler(event) {
//get the grades
const gpaPoints = getGrades();
const pgaPoints = grades.map(convertGradeToPoints);
//calculate GPA
const gpa = calculateGPA(pgaPoints);
//output to browser
outputGpa(gpa, "#output");
}

function outputGpa(gpa, selector) {
//output the gpa to the browser
}

document
.querySelector("#submitButton")
.addEventListener("click", calculateHandler);