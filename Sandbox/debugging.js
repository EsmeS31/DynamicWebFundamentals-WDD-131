const PI = 3.14;
let radius = 3;
let area = 0;
function calculateArea(radius) {
   const area = radius * radius * PI;
   return area;
}
area = calculateArea(radius);
console.log("area of circle with radius " + radius + " is " + area);
radius = 4;
area =calculateArea(radius);
console.log("area of circle with radius " + radius + " is " + area);