// This MUST be moved to a .env file in the future
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const NEARBY_SEARCH_URL = "https://maps.googleapis.com/v1/places:searchNearby";

const DEFAULT_RADIUS = 1000; // 1000 meters
const DEFAULT_LATITUDE = 29.44386
const DEFAULT_LONGITUDE = -98.49026

// This field mask is a cost saving measure to only fetch the necessary data
const FIELD_MASK = 'places.displayName,places.photos,places.location,places.formattedAddress';

/** 
 * Search for nearby places using the Google Places API
 * @param {number} latitude - The latitude of the search
 * @param {number} longitude - The longitude of the search
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of place objects
 */
export const fetchRestaurants = async (
    latitude = DEFAULT_LATITUDE,
    longitude = DEFAULT_LONGITUDE
  ) => {
    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_API_KEY,
      // The cost-saving header field mask defined above
      'X-Goog-FieldMask': FIELD_MASK
    };
  
    const requestBody = {
      // We only want places categorized as restaurants
      includedTypes: ["restaurant"],
      // How many cards we want to fetch at once
      maxResultCount: 15, 
      // Define the circle to search within
      locationRestriction: {
        circle: {
          center: { latitude, longitude },
          radius: DEFAULT_RADIUS
        }
      }
    };
  
    try {
      // 1. Send the POST request
      const response = await fetch(NEARBY_SEARCH_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
      });
  
      // 2. Check for HTTP errors (e.g., 400 Bad Request, 500 Server Error)
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Google API request failed: ${response.status} - ${errorText}`);
      }
  
      // 3. Parse the JSON response
      const data = await response.json();
      
      // 4. Return the array of places (restaurants)
      return data.places || []; 
  
    } catch (error) {
      console.error("Error in fetchRestaurants:", error.message);
      // Return an empty array so the app doesn't crash if the API fails
      return []; 
    }
  };