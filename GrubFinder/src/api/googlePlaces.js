// Ensure this matches your .env file variable name
const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY; 

// FIXED: Changed domain from 'maps.googleapis.com' to 'places.googleapis.com'
const NEARBY_SEARCH_URL = "https://places.googleapis.com/v1/places:searchNearby";

const DEFAULT_RADIUS = 1000;
const DEFAULT_LATITUDE = 29.44386;
const DEFAULT_LONGITUDE = -98.49026;
const FIELD_MASK = 'places.displayName,places.photos,places.location,places.formattedAddress';

export const fetchRestaurants = async (
    latitude = DEFAULT_LATITUDE,
    longitude = DEFAULT_LONGITUDE
  ) => {
    
    // Safety check
    if (!API_KEY) {
        console.error("API Key is missing! Check your .env file.");
        return [];
    }

    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY, 
      'X-Goog-FieldMask': FIELD_MASK
    };
  
    const requestBody = {
      includedTypes: ["restaurant"],
      maxResultCount: 15, 
      locationRestriction: {
        circle: {
          center: { latitude, longitude },
          radius: DEFAULT_RADIUS
        }
      }
    };
  
    try {
      const response = await fetch(NEARBY_SEARCH_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Google API request failed: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      return data.places || []; 
  
    } catch (error) {
      console.error("Error in fetchRestaurants:", error.message);
      return []; 
    }
  };