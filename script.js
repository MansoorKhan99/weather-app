const API_KEY = 'b246a8b3e8742d195d5060e45d65d043'; // API key

function getWeather() {
    const city = document.getElementById('city').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    // Clear the previous result before fetching new data
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            resultContainer.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        });
}

function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

            // Clear the previous result before fetching new data
            const resultContainer = document.getElementById('result');
            resultContainer.innerHTML = '';

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    displayWeather(data);
                })
                .catch(error => {
                    resultContainer.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
                });
        }, () => {
            alert("Unable to retrieve your location.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function displayWeather(data) {
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description.toLowerCase();
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;
    const icon = data.weather[0].icon;
    const city = data.name; // Get the city name

    // Create separate weather cards
    const resultHTML = `
        <div class="weather-cards">
            <div class="card">
                <h3><i class="fas fa-temperature-high"></i> Temperature</h3>
                <p>${temperature.toFixed(1)}°C</p>
            </div>
            <div class="card">
                <h3><i class="fas fa-tint"></i> Humidity</h3>
                <p>${humidity}%</p>
            </div>
            <div class="card">
                <h3><i class="fas fa-wind"></i> Wind Speed</h3>
                <p>${windSpeed} m/s</p>
            </div>
        </div>
        <div id="forecast">
            <h2>Current Weather in ${city}</h2>
            <p>Weather: ${weatherDescription}</p>
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${weatherDescription}">
        </div>
    `;

    // Update the HTML in the result container
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = resultHTML;
}
