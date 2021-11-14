import React, { useState, useEffect, useContext } from "react";
import { Box, ScrollView, Heading, Text } from "native-base";
import Step from "../../components/Step";

const steps = [
  {
    title: "Pendaftaran",
    description:
      "Isi kolom pendaftaran sesuai dengan data anda yang tertera di KTP. Pastikan mengisi data dengan teliti agar tidak terjadi eror. Aturan yang berlaku pada proses pendaftaran yaitu 1 perangkat smartphone hanya dapat digunakan untuk mendaftar 1 akun saja.",
  },
  {
    title: "Login",
    description: "Pada halaman awal login menggunakan email.",
  },

  {
    title: "Antrian Paspor",
    description:
      "Jika sudah mendaftar selanjutnya anda dapat memilih menu beranda.",
  },
  {
    title: "Pilih Kantor Imigrasi",
    description:
      "Setelah memilih menu beranda, maka anda dapat memilih Kantor Imigrasi yang akan anda tuju.",
  },
  {
    title: "Tentukan Jumlah Pemohon",
    description:
      "Satu akun hanya dapat mendaftarkan 1 s.d 5 permohonan dalam satu kali proses. Apabila pemohon sudah mengajukan permohonan, pemohon dapat membuat permohonan kembali setelah 1 bulan dari jadwal yang telah ditentukan sebelumnya",
  },
  {
    title: "Pilih Tanggal dan Waktu Kedatangan",
    description:
      "Pilih tanggal dengan warna hijau untuk tanggal dengan kuota tersedia.",
  },
  {
    title: "Pilih Jenis Permohonan",
    description:
      "Pilih jenis permohonan (permohonan paspor baru / perpanjangan atau penggantian paspor) selanjutnya klik “OK” - Jika anda memilih jenis permhonan paspor baru makan anda akan diminta mengisi data sesuai tertetara di KTP",
  },
  {
    title: "Jadwal Antrian dan Bukti Pendaftaran",
    description:
      "Setelah melawati semua proses pendaftaran maka anda akan mendapatkan bukti pendaftaran berupa code",
  },
  {
    title: "Datang Ke Kantor Imigrasi",
    description:
      "Bawa bukti pendaftaran tersebut ke Kantor Imigrasi beserta berkas persyaratan sesuai dengan jadwal yang sudah anda tentukan. Selanjutnya proses permohonan anda dilanjutkan di Kantor Imigrasi.",
  },
];

function Guide() {
  return (
    <ScrollView background="white" height="full">
      <Box background="white" pb="8" px="4" width="full" height="full">
        {steps.map((step, index) => (
          <Step
            count={index + 1}
            title={step.title}
            description={step.description}
          />
        ))}
      </Box>
    </ScrollView>
  );
}

export default Guide;
