const inputBox = document.querySelector('#search input')
const searchBtn = document.querySelector('#search button')
const weatherIcon = document.querySelector('.weather-icon')
const temp = document.querySelector('.temp')
const cityName = document.querySelector('.city-name')
const desc = document.querySelector('.desc')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.Wind')
const error = document.querySelector('#error-parsing')
const weather_data = document.querySelector('#weather')


async function checkWeather(city){
    const api_key = "34b908e0f2789b1fd266a0c6ebdde9f7";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    const weather = await fetch(`${url}`).then(Response => Response.json())

    if(weather.cod === '404'){
       weather_data.style.display = "non"
       error.style.display = "block"
       weatherIcon.src = './png/error-cloud.png'
       temp.style.display = "none"
       desc.style.display = "none"
       cityName.style.display = "none"
       humidity.style.display = "none"
       wind.style.display = "none"
        return;
    }
    weather_data.style.display = "block";
    error.style.display = "none";
    temp.style.display = "block"
    desc.style.display = "block"
    cityName.style.display = "block"
    humidity.style.display = "block"
    wind.style.display = "block"
    temp.innerHTML = `${Math.round(weather.main.temp) + '°C'}`
    humidity.innerHTML = `${weather.main.humidity + '%'}`
    wind.innerHTML = `${Math.round(weather.wind.speed) + 'Km/h'}`
    console.log(weather)
    cityName.innerHTML = `${weather.name.toUpperCase()}`
    desc.innerHTML = `${weather.weather[0].description.toUpperCase()}`
    
    switch(weather.weather[0].main){
        case 'Clouds':
            weatherIcon.src = "./png/clouds.png";
                break;
        case 'Clear':
            weatherIcon.src = "./png/clear.png";
                break;
        case 'Drizzle':
            weatherIcon.src = "./png/drizzle.png";
                break;
        case 'Haze':
            weatherIcon.src = "./png/haze.png";
                break;
        case 'Rain':
            weatherIcon.src = "./png/rain.png";
                break;
        case 'Mist':
             weatherIcon.src = "./png/mist.png";
                break;
        case 'Snow':
            weatherIcon.src = "./png/snow.png";
                break;

    }
}
searchBtn.addEventListener('click', (e)=> {
    e.preventDefault()
    checkWeather(inputBox.value)
})

