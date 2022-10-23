const formSubmit = document.querySelector('.submit_form')
const Input = document.querySelector('.input');
const ImformationContainer = document.querySelector('.imformationContainer');

// API_KEY For API Call
const API_KEY = `888a17c99eb7512577a40c2ab7108f12`;
// submit the form
formSubmit.addEventListener('submit', (e) => {
  e.preventDefault()
  // pass the value to getWeather Function
  getWeather(Input.value);
  Input.value = "";
})
// Default Weather Call
getWeather("delhi");

// async functio to get data from API
async function getWeather(city) {
  // get response From API
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
  // convert response to json form
  const data = await response.json();
  // Show Data in are page 
  showWeather(data)

  console.log(data);
}

// get Day
let day = new Date().getDay();
switch (day) {
  case 0:
    day = "Sunday";
    break
  case 1:
    day = "Monday";
    break
  case 2:
    day = "Tuesday";
    break
  case 3:
    day = "Wednesday"
    break
  case 4:
    day = "Thursday";
    break
  case 5:
    day = "Friday";
    break
  case 6:
    day = "Saturday";
    break
}


// Show data in form 
function showWeather(data) {
  // if Search does not exsit in API 
  if (data.cod == "404") {
    alert("City not found");
    return;
  }
  // convert into °C
  const x = Math.floor(data.main.temp - 273);
  // get Time to show
  const time = new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" });
  // add data in ImformationContainer with HTML Cord
  ImformationContainer.innerHTML =
    `<div class="information">
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" />
        <h2 class="temperature">${x} °C</h2>
        <div class="weatherName">
          <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" />
          <div class="name">${data.weather[0].main}</div>
        </div>
        <p class="humidity">Humidity : ${data.main.humidity}%</p>
        <p class="windSpeed">Wind Speed : ${data.wind.speed} MPH</p>
        <p class="pressure">Pressure : ${data.main.pressure} MPH</p>
        <p class="feels_like">Feels Like : ${data.main.feels_like} MPH</p>
      </div>
      <div class="Location">
        <div class="cityName">Forecast for,<span> ${data.name}</span></div>
        <div class="timeContainer">${day},
          <span class="day">${time}</span>
        </div>
      </div>`
}