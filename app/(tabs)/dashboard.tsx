import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { useAuthStore } from "@/src/store/authStore";
import { storage } from "@/src/utils/storage";
import AttendanceCard from "../../src/components/AttendanceCard";
import AttendanceTable from "../../src/components/AttendanceTable";
import { styles } from "../../src/components/DashboardStyles";
import Header from "../../src/components/Header";
import Pagination from "../../src/components/Pagination";
import TabSection from "../../src/components/TabSection";
import { useAbsence, useAbsenceIn, useAbsenceOut } from "../../src/hooks/useAbsence";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"masuk" | "keluar">("masuk");
  const [currentPage, setCurrentPage] = useState(1);
  const [rfidCode, setRfidCode] = useState("");
  const [userShift, setUserShift] = useState<any>(null);

  const inputRef = useRef<TextInput>(null); // ref untuk input

  // ambil user dari zustand
  const user = useAuthStore((state: any) => state.user);
  const setUser = useAuthStore((state: any) => state.setUser);

  // load user + shift dari storage
  useEffect(() => {
    const loadUserAndShift = async () => {
      const savedUser = await storage.get("user");
      const savedShift = await storage.get("shift");

      if (savedUser) setUser(savedUser);
      if (savedShift) setUserShift(savedShift);
    };
    loadUserAndShift();
  }, []);

  // ambil absensi dari API
  const shiftId = userShift?.id || 74;
  const { data, isLoading, error } = useAbsence(shiftId, currentPage, activeTab);

  const absences = data?.data || [];
  const totalItems = data?.meta?.total || 0;
  const totalPages = data?.meta?.last_page || 1;

  // mutation absen masuk & keluar
  const absenceInMutation = useAbsenceIn();
  const absenceOutMutation = useAbsenceOut();

  // submit otomatis kalau sudah 8 digit
  useEffect(() => {
    if (rfidCode.length === 8) {
      handleSubmit();
    }
  }, [rfidCode]);

  const handleSubmit = () => {
    if (!rfidCode) return;

    if (activeTab === "masuk") {
      absenceInMutation.mutate({ rfidCode, shiftId });
    } else {
      absenceOutMutation.mutate({ rfidCode });
    }

    setRfidCode(""); // reset input setelah submit

    // fokus ulang biar input selalu aktif
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleTabChange = (tab: "masuk" | "keluar") => {
    setActiveTab(tab);
    setCurrentPage(1);
    setRfidCode("");

    // fokus ulang tiap kali tab ganti
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentMutation =
    activeTab === "masuk" ? absenceInMutation : absenceOutMutation;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header userName={user?.name || "Guest"} />

        <AttendanceCard
          totalEmployees={totalItems}
          shift={userShift ? userShift?.type + " " + userShift?.ke : "Shift -"}
        />

        {/* Input Kode RFID */}
        <View style={{ marginBottom: 8, paddingHorizontal: 16 }}>
          <TextInput
            ref={inputRef}
            value={rfidCode}
            onChangeText={setRfidCode}
            placeholder="Kode RFID"
            keyboardType="numeric"
            maxLength={8}
            autoFocus
            editable={!currentMutation.isPending}
            style={{
              width: "100%",
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 12,
              fontSize: 14,
              backgroundColor: "#fff",
            }}
          />
          {currentMutation.isPending && (
            <ActivityIndicator size="small" style={{ marginTop: 8 }} />
          )}
        </View>

        <TabSection activeTab={activeTab} onTabChange={handleTabChange} />

        {isLoading ? (
          <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        ) : error ? (
          <Text style={{ color: "red", padding: 16 }}>Gagal memuat data</Text>
        ) : (
          <AttendanceTable
            employees={absences.map((item, index) => ({
              no: (currentPage - 1) * 10 + (index + 1),
              id: item.karyawan?.id_karyawan.toString(),
              name: item.karyawan?.nama_karyawan,
              checkIn: item.jam_masuk || "-",
              checkOut: item.jam_keluar || "-",
            }))}
            timeLabel={activeTab === "masuk" ? "Jam Masuk" : "Jam Keluar"}
            activeTab={activeTab}
            currentPage={currentPage}
            itemsPerPage={10}
          />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={10}
          onPageChange={handlePageChange}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
