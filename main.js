
document.addEventListener("DOMContentLoaded", () => {


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

// Resizing
canvas.height = window.innerHeight/ 1.5;
canvas.width = window.innerWidth/1.1;
window.addEventListener("resize", () => {
    canvas.height = window.innerHeight/ 1.5;
    canvas.width = window.innerWidth/1.1;
})
// Variables
let painting = false;

const startPosition = function () {
    painting = true;
};
const finishPosition = function () {
    painting = false;
    ctx.beginPath();
};
function draw (mousePosition) {
    if (!painting) return;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineTo(mousePosition.clientX, mousePosition.clientY);
    ctx.stroke();
    // ctx.beginPath();
    // ctx.moveTo(mousePosition.clientX, mousePosition.clientY);
};

const navWidth = document.getElementById("nav");
console.log(navWidth.style.width);
// Event listeners
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", finishPosition);
canvas.addEventListener("mousemove", draw);
// Clearing canvas
const clearBttn = document.getElementById("clear-button");
clearBttn.addEventListener("click", function() { ctx.clearRect(0, 0, canvas.width, canvas.height) })


/*
ctx.lineWidth = 10;
//whole canvas
ctx.fillStyle = 'white';
ctx.fillRect(0,0, canvas.width, canvas.height);

// Wall
ctx.strokeRect(75, 120, 150, 110);

ctx.fillStyle = 'black';
// Door
ctx.fillRect(130, 170, 40, 60);

// Roof
ctx.beginPath();
ctx.moveTo(50, 120);
ctx.lineTo(150, 30);
ctx.lineTo(250, 120);
ctx.closePath();
ctx.stroke();

// clear rectangles:
// ctx.clearRect(0,0,canvas.width, canvas.height);
*/


})