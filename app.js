window.addEventListener('load', () => {
  // register for your open weather map api key and paste below
  const apiKey = "";  
  let lon;
  let lat;
  const temperatureDegree = document.querySelector('.temperature-degree');
  const temperatureDescription = document.querySelector('.temperature-description');
  const locationTimezone = document.querySelector('.location-timezone');
  const temperatureSection = document.querySelector('.temperature')
  const temperatureSpan = document.querySelector('.temperature span')
  const weatherIcon = document.querySelector('.icon');

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lon = position.coords.longitude.toFixed(2);
      lat = position.coords.latitude.toFixed(2);

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      fetch(api)
        .then(res => {
          return res.json()
        })
        .then(data => {
          const currentWeather = data.weather[0].main;
          const currentTemperatureCelsius = Math.round((data.main.temp) - (273.15));
          const currentLocation = `${data.name}, ${data.sys.country}`;
          const {icon} = data.weather[0];
          const currentIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          const currentTemperatureFarenheit = (currentTemperatureCelsius * (9/5)) + 32;
          
          // Set DOM Elements from the API
          temperatureDegree.textContent = currentTemperatureCelsius;
          temperatureDescription.textContent = currentWeather;
          locationTimezone.textContent = currentLocation;
          //icon 
          weatherIcon.innerHTML = `<img src="${currentIcon}">`;

          //Change temp F to C 
          temperatureSection.addEventListener('click', () =>{
            if (temperatureSpan.textContent === "°C") {
              temperatureSpan.textContent = "°F";
              temperatureDegree.textContent = Math.round(currentTemperatureFarenheit);
            } else {
              temperatureSpan.textContent = "°C";
              temperatureDegree.textContent = currentTemperatureCelsius;
            }
          })
        });
    });
  }
}); //end