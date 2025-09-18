import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import CustomPicker from '../components/CustomPicker';
import Footer from '../components/Footer';
import { styles } from '../components/LoginFormStyles';

import Logo from '../assets/logo_smarthrm.png';
import Pic1 from '../assets/pic1.png';

const DUMMY_ACCOUNTS = [
  { username: 'admin', password: 'admin123' },
  { username: 'user1', password: 'user123' },
  { username: 'user2', password: 'user234' },
];

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedShift, setSelectedShift] = useState('shift1');
  const [showPassword, setShowPassword] = useState(false);

  const shiftOptions = [
    { label: 'Shift 1 (07:00–15:00)', value: 'shift1' },
    { label: 'Shift 2 (15:00–23:00)', value: 'shift2' },
    { label: 'Shift 3 (23:00–07:00)', value: 'shift3' },
  ];

  const handleLogin = () => {
    const account = DUMMY_ACCOUNTS.find(
      acc => acc.username === username && acc.password === password
    );

    if (!account) {
      // ❌ Toast error
      Toast.show({
        type: 'error',
        text1: 'Login Gagal ❌',
        text2: 'Username atau password salah',
        position: 'top',
        visibilityTime: 1500,
      });
      return;
    }

    // ✅ Toast sukses
    Toast.show({
      type: 'success',
      text1: 'Login Berhasil 🎉',
      text2: `Selamat datang, ${username}`,
      position: 'top',
      visibilityTime: 1200,
    });

    // Delay sebentar sebelum pindah ke dashboard
    setTimeout(() => {
      router.push({
        pathname: '/dashboard',
        params: { username, shift: selectedShift },
      });
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <View style={{ width: '100%', maxWidth: 400, alignItems: 'center' }}>
            {/* Logo */}
            <Image
              source={Logo}
              style={{
                width: 180,
                height: 80,
                resizeMode: 'contain',
                marginBottom: 20,
              }}
            />
            {/* Banner */}
            <Image
              source={Pic1}
              style={{
                width: '100%',
                height: 250,
                resizeMode: 'cover',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
            />

            <View style={styles.card}>
              <Text style={styles.title}>Manajemen RFID Absen</Text>

              {/* Username */}
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="#666"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#999"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Password */}
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#666"
                  style={styles.icon}
                />
                <TextInput
                  style={[styles.input, { paddingRight: 50 }]}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>

              {/* Shift Picker */}
              <View style={styles.pickerContainer}>
                <CustomPicker
                  selectedValue={selectedShift}
                  onValueChange={setSelectedShift}
                  options={shiftOptions}
                />
              </View>

              {/* Tombol Login */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Masuk</Text>
              </TouchableOpacity>
            </View>

            <Footer />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
