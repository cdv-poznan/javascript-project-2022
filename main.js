document.addEventListener("DOMContentLoaded", () => {
  const api = "https://x-colors.herokuapp.com/api/random";

  // -------------------------CANVAS-----------------------
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Resizing
  canvas.height = window.innerHeight / 1.5;
  canvas.width = window.innerWidth;
  window.addEventListener("resize", () => {
    canvas.height = window.innerHeight / 1.5;
    canvas.width = window.innerWidth / 1.1;
  });
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
      x: ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
      y: ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
    };
  }

  function draw(e) {
    if (!painting) return;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    var mousePos = getMousePos(canvas, e);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
    // ctx.beginPath();
    // ctx.moveTo(mousePosition.clientX, mousePosition.clientY);
  }

  // Event listeners
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", finishPosition);
  canvas.addEventListener("mousemove", draw);
  // Clearing canvas
  const clearBttn = document.getElementById("clear-button");
  clearBttn.addEventListener("click", function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
  // ------------------------CANVAS-END-----------------------------------------

  // Generating colors
  function getApiResponse(url) {
    const colorsRequest = fetch(url);
    return colorsRequest
      .then((response) => response.json())
      .catch((error) => {
        alert("Error - data can't be loaded");
      });
  }
  const colorButton = document.getElementById("color-button");
  colorButton.addEventListener("click", getColors);
  function getColors() {
    let oldColors = document.getElementsByClassName('new-colors');
    for  (var i = (oldColors.length - 1) ; i >= 0; i--) {
    oldColors[i].parentNode.removeChild(oldColors[i])
    };
    getApiResponse(api).then((colors) => addColorStyle(colors.hex));
    getApiResponse(api).then((colors) => addColorStyle(colors.hex));
    getApiResponse(api).then((colors) => addColorStyle(colors.hex));
  };
{/* <span class="material-symbols-outlined">
circle
</span> */}
  function addColorStyle(hex) {
    const colors = document.getElementById("generated-colors");
    const colorsElement = document.createElement("span");
    colorsElement.style.color = hex;
    colorsElement.classList = 'new-colors'
    colorsElement.innerText = "Color";
    colors.append(colorsElement);
  }

  // //whole canvas
  // ctx.fillStyle = 'white';
});
