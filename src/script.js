const date = new Date();
const daysArray = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const monthsArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const icon = document.querySelector(".icon");
const currentTemp = document.querySelector(".current-temp");
const currentStatus = document.querySelector(".status");
const currentDay = document.querySelector(".current-day");
const currentDate = document.querySelector(".current-date");
const currentMonth = document.querySelector(".current-month");
const currentLocation = document.querySelector(".current-location");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity-value");
const visibility = document.querySelector(".visibility-value");
const airPressure = document.querySelector(".air-pressure-value");
const date2 = document.querySelector(".date-2");
const date3 = document.querySelector(".date-3");
const date4 = document.querySelector(".date-4");
const date5 = document.querySelector(".date-5");
const forecastIcon1 = document.querySelector(".icon-1");
const forecastIcon2 = document.querySelector(".icon-2");
const forecastIcon3 = document.querySelector(".icon-3");
const forecastIcon4 = document.querySelector(".icon-4");
const forecastIcon5 = document.querySelector(".icon-5");
const maxTemp1 = document.querySelector(".max-1");
const maxTemp2 = document.querySelector(".max-2");
const maxTemp3 = document.querySelector(".max-3");
const maxTemp4 = document.querySelector(".max-4");
const maxTemp5 = document.querySelector(".max-5");
const minTemp1 = document.querySelector(".min-1");
const minTemp2 = document.querySelector(".min-2");
const minTemp3 = document.querySelector(".min-3");
const minTemp4 = document.querySelector(".min-4");
const minTemp5 = document.querySelector(".min-5");
const locationButton = document.querySelector(".location-btn");

currentDay.innerText = daysArray[date.getDay()];
currentDate.innerText = date.getDate();
currentMonth.innerText = monthsArray[date.getMonth()];

let latitude = null;
let longitude = null;
let cityName = null;

const getWeatherData = async (city) => {
  let API_URL = `https://openweather43.p.rapidapi.com/forecast?q=${city}&units=metric`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '1aa5352f55mshe60efbf572f528dp1bd433jsn37153de078cd',
      'X-RapidAPI-Host': 'openweather43.p.rapidapi.com'
    }
  };
  try {
    const response = await fetch(API_URL, options)
    const data = await response.json();
    return data
  }
  catch (error) {
    console.log(`Error: ${error}`);
  }

};

const getLocationName = async (latitude, longitude) => {
  let API_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.log("Can't get location information, ", error);
  }
}

const getLocationCoordinates = async () => {
  if ("geolocation" in navigator) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      })

      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      const getCityName = await getLocationName(latitude, longitude);
      cityName = getCityName.city.toLowerCase();

      const weatherData = await getWeatherData(cityName);
      // console.log(weatherData);
      // icon.src = response.current.condition.icon;
      currentTemp.innerText = Math.ceil(weatherData.list[0].main.temp);
      currentStatus.innerText = weatherData.list[0].weather[0].main;
      currentLocation.innerText = weatherData.city.name;
      windSpeed.innerText = Math.ceil(weatherData.list[0].wind.speed);
      humidity.innerText = weatherData.list[0].main.humidity;
      visibility.innerText = weatherData.list[0].visibility / 1000;
      airPressure.innerText = weatherData.list[0].main.pressure;
      date2.innerText = `${daysArray[(date.getDay() + 2) % 7]}, ${date.getDate() + 2
        } ${monthsArray[date.getMonth()]}`;
      date3.innerText = `${daysArray[(date.getDay() + 3) % 7]}, ${date.getDate() + 3
        } ${monthsArray[date.getMonth()]}`;
      date4.innerText = `${daysArray[(date.getDay() + 4) % 7]}, ${date.getDate() + 4
        } ${monthsArray[date.getMonth()]}`;
      date5.innerText = `${daysArray[(date.getDay() + 5) % 7]}, ${date.getDate() + 5
        } ${monthsArray[date.getMonth()]}`;
      // forecastIcon1.src = response.forecast.forecastday[1].day.condition.icon;
      // forecastIcon2.src = response.forecast.forecastday[2].day.condition.icon;
      // forecastIcon3.src = response.forecast.forecastday[3].day.condition.icon;
      // forecastIcon4.src = response.forecast.forecastday[4].day.condition.icon;
      // forecastIcon5.src = response.forecast.forecastday[5].day.condition.icon;
      maxTemp1.innerText = Math.ceil(weatherData.list[1].main.temp_max);
      maxTemp2.innerText = Math.ceil(weatherData.list[2].main.temp_max);
      maxTemp3.innerText = Math.ceil(weatherData.list[3].main.temp_max);
      maxTemp4.innerText = Math.ceil(weatherData.list[4].main.temp_max);
      maxTemp5.innerText = Math.ceil(weatherData.list[5].main.temp_max);
      minTemp1.innerText = Math.round(weatherData.list[1].main.temp_min);
      minTemp2.innerText = Math.round(weatherData.list[2].main.temp_min);
      minTemp3.innerText = Math.round(weatherData.list[3].main.temp_min);
      minTemp4.innerText = Math.round(weatherData.list[4].main.temp_min);
      minTemp5.innerText = Math.round(weatherData.list[5].main.temp_min);
    }
    catch (error) {
      console.log(`Error: ${error}`);
    }
  }
}

locationButton.addEventListener("click", getLocationCoordinates);
