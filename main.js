document.addEventListener("DOMContentLoaded", () => {
  const api = "https://x-colors.herokuapp.com/api/random";
  const localApi = "http://localhost:5000/api/random";

  // DOM  Elements
  const $previousButton = document.getElementById("previous");
  const $previousTab = document.getElementById("previous-project")
  const $previousSection = document.getElementById("previous-project-display")
  const $nextButton = document.getElementById("next");
  const $genEmojis = document.getElementById("generated-emojis");
  const save = document.getElementById("save-button");
  const $clearBttn = document.getElementById("clear-button");
  const $colorButton = document.getElementById("color-button");
  const $emojiButton = document.getElementById("emojis-button");
  const colors = document.getElementById("generated-colors");
  const $tab = document.querySelectorAll('#nav button');



  // -------------------------CANVAS-----------------------
  const $canvas = document.getElementById("canvas");
  const ctx = $canvas.getContext("2d");

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
    return {
      x: ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
      y: ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
    };
  }

  // PAINTING
  
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
    ctx.save();
    // ctx.beginPath();
    // ctx.moveTo(mousePosition.clientX, mousePosition.clientY);
  }

  // Event listeners
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", finishPosition);
  canvas.addEventListener("mousemove", draw);


  // Clearing canvas and adding previous project

  // document.addEventListener("keydown", (e) => {
  //   if (e.ctrlKey && e.key === "z") {
  //     ctx.restore();
  // // change settings to previous from the stack
  //   }
  // });

  $clearBttn.addEventListener("click", () => {
    if ($previousSection.firstElementChild.tagName = 'h2') {
      $previousSection.firstElementChild.className = 'hide';
    };
    const addImg = document.createElement("img");
    addImg.classList.add("saved-image");
    addImg.src = imgLink();
    addImg.alt = "Previous project";
    addImg.style.alignContent = "center";
    $previousSection.append(addImg);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // $previousTab.addEventListener('click', () => {
  //   $previousSection.style.display = "flex";
  //   });

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
    }
    
    // Generating colors
    
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
    const colorsElement = document.createElement("span");
    colorsElement.style.color = hex;
    colorsElement.classList = "material-symbols-rounded";
    colorsElement.id = i;
    colorsElement.innerText = "circle";
    colorsElement.addEventListener("click", () =>  ctx.strokeStyle = `${hex}`);
    colors.append(colorsElement);
  }
  getColors();
  $colorButton.addEventListener("click", () => getColors());

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
    };
    emojis = document.getElementById("generated-emojis");
    renderGroup() {
      const groupElement = document.createElement("span");
      groupElement.innerText = this.group;
      groupElement.addEventListener("click", () => {
        console.log("clicked group");
      });
      this.emojis.append(groupElement);
    }
    renderEmoji() {
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
      this.emojis.append(emojisElement);
    }
  }

  
  $emojiButton.addEventListener("click", async () => {
    const emojiJson = await getApiResponse(emojiList);
    var counter = 0;
    function changeEmojis() {
      for (let i = counter; i < counter + 10; i++) {
      const emoji = new Emoji(emojiJson[i].group, emojiJson[i].character, i);
      emoji.renderEmoji();
    }}
    function delateEmojis(){
      while ($genEmojis.firstChild) {
        $genEmojis.removeChild($genEmojis.lastChild);
      }
    };
    delateEmojis();
    changeEmojis();
    $nextButton.addEventListener("click", () => {
      delateEmojis();
        counter += 10;
        changeEmojis();
    });
    $previousButton.addEventListener("click", () => {
      delateEmojis();
        counter -= 10;
      changeEmojis();
    });
    });
  
  // Save image
  function imgLink() {
    const link = canvas.toDataURL("image/png");
    save.href = link;
    save.download = "IMAGE.jpeg";
    return link;
  }

  save.addEventListener("click", imgLink);

  

  // end of DOMContentLoaded
});
