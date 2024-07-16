 
// Rename the variable to avoid conflict
var searchInput = document.getElementById('search');

async function fetchWeatherData(value) {
    try {
        var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=bf4830025d1646eb96a155649242106&q=${value}&days=3`);
        if (response.ok) {
            var final_Data = await response.json();
            console.log(final_Data);
            displayCurrent(final_Data);
          
            displayOther(final_Data.forecast.forecastday);
        } else {
            console.error('Error fetching the weather data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching the weather data:', error);
    }
}

// Set up event listener for the search input
searchInput.addEventListener('keyup', function(event) {
       fetchWeatherData(searchInput.value);
    
});

var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function displayCurrent(data) {
    var d = new Date();
    var element = `
        <div class="card bg-black p-5">
            <div class="date d-flex justify-content-between">
                <div class="day m-2">
                    ${dayNames[d.getDay()]}
                </div>
                <div class="month m-2">
                    ${d.getDate()} ${month[d.getMonth()]}
                </div>
            </div>
            <div>${data.location.name}</div>
            <h1>${data.current.temp_c}°C</h1>
            <img src="https:${data.current.condition.icon}" alt="Weather icon" width=90>
            <div>
                <h4>${data.current.condition.text}</h4>
                <span><img src="images/icon-umberella.png" alt="">20%</span>
                <span><img src="images/icon-wind.png" alt="">18km/h</span>
                <span><img src="images/icon-compass.png" alt="">East</span>
            </div>
        </div>`;
    document.getElementById('forecast').innerHTML = element;
}

function displayOther(MyArr) {
    var forechtml = ``;
    for (var i = 1; i < MyArr.length; i++) {  // Start from 1 to skip the current day
        var d = new Date(MyArr[i].date);
        forechtml += `
            <div class="card bg-black p-5">
                <div class="date d-flex justify-content-between">
                    <div class="day m-2">
                        ${dayNames[d.getDay()]}
                    </div>
                    <div class="month m-2">
                        ${d.getDate()} ${month[d.getMonth()]}
                    </div>
                </div>
                <img src="https:${MyArr[i].day.condition.icon}" alt="Weather icon" width=90>
                <h1>${MyArr[i].day.maxtemp_c}°C</h1>
                <h3>${MyArr[i].day.mintemp_c}°C</h3>
                <div>
                    <h4>${MyArr[i].day.condition.text}</h4>
                </div>
            </div>`;
    }
    document.getElementById('forecast').innerHTML += forechtml;  // Append to the existing content
}

// Call the function to fetch and display data initially
fetchWeatherData('cairo');
