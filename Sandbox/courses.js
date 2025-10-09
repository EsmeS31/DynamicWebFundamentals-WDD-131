// courses.js
const aCourse = {
  code: "CSE121b",
  name: "Javascript Language",
sections:[{ sectionNum: 1, roomNum: 'STC 353', enrolled: 26, days: 'TTh', instructor: 'Bro T'},
{ sectionNum: 2, roomNum: 'STC 347', enrolled: 28, days: 'TTh', instructor: 'Sis A'}
];
enrrollStudent: function(sectionNum) {
  console.log("in enroll students, this");
    const section = sections.find(
    (section) => section.sectionNum === sectionNum
);
console.log(section)
}
}; 

function setCourseInfo() {
// reference to the course name and code element
    const nameEl = document.querySelector("#courseName");
    const codeEl = document.querySelector("#courseCode");

// set the text content of the elements with the course info
        nameEl.textContent = course.name;
        codeEl.textContent = course.code;
}

function sectionTemplate(section) {
return`<tr>
<td>${section.SectionNum}</td>
<td>${section.roomNum}</td>
<td>${section.enrolled}</td>
<td>${section.days}</td>
<td>${section.instructor}</td></tr>`
}

function renderSections(sections) {
//get a reference to the section element
const sectionsEl = document.querySelector("#sections");
//transform ach sections from an object into an HTML string
const htmlStrings = sections.map(sectionTemplate);
// insert the HTML string into the section element
sectionEl.innerHTML = htmlStrings.join(""); 
}

setCourseInfo(aCourse);
renderSections(aCourse.sections);

function clickHandler(event) {
  console.log("in clickHandler", this);
  aCourse.enrrollStudent(2);
}

document
.querySelector("#enrollstudent")
.addEventListener("click", function(event) {
  console.log ("in clickHandler", this);
  aCourse.enrrollStudent(2);
