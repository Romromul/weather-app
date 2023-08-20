const date = new Date();
const daysArray = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const currentTemp = document.querySelector('.current-temp');
const currentStatus = document.querySelector('.status');
const currentDay = document.querySelector('.current-day');
const currentDate = document.querySelector('.current-date');
const currentMonth = document.querySelector('.current-month');
const currentLocation = document.querySelector('.current-location');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity-value');
const visibility = document.querySelector('.visibility-value');
const airPressure = document.querySelector('.air-pressure-value');

currentDay.innerText = daysArray[date.getDay()];
currentDate.innerText = date.getDate();
currentMonth.innerText = monthsArray[date.getMonth()];

let latitude = null;
let longitude = null;

// Check if geolocation is available in the browser
if ("geolocation" in navigator) {
    // Get current position
    navigator.geolocation.getCurrentPosition(function(position) {
    // Update variables with latitude and longitude
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    
    let API_URL = `https://api.weatherapi.com/v1/current.json?key=afd1118f873b47bf99d170312231508&q=${latitude},${longitude}&aqi=no`;
    console.log(API_URL);

    fetch(API_URL)
    .then((response) => response.json())
    .then((response) => {
        console.log(response);
        currentTemp.innerText = response.current.temp_c;
        currentStatus.innerText = response.current.condition.text;
        currentLocation.innerText = response.location.name;
        windSpeed.innerText = response.current.wind_kph;
        humidity.innerText = response.current.humidity;
        visibility.innerText = response.current.vis_km;
        airPressure.innerText = response.current.pressure_mb;
    });
});
} else {
    console.log("Please Allow Location Permissions");
}