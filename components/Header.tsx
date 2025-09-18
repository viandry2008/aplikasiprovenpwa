import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router'; // ✅ import router
import React, { useState } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

interface HeaderProps {
  userName: string;
}

const { width } = Dimensions.get('window');

export default function Header({ userName }: HeaderProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  // === Fungsi Sapaan Dinamis ===
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) return "Selamat Pagi";
    if (hour >= 12 && hour < 15) return "Selamat Siang";
    if (hour >= 15 && hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  // === Format Hari & Tanggal ===
  const getFormattedDate = () => {
    const date = new Date();
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${dayName}, ${day} ${month} ${year}`;
  };

  const handleLogoutPress = () => {
    setShowConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowConfirm(false);

    // ✅ Tampilkan toast
    Toast.show({
      type: 'success',
      text1: 'Berhasil Keluar',
      text2: 'Anda berhasil keluar dari aplikasi 👋',
      position: 'top',
      visibilityTime: 2000,
    });

    // ✅ Redirect ke halaman login setelah 2 detik
    setTimeout(() => {
      router.replace('/login');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Row Logo + Logout */}
      <View style={styles.topRow}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo_smarthrm.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Greeting */}
      <View style={styles.greetingSection}>
        <Text style={styles.greeting}>{getGreeting()}, {userName}</Text>
        <Text style={styles.subtitle}>Selamat Beraktivitas. {getFormattedDate()}</Text>
      </View>

      {/* Modal Konfirmasi */}
      <Modal transparent visible={showConfirm} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              Apakah anda yakin ingin keluar dari Aplikasi?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#9CA3AF' }]}
                onPress={() => setShowConfirm(false)}
              >
                <Text style={styles.modalButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#EF4444' }]}
                onPress={handleConfirmLogout}
              >
                <Text style={styles.modalButtonText}>Yakin</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 0,
    backgroundColor: '#fff',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  logo: {
    width: 200,
    height: 60,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  greetingSection: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
