// Lottery numbers start
function lotteryNumbers(range, outputCount) {
    let helpArray = [];
    for (let i = 1; i <= range; i++) {
      helpArray.push(i);
    }
  
    let resultNums = [];
  
    for (let i = 1; i <= outputCount; i++) {
      const random = Math.floor(Math.random() * (range - i));
      resultNums.push(helpArray[random]);
      helpArray[random] = helpArray[range - i];
    }
    document.getElementById("luckynumbers").innerHTML = resultNums.join(" - ");
  }
  // Lottery numbers end
  
  // 10 years live start
  var europeCities = [
    "Sevilla, Spain",
    "Nordkjosbotn, Norway",
    "Zalaegerszeg, Hungary",
  ];
  var northAmericaCities = [
    "Delta Junction, Alaska, US",
    "Guadalajara, Mexico",
    "Denver, Colorado, US",
  ];
  var southAmericaCities = [
    "Stanley, Falkland Islands",
    "Parauapebas, Brasil",
    "Arequipa, Peru",
  ];
  var africaCities = [
    "Maseru, Lesotho",
    "Port Elizabeth, RSA",
    "Ouargla, Algeria",
  ];
  var asiaCities = [
    "Verkhoyansk, Russia",
    "Surabaya, Indonesia",
    "Chongqing, China",
  ];
  var australiaCities = [
    "Oodnadatta, Australia",
    "Suva, Fiji",
    "Canberra, Australia",
  ];
  
  async function getCity() {
    var selectedContinent = document.getElementById("continents").value;
    if (selectedContinent === "europe") {
      city = europeCities[Math.floor(Math.random() * europeCities.length)];
    } else if (selectedContinent === "north-america") {
      city =
        northAmericaCities[Math.floor(Math.random() * northAmericaCities.length)];
    } else if (selectedContinent === "south-america") {
      city =
        southAmericaCities[Math.floor(Math.random() * southAmericaCities.length)];
    } else if (selectedContinent === "africa") {
      city = africaCities[Math.floor(Math.random() * africaCities.length)];
    } else if (selectedContinent === "asia") {
      city = asiaCities[Math.floor(Math.random() * asiaCities.length)];
    } else if (selectedContinent === "australia") {
      city = australiaCities[Math.floor(Math.random() * australiaCities.length)];
    }
  
    document.getElementById("city").innerHTML = "You will live in " + city;
  
    if (city === "Sevilla, Spain") {
      cityID = "2510911";
    } else if (city === "Nordkjosbotn, Norway") {
      cityID = "3133897";
    } else if (city === "Zalaegerszeg, Hungary") {
      cityID = "3042638";
    } else if (city === "Delta Junction, Alaska, US") {
      cityID = "5860524";
    } else if (city === "Guadalajara, Mexico") {
      cityID = "4005539";
    } else if (city === "Denver, Colorado, US") {
      cityID = "5419384";
    } else if (city === "Stanley, Falkland Islands") {
      cityID = "3426691";
    } else if (city === "Parauapebas, Brasil") {
      cityID = "6317872";
    } else if (city === "Arequipa, Peru") {
      cityID = "3947322";
    } else if (city === "Maseru, Lesotho") {
      cityID = "932506";
    } else if (city === "Port Elizabeth, RSA") {
      cityID = "964420";
    } else if (city === "Ouargla, Algeria") {
      cityID = "2485801";
    } else if (city === "Verkhoyansk, Russia") {
      cityID = "2013465";
    } else if (city === "Surabaya, Indonesia") {
      cityID = "1625822";
    } else if (city === "Chongqing, China") {
      cityID = "1814906";
    } else if (city === "Oodnadatta, Australia") {
      cityID = "2064144";
    } else if (city === "Suva, Fiji") {
      cityID = "2198148";
    } else if (city === "Canberra, Australia") {
      cityID = "2172517";
    }
    const key = "7295d5982610c427647a9f6429ff9564";
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?id=" +
        cityID +
        "&appid=" +
        key
    );
    const data = await response.json();
    if (response.ok) {
      // Update DOM elements
      getTemperature(data);
    } else {
      document.getElementById("city").innerHTML = "An error occured.";
    }
  }
  
  function getTemperature(d) {
    var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
    document.getElementById("temperature").innerHTML =
      "Today, the temperature in this city is: " + celcius + "&deg;";
    if (celcius <= 12) {
      opinionText = "Well, I don't envy you. This place so cold!";
    } else if (celcius >= 27) {
      opinionText = "I hope you you don't get sunburned easily...";
    } else {
      opinionText = "The weather is pretty nice!";
    }
  
    document.getElementById("opinion").innerHTML = opinionText;
  }
  // 10 years live end
  
  // words to live by start
  async function getQuote() {
    const response = await fetch("https://api.quotable.io/random?tags=life");
    const data = await response.json();
    if (response.ok) {
      document.getElementById("quote").innerHTML = data.content;
      document.getElementById("cite").innerHTML = data.author;
    } else {
      quote.textContent = "An error occured";
    }
  }
  // words to live by end
  
  // future dog start
  async function getDog() {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          document.getElementsByClassName("dogInfo").innerHTML =
            "An error occured.";
        }
      })
      .then((data) => {
        const imageurl = data.message;
        document.getElementById(
          "randomImageContainer"
        ).innerHTML = `<img alt="dog image" src='${imageurl}'>`;
        let bits = data.message.split("/");
        bits = bits[bits.length - 2].split("-").map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        });
        if (bits[1] === undefined) {
          document.getElementById("dogInfo").innerHTML =
            "Your future doggo is " + bits[0];
        } else {
          document.getElementById("dogInfo").innerHTML =
            "Your future doggo is " + bits[1] + " " + bits[0];
        }
      });
  }
  // future dog end
  