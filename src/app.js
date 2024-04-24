
function loadWeather(city) {
    const apiKey = 'TU_CLAVE_DE_API';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=es`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        // Con iconos
        //const weatherCondition = data.weather[0].main;
        //const iconCode = data.weather[0].icon;
        //const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
        //document.getElementById('weatherIcon').src = iconUrl;
        
        // Con imagen de background
        const weatherContainer = document.getElementById('weather');
        updateWeatherInfo(data);
        updateBackgroundImage(city, weatherContainer);

        // Cambiar colores de los botones según el clima
        updateButtonStyles(weatherCondition);
    })
    .catch(error => {
        console.error('Error al obtener los datos meteorológicos:', error);
    });
}

function updateWeatherInfo(data) {
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('temperature').firstElementChild.textContent = data.main.temp;
    document.getElementById('temperature_max').firstElementChild.textContent = data.main.temp_max;
    document.getElementById('temperature_min').firstElementChild.textContent = data.main.temp_min;
    document.getElementById('humidity').firstElementChild.textContent = data.main.humidity;
    document.getElementById('wind').firstElementChild.textContent = data.wind.speed;
}

//Función para agregar imagenes de background a las ciudades
function updateBackgroundImage(city, container) {
    const cityBackgrounds = {
        'Madrid': 'url(../img/madrid.jpg)',
        'Caracas': 'url(../img/caracas.jpg)',
        'Tokio': 'url(../img/tokio.jpg)',
        'Paris': 'url(../img/paris.jpg)'
    };
    container.style.backgroundImage = cityBackgrounds[city] || 'url(../img/madrid.jpg)';
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';
}

// Event listeners para botones de ciudades
document.querySelectorAll('.city-button').forEach(button => {
    button.addEventListener('click', function() {
        // Remover la clase activa de todos los botones y luego añadirla al seleccionado
        document.querySelectorAll('.city-button').forEach(btn => btn.classList.remove('bg-blue-700', 'text-white'));
        this.classList.add('bg-blue-700', 'text-white');

        loadWeather(this.getAttribute('data-city'));
    });
});

// Carga de datos de Madrid por defecto
document.addEventListener('DOMContentLoaded', () => {
    loadWeather('Madrid');
});

// Función a implementar y mejorar dependiendo de la hora y clima
function updateButtonStyles(condition) {
    const colorScheme = {
        'Clear': 'bg-yellow-500',
        'Clouds': 'bg-gray-500',
        'Rain': 'bg-blue-500',
        'Snow': 'bg-teal-200',
    };
    document.querySelectorAll('.weather-btn').forEach(btn => {
        btn.className = btn.className.replace(/bg-\w+-\d+/g, '');  
        btn.classList.add(colorScheme[condition] || 'bg-gray-300');
    });
}

