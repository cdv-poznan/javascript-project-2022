document.querySelector('video').playbackRate = 0.75;


$('#about-aurora-link').click(function () {
  $('#about-aurora, #aurora-map, #aurora-gallery').fadeOut();
  $('#about-aurora').fadeIn();
});

$('#aurora-map-link').click(function () {
  $('#about-aurora, #aurora-map, #aurora-gallery').fadeOut();
  $('#aurora-map').fadeIn();
});

$('#aurora-gallery-link').click(function () {
  $('#about-aurora, #aurora-map, #aurora-gallery').fadeOut();
  $('#aurora-gallery').fadeIn();
});

function initMap() {
  const myLatlng = { lat: 52.41573519438039, lng: 16.93194798098 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: myLatlng,
  });
  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    content: "<strong>Click on map to check actual Kp index in that place!</strong>",
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
    infoWindow.setContent("<strong>loading...</strong>");
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
      infoWindow.setContent("<strong>ACTUAL KP: " + auroraData.ace.kp + "</strong>");
      infoWindow2.close();
      infoWindow2 = new google.maps.InfoWindow({
        position: {
          lat: parseFloat(auroraData.probability.highest.lat),
          lng: parseFloat(auroraData.probability.highest.long),
        },
      });

      infoWindow2.setContent(
        "<strong>The bigest probability of Aurora is here: " +
          auroraData.probability.highest.value +
          "%</strong>"
      );
      infoWindow2.open(map);

      console.log(auroraData);
    });
  });
}
