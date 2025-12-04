import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { fetchRestaurants } from '../api/googlePlaces';

// We need the key to load photos
const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

export default function SwipeScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const places = await fetchRestaurants();
      // Filter out places that don't have photos (optional, but looks better)
      const validPlaces = places.filter(p => p.photos && p.photos.length > 0);
      setRestaurants(validPlaces);
    } catch (error) {
      console.error("Failed to load cards", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to build the Google Photo URL
  const getPhotoUrl = (photoName) => {
    return `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=400&maxWidthPx=400&key=${GOOGLE_API_KEY}`;
  };

  const renderCard = (card) => {
    // If the card is undefined (end of stack), return null
    if (!card) return null;

    const photoName = card.photos?.[0]?.name;
    const imageUrl = photoName ? getPhotoUrl(photoName) : 'https://via.placeholder.com/400';

    return (
      <View style={styles.card}>
        <Image source={{ uri: imageUrl }} style={styles.cardImage} />
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>{card.displayName.text}</Text>
          <Text style={styles.cardAddress}>{card.formattedAddress}</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Finding Grub...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.swiperContainer}>
        {restaurants.length > 0 ? (
          <Swiper
            cards={restaurants}
            renderCard={renderCard}
            onSwipedRight={(cardIndex) => console.log('YUM:', restaurants[cardIndex].displayName.text)}
            onSwipedLeft={(cardIndex) => console.log('PASS:', restaurants[cardIndex].displayName.text)}
            backgroundColor={'transparent'}
            stackSize={3}
            cardIndex={0}
            animateCardOpacity
            verticalSwipe={false} // Disable vertical swipe for now
          />
        ) : (
          <Text>No restaurants found nearby.</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperContainer: {
    flex: 1,
    // Provide some padding so cards don't hit the very edge
    marginTop: -20, 
  },
  card: {
    flex: 0.75, // Take up 75% of the screen height
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  cardDetails: {
    padding: 20,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardAddress: {
    fontSize: 16,
    color: 'gray',
  },
});