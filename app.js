window.addEventListener('load', () => {
  var apiKey = config.API_KEY;
  let lon;
  let lat;
  

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lon = position.coords.longitude.toFixed(2);
      lat = position.coords.latitude.toFixed(2);
      console.log("Latitude:", lat);
      console.log("Longitude:", lon);

      const api = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

    })
  } else {
    h1.textContent = "please enable your geolocation"
  }
})