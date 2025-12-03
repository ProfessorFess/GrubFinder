import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { registerRootComponent } from 'expo';

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Safe Mode Works!</Text>
      <Text style={styles.subText}>If you see this, the connection is good.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90EE90', // Light green
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
  }
});

// This line is required for Expo to launch the app correctly
registerRootComponent(App);