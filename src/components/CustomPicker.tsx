import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './CustomPickerStyles';


interface PickerOption {
  label: string;
  value: any;
}

interface CustomPickerProps {
  selectedValue: any;
  onValueChange: (value: any) => void;
  options: PickerOption[];
}

export default function CustomPicker({ selectedValue, onValueChange, options }: CustomPickerProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find(option => option.value?.id === selectedValue?.id);

  const handleSelect = (value: any) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity style={styles.picker} onPress={() => setModalVisible(true)}>
        <Text style={styles.pickerText}>
          {selectedOption?.label || 'Pilih Shift'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pilih Shift</Text>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value.id}
                style={[
                  styles.option,
                  selectedValue?.id === option.value.id && styles.selectedOption
                ]}
                onPress={() => handleSelect(option.value)}
              >
                <Text style={[
                  styles.optionText,
                  selectedValue?.id === option.value.id && styles.selectedOptionText
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}