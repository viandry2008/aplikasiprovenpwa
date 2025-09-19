import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TabSectionProps {
  activeTab: 'masuk' | 'keluar';
  onTabChange: (tab: 'masuk' | 'keluar') => void;
}

export default function TabSection({ activeTab, onTabChange }: TabSectionProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'masuk' && styles.activeTab]}
        onPress={() => onTabChange('masuk')}
      >
        <Text style={[styles.tabText, activeTab === 'masuk' && styles.activeTabText]}>
          Absen Masuk
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tab, activeTab === 'keluar' && styles.activeTab]}
        onPress={() => onTabChange('keluar')}
      >
        <Text style={[styles.tabText, activeTab === 'keluar' && styles.activeTabText]}>
          Absen Keluar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#2794eb',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  activeTabText: {
    color: '#ffffff',
  },
});