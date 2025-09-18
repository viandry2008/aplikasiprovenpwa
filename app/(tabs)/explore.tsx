import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';

export default function ExploreScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<View style={styles.headerBox} />}
    >
      <ThemedText type="title">Explore Page</ThemedText>
      <ThemedText>
        Halaman ini masih kosong, kamu bisa isi sesuai kebutuhan.
      </ThemedText>
      <ExternalLink href="https://expo.dev">Baca dokumentasi Expo</ExternalLink>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerBox: {
    height: 200,
    backgroundColor: Platform.select({
      ios: '#ccc',
      android: '#999',
      default: '#666',
    }),
  },
});
