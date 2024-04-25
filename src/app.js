// Carga de datos de Madrid por defecto
document.addEventListener('DOMContentLoaded', () => {
    loadWeather('Madrid');
});

document.getElementById('searchWeather').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value.trim();
    if (city) {
        loadWeather(city);
    } else {
        alert("Por favor, introduce el nombre de una ciudad.");
    }
});

function loadWeather(city) {
    const apiKey = 'TU_CLAVE_DE_API';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=es`;

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('La respuesta de la red no es correcta' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log("Respuesta completa de la API:", data);
        updateWeatherDisplay(data);
        const weatherContainer = document.getElementById('weather');
        updateBackgroundImage(city, weatherContainer);
    })
    .catch(error => {
        console.error('Error al obtener los datos meteorológicos:', error);
        alert("No se pudo cargar la información del clima. Asegúrate de que el nombre de la ciudad es correcto.");
    });
}

function updateWeatherDisplay(data) {
    document.getElementById('cityName').textContent = data.name || 'Ciudad no encontrada';
    document.getElementById('temperature').firstElementChild.textContent = data.main?.temp;
    document.getElementById('temperature_max').firstElementChild.textContent = data.main?.temp_max;
    document.getElementById('temperature_min').firstElementChild.textContent = data.main?.temp_min;
    document.getElementById('humidity').firstElementChild.textContent = data.main?.humidity;
    document.getElementById('wind').firstElementChild.textContent = data.wind?.speed;

    //const iconCode = data.weather[0]?.icon;
    //const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
   // document.getElementById('weatherIcon').src = iconUrl;
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

//Función para agregar imagenes de background a las ciudades establecida por defecto Madrid
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

// Función NO implementada para mejorar dependiendo de la hora y clima
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

