import { Ionicons } from "@expo/vector-icons"; // pastikan ada expo/vector-icons
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Modal,
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

  const inputRef = useRef<TextInput>(null);

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
  const currentMutation =
    activeTab === "masuk" ? absenceInMutation : absenceOutMutation;

  const { modal, setModal } = currentMutation;

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
    setRfidCode("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleTabChange = (tab: "masuk" | "keluar") => {
    setActiveTab(tab);
    setCurrentPage(1);
    setRfidCode("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (modal.visible) {
      const timer = setTimeout(() => {
        setModal((prev: any) => ({ ...prev, visible: false }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [modal.visible]);

  useEffect(() => {
    if (!modal.visible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [modal.visible]);

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
            maxLength={8}
            autoFocus
            editable={!currentMutation.isPending}
            showSoftInputOnFocus={false}
            onBlur={() => {
              setTimeout(() => {
                inputRef.current?.focus();
              }, 100);
            }}
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
              id: item.karyawan?.id_karyawan?.toString() || "-",
              name: item.karyawan?.nama_karyawan || "-",
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

      {/* 🔥 Overlay Loading */}
      <Modal transparent visible={currentMutation.isPending} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 24,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large" color="#2794eb" />
            <Text style={{ marginTop: 12, fontSize: 16, color: "#333" }}>
              Memproses absensi...
            </Text>
          </View>
        </View>
      </Modal>

      {/* ✅ Modal Success/Error (auto close) */}
      <Modal transparent visible={modal.visible} animationType="fade" onRequestClose={() =>
        setModal((prev: any) => ({ ...prev, visible: false }))
      }>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 24,
              borderRadius: 12,
              width: "80%",
              alignItems: "center",
            }}
          >
            {modal.type === "success" ? (
              <Ionicons name="checkmark-circle" size={64} color="green" />
            ) : (
              <Ionicons name="close-circle" size={64} color="red" />
            )}

            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: modal.type === "success" ? "green" : "red",
                marginTop: 12,
              }}
            >
              {modal.title}
            </Text>
            <Text style={{ fontSize: 14, textAlign: "center", marginTop: 8 }}>
              {modal.message}
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
