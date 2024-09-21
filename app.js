const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

weatherForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const city = cityInput.value;
    getWeather(city);
});

function getWeather(city) {
    const apiKey = 'fb06ece3b09b5231cf9408568b9b638a'; // Your OpenWeatherMap API Key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                weatherResult.innerHTML = `<p>City not found</p>`;
            } else {
                const temp = data.main.temp;
                const description = data.weather[0].description;
                const humidity = data.main.humidity;
                weatherResult.innerHTML = `
                    <p>Temperature: ${temp}°C</p>
                    <p>Condition: ${description}</p>
                    <p>Humidity: ${humidity}%</p>
                `;
            }
        })
        .catch(error => {
            weatherResult.innerHTML = `<p>Error fetching data</p>`;
            console.error(error);
        });
}
