import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AttendanceCardProps {
  totalEmployees: number;
  shift: string;
}

export default function AttendanceCard({ totalEmployees, shift }: AttendanceCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kehadiran Hari Ini</Text>
        <Text style={styles.shift}>{shift}</Text>
      </View>
      <Text style={styles.total}>Total: {totalEmployees} Karyawan</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  shift: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  total: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
});