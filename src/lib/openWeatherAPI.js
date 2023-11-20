"use server";

export async function getGeocodeByCity(
    city,
    stateCode,
    countryCode,
    limit = 3
) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${stateCode},${countryCode}&limit=${limit}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Error fetching data from OpenWeather API.");
    }
}

export async function reverseGeocode(lat, lon, limit = 1) {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`;

    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Failed to fetch reverse geocoding data");
        }
    } catch (error) {
        // Handle errors - log, throw, or handle as necessary
        console.error("Error in reverse geocoding:", error);
        throw error;
    }
}
