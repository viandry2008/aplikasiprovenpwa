import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './login';

const queryClient = new QueryClient();

export default function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Login />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
