import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';

import Dashboard from './app/(tabs)/dashboard';
import LoginForm from './app/login';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export type RootStackParamList = {
  Login: undefined;
  Dashboard: { username: string; shift: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load all icon fonts
        await Font.loadAsync({
          Ionicons: require("./assets/fonts/Ionicons.ttf"),
          MaterialIcons: require("./assets/fonts/MaterialIcons.ttf"),
          FontAwesome: require("./assets/fonts/FontAwesome.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Hide splash screen once fonts are ready
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    // tetap menampilkan splash screen bawaan, jangan render apapun
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
