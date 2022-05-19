function initMap() {
  const myLatlng = { lat: 52.41573519438039, lng: 16.93194798098 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: myLatlng,
  });
  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    content: "Hello in Aurora project!",
    position: myLatlng,
  });
  let infoWindow2 = new google.maps.InfoWindow({});

  infoWindow.open(map);

  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent("loading...");
    infoWindow.open(map);

    // API URL AURORA
    var apiURLlink =
      "https://api.auroras.live/v1/?type=all&" +
      "lat=" +
      mapsMouseEvent.latLng.toJSON().lat +
      "&long=" +
      mapsMouseEvent.latLng.toJSON().lng +
      "&forecast=false&threeday=false&colour=hex";

    function getApiResponse(url) {
      const postsRequest = fetch(url);
      return postsRequest.then((response) => response.json());
    }

    getApiResponse(apiURLlink).then((auroraData) => {
      infoWindow.setContent("ACTUAL KP: " + auroraData.ace.kp);
      infoWindow2.close();
      infoWindow2 = new google.maps.InfoWindow({
        position: {
          lat: parseFloat(auroraData.probability.highest.lat),
          lng: parseFloat(auroraData.probability.highest.long),
        },
      });

      infoWindow2.setContent(
        "The bigest probability of Aurora is here: " +
          auroraData.probability.highest.value +
          "%"
      );
      infoWindow2.open(map);

      console.log(auroraData);
    });
  });
}
