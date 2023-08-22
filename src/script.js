const date = new Date();
const daysArray = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const icon = document.querySelector('.icon');
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
const date2 = document.querySelector('.date-2');
const date3 = document.querySelector('.date-3');
const date4 = document.querySelector('.date-4');
const date5 = document.querySelector('.date-5');
const forecastIcon1 = document.querySelector('.icon-1');
const forecastIcon2 = document.querySelector('.icon-2');
const forecastIcon3 = document.querySelector('.icon-3');
const forecastIcon4 = document.querySelector('.icon-4');
const forecastIcon5 = document.querySelector('.icon-5');
const maxTemp1 = document.querySelector('.max-1');
const maxTemp2 = document.querySelector('.max-2');
const maxTemp3 = document.querySelector('.max-3');
const maxTemp4 = document.querySelector('.max-4');
const maxTemp5 = document.querySelector('.max-5');
const minTemp1 = document.querySelector('.min-1');
const minTemp2 = document.querySelector('.min-2');
const minTemp3 = document.querySelector('.min-3');
const minTemp4 = document.querySelector('.min-4');
const minTemp5 = document.querySelector('.min-5');

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
    
    let API_URL = `https://api.weatherapi.com/v1/forecast.json?key=afd1118f873b47bf99d170312231508&q=${latitude},${longitude}&days=6&aqi=no&alerts=no`;
    console.log(API_URL);

    fetch(API_URL)
    .then((response) => response.json())
    .then((response) => {
        console.log(response);
        icon.src = response.current.condition.icon;
        currentTemp.innerText = response.current.temp_c;
        currentStatus.innerText = response.current.condition.text;
        currentLocation.innerText = response.location.name;
        windSpeed.innerText = response.current.wind_kph;
        humidity.innerText = response.current.humidity;
        visibility.innerText = response.current.vis_km;
        airPressure.innerText = response.current.pressure_mb;
        date2.innerText = `${daysArray[date.getDay() + 2]}, ${date.getDate() + 2} ${monthsArray[date.getMonth()]}`;
        date3.innerText = `${daysArray[date.getDay() + 3]}, ${date.getDate() + 3} ${monthsArray[date.getMonth()]}`;
        date4.innerText = `${daysArray[date.getDay() + 4]}, ${date.getDate() + 4} ${monthsArray[date.getMonth()]}`;
        date5.innerText = `${daysArray[date.getDay() + 5]}, ${date.getDate() + 5} ${monthsArray[date.getMonth()]}`;
        forecastIcon1.src = response.forecast.forecastday[1].day.condition.icon;
        forecastIcon2.src = response.forecast.forecastday[2].day.condition.icon;
        forecastIcon3.src = response.forecast.forecastday[3].day.condition.icon;
        forecastIcon4.src = response.forecast.forecastday[4].day.condition.icon;
        forecastIcon5.src = response.forecast.forecastday[5].day.condition.icon;
        maxTemp1.innerText = response.forecast.forecastday[1].day.maxtemp_c;
        maxTemp2.innerText = response.forecast.forecastday[2].day.maxtemp_c;
        maxTemp3.innerText = response.forecast.forecastday[3].day.maxtemp_c;
        maxTemp4.innerText = response.forecast.forecastday[4].day.maxtemp_c;
        maxTemp5.innerText = response.forecast.forecastday[5].day.maxtemp_c;
        minTemp1.innerText = response.forecast.forecastday[1].day.mintemp_c;
        minTemp2.innerText = response.forecast.forecastday[2].day.mintemp_c;
        minTemp3.innerText = response.forecast.forecastday[3].day.mintemp_c;
        minTemp4.innerText = response.forecast.forecastday[4].day.mintemp_c;
        minTemp5.innerText = response.forecast.forecastday[5].day.mintemp_c;
        console.log(response.forecast.forecastday[0].date);
    });
});
} else {
    console.log("Please Allow Location Permissions");
}