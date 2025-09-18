import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './AttendanceTableStyles';

export default function AttendanceTable({ employees, timeLabel, activeTab, currentPage, itemsPerPage }) {
  return (
    <View style={styles.container}>
      <View style={styles.table}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, styles.noCell]}>No.</Text>
          <Text style={[styles.headerCell, styles.idCell]}>ID</Text>
          <Text style={[styles.headerCell, styles.nameCell]}>Nama</Text>
          <Text style={[styles.headerCell, styles.timeCell]}>{timeLabel}</Text>
        </View>

        {/* Data Rows */}
        {employees.map((emp, index) => {
          const globalIndex = (currentPage - 1) * itemsPerPage + (index + 1); 
          return (
            <View
              key={emp.id}
              style={[
                styles.dataRow,
                index % 2 === 1 ? styles.alternateRow : null,
              ]}
            >
              <Text style={[styles.dataCell, styles.noCell]}>{globalIndex}</Text>
              <Text style={[styles.dataCell, styles.idCell]}>{emp.id}</Text>
              <Text style={[styles.dataCell, styles.nameCell]}>{emp.name}</Text>
              <Text style={[styles.dataCell, styles.timeCell]}>
                {activeTab === 'masuk' ? emp.checkIn : emp.checkOut}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
