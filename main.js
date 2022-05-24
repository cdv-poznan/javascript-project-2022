
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

// Canvas position
function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    // console.log(rect);
    return {
        x: (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}


function draw (e) {
    if (!painting) return;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    var mousePos = getMousePos(canvas, e);
    ctx.lineTo(mousePos.x, mousePos.y);
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



// //whole canvas
// ctx.fillStyle = 'white';


})