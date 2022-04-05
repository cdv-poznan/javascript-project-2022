function initMap() {
    const myLatlng = { lat: 52.04789641, lng: 16.93403582 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: myLatlng,
    });
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
      content: "Click the map to get Lat/Lng!",
      position: myLatlng,
    });
  
    infoWindow.open(map);
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
      // Close the current InfoWindow.
      infoWindow.close();
      // Create a new InfoWindow.
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });
      infoWindow.setContent(
        JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      );
      infoWindow.open(map);
           
 // API URL AURORA
 const apiURL="https://api.auroras.live/v1/?type=all&lat=40.7813913&long=-73.976902&forecast=false&threeday=false";
var apiURLlink ="https://api.auroras.live/v1/?type=all&" + "lat="+mapsMouseEvent.latLng.toJSON().lat+"&long="
+mapsMouseEvent.latLng.toJSON().lng + "&forecast=false&threeday=false"
 function getApiResponse(url) {
   const postsRequest = fetch(url);
   return postsRequest.then((response) => response.json()
   );
 }
 
 getApiResponse(apiURL).then((auroraData) => {
   console.log(auroraData);
    });
    });
  }

