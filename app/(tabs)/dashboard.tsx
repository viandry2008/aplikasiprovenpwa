import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, TextInput, View } from 'react-native';

import { useAuthStore } from '@/src/store/authStore';
import { storage } from '@/src/utils/storage';
import AttendanceCard from '../../src/components/AttendanceCard';
import AttendanceTable from '../../src/components/AttendanceTable';
import { styles } from '../../src/components/DashboardStyles';
import Header from '../../src/components/Header';
import Pagination from '../../src/components/Pagination';
import TabSection from '../../src/components/TabSection';

const employeeData = [
  { no: 1, id: '25031', name: 'Anesty Nuantury', checkIn: '07.00', checkOut: '16.05' },
  { no: 2, id: '25032', name: 'Rayhan', checkIn: '06.50', checkOut: '16.10' },
  { no: 3, id: '25033', name: 'Anida Lestari', checkIn: '06.42', checkOut: '15.55' },
  { no: 4, id: '25034', name: 'Saefudin', checkIn: '06.45', checkOut: '16.00' },
  { no: 5, id: '25035', name: 'Siti Nur Utami', checkIn: '06.50', checkOut: '16.15' },
  { no: 6, id: '25036', name: 'Abdul Basit', checkIn: '06.45', checkOut: '16.20' },
  { no: 7, id: '25037', name: 'Berta Dara', checkIn: '06.47', checkOut: '16.25' },
  { no: 8, id: '25038', name: 'Desi Sumiati', checkIn: '07.30', checkOut: '16.30' },
  { no: 9, id: '25039', name: 'Aniyanti', checkIn: '07.05', checkOut: '16.40' },
  { no: 10, id: '25040', name: 'Yulianti', checkIn: '07.10', checkOut: '16.45' },
  { no: 11, id: '25041', name: 'Fajar Nugraha', checkIn: '07.15', checkOut: '16.50' },
  { no: 12, id: '25042', name: 'Lestari Ayu', checkIn: '07.20', checkOut: '16.55' },
  { no: 13, id: '25043', name: 'Galih Pratama', checkIn: '07.25', checkOut: '17.00' },
  { no: 14, id: '25044', name: 'Hendra Saputra', checkIn: '07.30', checkOut: '17.05' },
  { no: 15, id: '25045', name: 'Intan Permata', checkIn: '07.35', checkOut: '17.10' },
  { no: 16, id: '25046', name: 'Joko Susanto', checkIn: '07.40', checkOut: '17.15' },
  { no: 17, id: '25047', name: 'Kurniawati', checkIn: '07.45', checkOut: '17.20' },
  { no: 18, id: '25048', name: 'Lukman Hakim', checkIn: '07.50', checkOut: '17.25' },
  { no: 19, id: '25049', name: 'Maria Ulfa', checkIn: '07.55', checkOut: '17.30' },
  { no: 20, id: '25050', name: 'Nanda Pratiwi', checkIn: '08.00', checkOut: '17.35' },
];

export default function Dashboard() {

  const [activeTab, setActiveTab] = useState<'masuk' | 'keluar'>('masuk');
  const [currentPage, setCurrentPage] = useState(1);
  const [rfidCode, setRfidCode] = useState(''); // state baru untuk kode RFID

  const itemsPerPage = 10;
  const totalPages = Math.ceil(employeeData.length / itemsPerPage);

  // ambil user dari zustand
  const user = useAuthStore((state: any) => state.user);
  const setUser = useAuthStore((state: any) => state.setUser);
  const [userShift, setUserShift] = useState<any>(null);

  // kalau app di-restart, ambil user dari storage
  useEffect(() => {
    const loadUserAndShift = async () => {
      const savedUser = await storage.get("user");
      const savedShift = await storage.get("shift");

      if (savedUser) setUser(savedUser);
      if (savedShift) setUserShift(savedShift);
    };
    loadUserAndShift();
  }, []);


  const handleTabChange = (tab: 'masuk' | 'keluar') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = employeeData.slice(startIndex, endIndex);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header dengan tombol logout */}
        <Header userName={user?.name || "Guest"} />

        <AttendanceCard
          totalEmployees={employeeData.length}
          shift={userShift ? userShift?.type + ' ' + userShift?.ke : 'Shift -'}
        />

        {/* Input Kode RFID */}
        <View style={{ marginBottom: 8, paddingHorizontal: 16 }}>
          <TextInput
            value={rfidCode}
            onChangeText={setRfidCode}
            placeholder="Kode RFID"
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              padding: 12,
              fontSize: 14,
              backgroundColor: '#fff',
            }}
          />
        </View>

        <TabSection
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <AttendanceTable
          employees={currentData}
          timeLabel={activeTab === 'masuk' ? 'Jam Masuk' : 'Jam Keluar'}
          activeTab={activeTab}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={employeeData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </ScrollView>

    </SafeAreaView>
  );
}
