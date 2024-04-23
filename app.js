document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'TU_CLAVE_DE_API';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        document.getElementById('cityName').textContent = data.name;
        document.getElementById('temperature').firstElementChild.textContent = data.main.temp;
        document.getElementById('humidity').firstElementChild.textContent = data.main.humidity;
        document.getElementById('wind').firstElementChild.textContent = data.wind.speed;
    })
    .catch(error => {
        console.error('Error fetching the weather data:', error);
    });
});
