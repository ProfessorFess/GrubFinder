import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// 1. Import your new API file!
import { fetchRestaurants } from '../api/googlePlaces';

export default function ApiTestScreen() {
  
  useEffect(() => {
    // 2. Run the function when the app starts
    const testApi = async () => {
      console.log("--- Starting API Test ---");
      const places = await fetchRestaurants();
      
      if (places.length > 0) {
        console.log("SUCCESS! Fetched", places.length, "restaurants.");
        console.log("First restaurant name:", places[0].displayName.text);
      } else {
        console.log("FAILURE: Received 0 restaurants. Check API Key and billing status.");
      }
      console.log("--- Test Complete ---");
    };

    testApi();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Checking Console for API Results...</Text>
      <Text>Open your terminal where you ran 'npx expo start' to see the output.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
});