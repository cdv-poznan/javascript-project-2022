document.addEventListener("DOMContentLoaded", () => {
  const api = "https://x-colors.herokuapp.com/api/random";
  const apiKey = "b2d5f5b8a462e384858bbfeaf3f0bf1b84fcd82e";
  const emojiList = `https://emoji-api.com/emojis?access_key=${apiKey}`;

  // DOM  Elements
  const $previousButton = document.getElementById("previous");
  const $previousTab = document.getElementById("previous-project-btn");
  const $aboutMeTab = document.getElementById("me-btn");
  const $drawTab = document.getElementById("new-image-btn");
  const $previousSection = document.getElementById("previous-project-display");
  const $nextButton = document.getElementById("next");
  const $genEmojis = document.getElementById("generated-emojis");
  const $save = document.getElementById("save-button");
  const $clearBttn = document.getElementById("clear-button");
  const $colorButton = document.getElementById("color-button");
  const $emojiButton = document.getElementById("emojis-button");
  const $colors = document.getElementById("generated-colors");

  function openPage(pageName, elmnt) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("page-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = "#8573f8";
  }

  $drawTab.addEventListener("click", function () {
    openPage("draw-page", this);
  });
  $previousTab.addEventListener("click", function () {
    openPage("previous-projects-page", this);
  });
  $aboutMeTab.addEventListener("click", function () {
    openPage("about-me-page", this);
  });
  $drawTab.click();

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
  }

  // Canvas event listeners
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", finishPosition);
  canvas.addEventListener("mousemove", draw);

  // Clearing canvas and adding previous project

  $clearBttn.addEventListener("click", () => {
    if (($previousSection.firstElementChild.tagName = "h2")) {
      $previousSection.firstElementChild.className = "hide";
    }
    const addImg = document.createElement("img");
    addImg.classList.add("saved-image");
    addImg.src = imgLink();
    addImg.alt = "Previous project";
    addImg.style.alignContent = "center";
    $previousSection.append(addImg);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
  }

  // Generating colors
  
  function addColorStyle(hex, i) {
    const colorsElement = document.createElement("span");
    colorsElement.style.color = hex;
    colorsElement.classList = "material-symbols-rounded";
    colorsElement.id = i;
    colorsElement.innerText = "circle";
    colorsElement.title = "Click to choose";
    colorsElement.addEventListener("click", () => ctx.strokeStyle = `${hex}`);
    $colors.append(colorsElement);
  }

  function getColors() {
    let oldColors = document.getElementsByClassName("material-symbols-rounded");
    for (var i = oldColors.length - 1; i >= 0; i--) {
      oldColors[i].parentNode.removeChild(oldColors[i]);
    }
    getApiResponse(api).then((colors) =>
      addColorStyle(colors.hex, "color1")
    );
    getApiResponse(api).then((colors) =>
      addColorStyle(colors.hex, "color2")
    );
    getApiResponse(api).then((colors) =>
      addColorStyle(colors.hex, "color3")
    );
  }

  getColors();
  $colorButton.addEventListener("click", () => getColors());

  // ------------------------emojis-----------------


  class Emoji {
    constructor(group, character, id) {
      this.id = id;
      this.group = group;
      this.character = character;
    }
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
      emojisElement.title = "Click to choose";
      emojisElement.addEventListener("click", () => {
        ctx.font = "12vh verdana";
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
      }
    }
    function delateEmojis() {
      while ($genEmojis.firstChild) {
        $genEmojis.removeChild($genEmojis.lastChild);
      }
    }
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
    $save.href = link;
    $save.download = "IMAGE.jpeg";
    return link;
  }

  $save.addEventListener("click", imgLink);
  $emojiButton.click();

  // end of DOMContentLoaded
});
