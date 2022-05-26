document.addEventListener("DOMContentLoaded", () => {
  const api = "https://x-colors.herokuapp.com/api/random";
  const localApi = "http://localhost:5000/api/random";

  $(document).ready(function () {
    $("#new-image").click(function () {
      $("#header").slideToggle().css("display", "flex");
    });
  });

  // -------------------------CANVAS-----------------------
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Resizing
  canvas.height = window.innerHeight / 1.5;
  canvas.width = window.innerWidth / 2;
  window.addEventListener("resize", () => {
    canvas.height = window.innerHeight / 1.5;
    canvas.width = window.innerWidth / 2;
  });

  // Canvas position
  function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    // console.log(rect);
    return {
      x: ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
      y: ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
    };
  }

  // Variables
  let painting = false;

  const startPosition = function () {
    painting = true;
  };
  const finishPosition = function () {
    painting = false;
    ctx.beginPath();
  };

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
  // Clearing canvas and adding previous project

  const displayImage = document.getElementById("previous-project-display");
  const clearBttn = document.getElementById("clear-button");

  clearBttn.addEventListener("click", () => {
    const addImg = document.createElement("img");
    addImg.classList.add("saved-image");
    addImg.src = imgLink();
    addImg.alt = "Previous project";
    addImg.style.alignContent = "center";
    displayImage.append(addImg);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });


  $(document).ready(() => {
    $("#previous-project").click(() => {
      $(".saved-image").css("display", "flex");
    });
  });

  // ------------------------CANVAS-END-----------------------------------------

  function getApiResponse(url) {
    const apiRequest = fetch(url);
    return (apiResponse = apiRequest
      .then((response) => response.json())
      .catch((error) => {
        alert(
          `Error - data can't be loaded from:
        ${url}`
        );
      }));

    // Generating colors
  }
  const colorButton = document.getElementById("color-button");
  colorButton.addEventListener("click", () => {
    getColors();
  });

  function getColors() {
    let oldColors = document.getElementsByClassName("material-symbols-rounded");
    for (var i = oldColors.length - 1; i >= 0; i--) {
      oldColors[i].parentNode.removeChild(oldColors[i]);
    }
    getApiResponse(localApi).then((colors) =>
      addColorStyle(colors.hex, "color1")
    );
    getApiResponse(localApi).then((colors) =>
      addColorStyle(colors.hex, "color2")
    );
    getApiResponse(localApi).then((colors) =>
      addColorStyle(colors.hex, "color3")
    );
  }

  function addColorStyle(hex, i) {
    const colors = document.getElementById("generated-colors");
    const colorsElement = document.createElement("span");
    colorsElement.style.color = hex;
    colorsElement.classList = "material-symbols-rounded";
    colorsElement.id = i;
    colorsElement.innerText = "circle";
    colorsElement.addEventListener("click", () => {
      // console.log('clicked');
      ctx.strokeStyle = `${hex}`;
    });
    colors.append(colorsElement);
  }

  /*    ------------------- XML file --------------------------
//  when first colors API doesn't work

    var url = "http://colormind.io/api/";
var data = {
	model : "default",
	input : [[44,43,44],[90,83,82],"N","N","N"]
}

var http = new XMLHttpRequest();

var threeColors = [];
http.onreadystatechange = function() {
	if(http.readyState == 4 && http.status == 200) {
		var palette = JSON.parse(http.responseText).result;
    for (let i = 1; i< palette.length-1; i++) {
      threeColors.push(palette[i])
    }
	}
}
// tablica z tablicą z trzema kolorami
console.log(threeColors);
http.open("POST", url, true);
http.send(JSON.stringify(data));

// colorsElement.style.color= (155, 102, 102);  --> rgb

------------------------ XML fetch end -------------------------
*/

  // ------------------------emojis-----------------
  const apiKey = "b2d5f5b8a462e384858bbfeaf3f0bf1b84fcd82e";
  const emojiList = `https://emoji-api.com/emojis?access_key=${apiKey}`;

  class Emoji {
    constructor(group, character, id) {
      this.id = id;
      this.group = group;
      this.character = character;
    }
    renderGroup() {
      const group = document.getElementById("generated-emojis");
      const groupElement = document.createElement("span");
      groupElement.innerText = this.group;
      groupElement.addEventListener("click", () => {
        console.log("clicked group");
      });
      group.append(groupElement);
    }
    renderEmoji() {
      const emojis = document.getElementById("generated-emojis");
      const emojisElement = document.createElement("span");
      emojisElement.innerText = this.character;
      emojisElement.addEventListener("click", () => {
        ctx.font = "15vh verdana";
        // use these alignment properties for "better" positioning
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        painting = false;
        // draw the emoji
        canvas.addEventListener(
          "click",
          (e) => {
            var mousePos = getMousePos(canvas, e);
            ctx.fillText(this.character, mousePos.x, mousePos.y);
          },
          { once: true }
        );
      });
      emojis.append(emojisElement);
    }
  }

  const emojiButton = document.getElementById("emojis-button");
  emojiButton.addEventListener("click", async () => {
    const emojiJson = await getApiResponse(emojiList);
    let counter = 0;

    for (let i = counter; i < counter + 10; i++) {
      const emoji = new Emoji(emojiJson[i].group, emojiJson[i].character, i);
      emoji.renderEmoji();
      const nextButton = document.getElementById("next");
      nextButton.addEventListener("click", () => {
        counter += 1;
      });
      const previousButton = document.getElementById("previous");
      previousButton.addEventListener("click", () => {
        counter -= 1;
      });
    }
  });

  // let emojis = [];
  // getApiResponse(emojiList).then(value => console.log(value, typeof value));
  // getApiResponse(emojiList).then(value => (value.map (element => emojis.push(element.character))));

  // ------- Save image--------------
  function imgLink() {
    const link = canvas.toDataURL("image/png");
    save.href = link;
    save.download = "IMAGE.jpeg";
    return link;
  }
  const save = document.getElementById("save-button");
  save.addEventListener("click", imgLink);

  // end of DOMContentLoaded
});
