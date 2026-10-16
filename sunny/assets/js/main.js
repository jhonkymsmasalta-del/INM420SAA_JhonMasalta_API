console.log('this is test')

const apiKey = "6c36024c09214fff92001639261610";

async function getWeather(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to get weather data");
        }

        const data = await response.json();

        // Display weather information on the website
        document.querySelector("#location").textContent =
            data.location.name;

        document.querySelector("#temperature").textContent =
            `${data.current.temp_c}°C`;

        document.querySelector("#description").textContent =
            data.current.condition.text;

        document.querySelector("#weather-icon").src =
            `https:${data.current.condition.icon}`;

        document.querySelector("#weather-icon").alt =
            data.current.condition.text;

        document.querySelector("#weather-info").hidden = false;

    } catch (error) {
        console.error("Weather API error:", error);
    }
}

// Run when the user chooses a different city
document.querySelector("#city").addEventListener("change", (event) => {
    getWeather(event.target.value);
});

// Load the weather when the page first opens
getWeather("Toronto");