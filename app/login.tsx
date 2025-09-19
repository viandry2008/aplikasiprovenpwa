import { useLogin } from '@/src/hooks/useAuth';
import { useShifts } from '@/src/hooks/useShift';
import { storage } from '@/src/utils/storage';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
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
import CustomPicker from '../src/components/CustomPicker';
import Footer from '../src/components/Footer';
import { styles } from '../src/components/LoginFormStyles';

// const DUMMY_ACCOUNTS = [
//   { username: 'admin', password: 'admin123' },
//   { username: 'user1', password: 'user123' },
//   { username: 'user2', password: 'user234' },
// ];

export default function LoginForm() {
  const loginMutation = useLogin();
  const { data, isLoading } = useShifts();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedShift, setSelectedShift] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  // fallback shift kalau API kosong
  const shiftOptions = data?.data?.map((shift: any) => ({
    label: `${shift.type} ${shift.ke} (${shift.waktu_mulai}–${shift.waktu_selesai})`,
    value: shift.id.toString(), // pastikan string
  })) || [
      { label: 'Shift 1 (07:00–15:00)', value: 'shift1' },
      { label: 'Shift 2 (15:00–23:00)', value: 'shift2' },
      { label: 'Shift 3 (23:00–07:00)', value: 'shift3' },
    ];

  const handleLogin = () => {
    if (!username || !password) {
      Toast.show({
        type: 'error',
        text1: 'Login Gagal ❌',
        text2: 'Username dan password wajib diisi',
        position: 'top',
        visibilityTime: 1500,
      });
      return;
    }

    if (!selectedShift) {
      Toast.show({
        type: 'error',
        text1: 'Pilih Shift ⏰',
        text2: 'Anda harus memilih shift sebelum login',
        position: 'top',
        visibilityTime: 1500,
      });
      return;
    }

    loginMutation.mutate(
      { username, password },
      {
        onSuccess: async (res) => {
          // simpan shift ke local
          await storage.set('shift', selectedShift);

          Toast.show({
            type: 'success',
            text1: 'Login Berhasil 🎉',
            text2: `Selamat datang, ${res.conntent.name}`,
            position: 'top',
            visibilityTime: 1200,
          });

          setTimeout(() => {
            router.push('/dashboard');
          }, 1000);
        },
        onError: () => {
          Toast.show({
            type: 'error',
            text1: 'Login Gagal ❌',
            text2: 'Periksa kembali username/password',
            position: 'top',
            visibilityTime: 1500,
          });
        },
      }
    );
  };


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Memuat shift...</Text>
      </View>
    );
  }

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
              source={require('../assets/logo_smarthrm.png')}
              style={{
                width: 180,
                height: 80,
                resizeMode: 'contain',
                marginBottom: 20,
              }}
            />
            {/* Banner */}
            <Image
              source={require('../assets/pic1.png')}
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

              {/* Button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginButtonText}>Masuk</Text>
                )}
              </TouchableOpacity>

            </View>

            <Footer />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
