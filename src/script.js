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
const mainIcon = document.querySelector(".main-icon");
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
const forecastIcon1 = document.querySelector(".tomorrow-icon");
const forecastIcon2 = document.querySelector(".day-after-tomorrow-icon");
const maxTemp1 = document.querySelector(".max-1");
const maxTemp2 = document.querySelector(".max-2");
const minTemp1 = document.querySelector(".min-1");
const minTemp2 = document.querySelector(".min-2");
const locationButton = document.querySelector(".location-btn");

currentDay.innerText = daysArray[date.getDay()];
currentDate.innerText = date.getDate();
currentMonth.innerText = monthsArray[date.getMonth()];

let latitude = null;
let longitude = null;

const getWeatherData = async () => {
  let API_URL = `http://api.weatherapi.com/v1/forecast.json?key=afd1118f873b47bf99d170312231508&q=${latitude},${longitude}&days=3&aqi=no&alerts=no`;
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

const getWeatherIcon = (iconCode, isDay) => {
  switch (iconCode) {
    case 1000:
      if (iconCode === 1000 && isDay === 1)
        return 'wi-yahoo-32'
      else
        return 'wi-yahoo-31'

    case 1003:
      return 'wi-yahoo-28'

    case 1006:
      return 'wi-yahoo-26'

    case 1009:
      return 'wi-yahoo-26'

    case 1030:
      return 'wi-yahoo-20'

    case 1063:
      return 'wi-yahoo-35'

    case 1066:
      return 'wi-yahoo-13'

    case 1069:
      return 'wi-sleet'

    case 1072:
      return 'wi-yahoo-9'

    case 1087:
      return 'wi-yahoo-3'

    case 1114:
      return 'wi-yahoo-15'

    case 1117:
      return 'wi-yahoo-43'

    case 1135:
      return 'wi-yahoo-20'

    case 1147:
      return 'wi-yahoo-20'

    case 1150:
      return 'wi-yahoo-11'

    case 1153:
      return 'wi-yahoo-11'

    case 1168:
      return 'wi-yahoo-11'

    case 1171:
      return 'wi-yahoo-11'

    case 1180:
      return 'wi-yahoo-11'

    case 1183:
      return 'wi-yahoo-11'

    case 1186:
      return 'wi-yahoo-11'

    case 1189:
      return 'wi-yahoo-11'

    case 1192:
      return 'wi-yahoo-11'

    case 1195:
      return 'wi-yahoo-11'

    case 1198:
      return 'wi-yahoo-11'

    case 1201:
      return 'wi-yahoo-11'

    case 1204:
      return 'wi-sleet'

    case 1207:
      return 'wi-sleet'

    case 1210:
      return 'wi-yahoo-13'

    case 1213:
      return 'wi-yahoo-13'

    case 1216:
      return 'wi-yahoo-13'

    case 1219:
      return 'wi-yahoo-13'

    case 1222:
      return 'wi-yahoo-13'

    case 1225:
      return 'wi-yahoo-13'

    case 1237:
      return 'wi-yahoo-13'

    case 1240:
      return 'wi-yahoo-13'

    case 1243:
      return 'wi-yahoo-13'

    case 1246:
      return 'wi-yahoo-13'

    case 1249:
      return 'wi-yahoo-13'

    case 1252:
      return 'wi-yahoo-13'

    case 1255:
      return 'wi-yahoo-25'

    case 1258:
      return 'wi-yahoo-25'

    case 1261:
      return 'wi-yahoo-25'

    case 1264:
      return 'wi-yahoo-25'

    case 1273:
      return 'wi-yahoo-3'

    case 1276:
      return 'wi-yahoo-3'

    case 1279:
      return 'wi-yahoo-46'

    case 1282:
      return 'wi-yahoo-46'
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

      const weatherData = await getWeatherData();
      console.log(weatherData);
      mainIcon.classList.add(getWeatherIcon(weatherData.current.condition.code, weatherData.current.is_day), 'text-white');
      currentTemp.innerText = weatherData.current.temp_c;
      currentStatus.innerText = weatherData.current.condition.text;
      currentLocation.innerText = weatherData.location.name;
      windSpeed.innerText = weatherData.current.wind_kph;
      humidity.innerText = weatherData.current.humidity;
      visibility.innerText = weatherData.current.vis_km;
      airPressure.innerText = weatherData.current.pressure_mb;
      date2.innerText = `${daysArray[(date.getDay() + 2) % 7]}, ${date.getDate() + 2
        } ${monthsArray[date.getMonth()]}`;
      forecastIcon1.classList.add(getWeatherIcon(weatherData.forecast.forecastday[1].day.condition.code, 1), 'text-white');
      forecastIcon2.classList.add(getWeatherIcon(weatherData.forecast.forecastday[2].day.condition.code, 1), 'text-white');
      maxTemp1.innerText = weatherData.forecast.forecastday[1].day.maxtemp_c;
      maxTemp2.innerText = weatherData.forecast.forecastday[2].day.maxtemp_c;
      minTemp1.innerText = weatherData.forecast.forecastday[1].day.mintemp_c;
      minTemp2.innerText = weatherData.forecast.forecastday[2].day.mintemp_c;
    }
    catch (error) {
      console.log(`Error: ${error}`);
    }
  }
}

locationButton.addEventListener("click", getLocationCoordinates);
