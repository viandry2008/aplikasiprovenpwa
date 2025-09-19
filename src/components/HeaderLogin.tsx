import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo_smarthrm.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Image 
        source={require('../assets/pic1.png')} 
        style={styles.illustration}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 0,  
    paddingBottom: 0, 
  },
  logoContainer: {
    marginBottom: 0, 
  },
  logo: {
    width: 200,
    height: 200,
  },
  illustration: {
    width: 480,
    height: 300,
    marginTop: -50,  
    marginBottom: -8, 
  },
});
