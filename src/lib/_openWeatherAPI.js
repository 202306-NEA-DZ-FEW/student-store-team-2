/**
 * The above code exports two async functions, `getGeocodeByCity` and `reverseGeocode`, which make API
 * calls to the OpenWeather API for geocoding and reverse geocoding respectively.
 * @param city - The city parameter is the name of the city for which you want to retrieve geocode
 * information.
 * @param stateCode - The `stateCode` parameter is used to specify the state code or abbreviation of
 * the location you want to get geocode data for. It is an optional parameter and can be provided as a
 * string value.
 * @param countryCode - The countryCode parameter is a two-letter country code that represents the
 * country where the city is located. For example, "US" for United States, "GB" for United Kingdom,
 * "CA" for Canada, etc.
 * @param [limit=3] - The `limit` parameter is used to specify the maximum number of results to be
 * returned by the API. For the `getGeocodeByCity` function, it determines the maximum number of
 * geocoding results to be returned for a given city, state code, and country code combination. For the
 * @returns The `getGeocodeByCity` function returns a Promise that resolves to the geocode data for the
 * specified city, state code, and country code.
 */
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

/**
 * The `reverseGeocode` function is an asynchronous function that takes latitude and longitude
 * coordinates as input and returns reverse geocoding data from the OpenWeather API.
 * @param lat - The latitude of the location for which you want to perform reverse geocoding.
 * @param lon - The `lon` parameter represents the longitude coordinate of a location. It is used in
 * the reverse geocoding process to retrieve the address or location information associated with the
 * given latitude and longitude coordinates.
 * @param [limit=1] - The `limit` parameter specifies the maximum number of results to be returned by
 * the reverse geocoding API. By default, it is set to 1, meaning that only the top result will be
 * returned. However, you can provide a different value for `limit` if you want to retrieve multiple
 * @returns the data obtained from the reverse geocoding API call.
 */
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
        throw ("Error in reverse geocoding:", error);
    }
}
