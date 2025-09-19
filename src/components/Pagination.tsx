import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './PaginationStyles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage,
  onPageChange 
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Menampilkan {startItem} sampai {endItem} dari {totalItems} Data
      </Text>
      
      <View style={styles.paginationControls}>
        <TouchableOpacity
          style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
          onPress={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Text style={[styles.pageButtonText, currentPage === 1 && styles.disabledText]}>
            Sebelumnya
          </Text>
        </TouchableOpacity>
        
        {[...Array(totalPages)].map((_, index) => (
          <TouchableOpacity
            key={index + 1}
            style={[
              styles.pageButton,
              styles.pageNumberButton,
              currentPage === index + 1 && styles.activePageButton
            ]}
            onPress={() => onPageChange(index + 1)}
          >
            <Text style={[
              styles.pageButtonText,
              currentPage === index + 1 && styles.activePageText
            ]}>
              {index + 1}
            </Text>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity
          style={[styles.pageButton, currentPage === totalPages && styles.disabledButton]}
          onPress={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Text style={[styles.pageButtonText, currentPage === totalPages && styles.disabledText]}>
            Berikutnya
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}