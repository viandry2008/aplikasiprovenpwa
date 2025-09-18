import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        © 2025 PT Proven Force Indonesia. All rights reserved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});