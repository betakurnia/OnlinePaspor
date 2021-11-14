import React, { useState, useEffect, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Box, ScrollView, Heading, Text, Spinner } from "native-base";
import {
  getDocs,
  getDoc,
  collection,
  query,
  where,
  addDoc,
  doc,
  limit,
} from "firebase/firestore/lite";
import * as yup from "yup";
import { useFormik } from "formik";
import StepIndicator from "react-native-step-indicator";
import moment from "moment";
import "moment/locale/id";
import { isEmpty } from "lodash";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Radio from "../../components/Radio";
import Datepicker, { DateCustom } from "../../components/Date";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { db } from "../../firebase";
import { AuthContext } from "../../context/authContext";
const Paspor = require("../../assets/images/unnamed.jpeg");

moment.locale("id");

const labels = ["Langkah Pertama", "Langkah Kedua", "Langkah Ketiga"];

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "rgba(235, 143, 143, 1)",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "rgba(235, 143, 143, 1)",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "rgba(235, 143, 143, 1)",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#rgba(235, 143, 143, 1)",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "rgba(235, 143, 143, 1)",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "rgba(235, 143, 143, 1)",
};

function Dashboard() {
  const { user } = useContext(AuthContext);

  const isFocused = useIsFocused();

  const [offices, setOffices] = useState([]);

  const [application, setApplication] = useState({});

  const [optionsArrivalTime, setOptionsArrivalTime] = useState([]);

  const [currentPosition, setCurrentPosition] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const [isShowDatePicker, setIsShowDatePicker] = useState(false);

  const formik = useFormik({
    initialValues: {
      search: "",
      uid: "",
      applicationType: "",
      arrivalDate: "",
      arrivalTime: "",
      quotaAvailable: "",
      email: user?.email,
      address: "",
    },
    validationSchema: yup.object().shape({
      applicationType: yup
        .string()
        .required("Jenis permohonan tidak boleh kosong"),
      arrivalDate: yup
        .string()
        .required("Tanggal kedatangan tidak boleh kosong"),
      arrivalTime: yup.string().required("Waktu kedatangan tidak boleh kosong"),
      email: yup
        .string()
        .required("Email tidak boleh kosong")
        .email("Email tidak valid")
        .min(6, "Email minimal 6 karakter"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await addDoc(collection(db, "applications"), {
          userId: user.uid,
          name: user.fullname,
          idNumber: user.idNumber,
          officeId: values["uid"],
          arrivalDate: values["arrivalDate"],
          arrivalTime: values["arrivalTime"],
          applicationType: values["applicationType"],
          email: values["email"],
          isFinished: false,
        });
        setCurrentPosition(3);
        formik.handleReset();
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    },
  });

  const fetchOffices = async () => {
    setIsLoading(true);
    try {
      const q = formik.values["search"]
        ? query(
            collection(db, "offices"),
            where("title", ">=", formik.values["search"]),
            where("title", "<=", formik.values["search"] + "\uf8ff"),
            limit(5)
          )
        : query(collection(db, "offices"), limit(5));
      const docs = await getDocs(q);
      const stateOffices = [];
      docs.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        stateOffices.push({ ...data, id });
      });
      setOffices(stateOffices);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const fetchApplication = async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "applications"),
        where("userId", "==", user.uid),
        limit(1)
      );
      const docs = await getDocs(q);
      let stateApplication = {};
      docs.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        stateApplication = { ...data, id };
      });
      const docs2 = await getDoc(doc(db, "offices", stateApplication.officeId));
      delete docs2.data().arrivalTime;
      setApplication({ ...docs2.data(), ...stateApplication });
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchOffices();
    }
  }, [isFocused, formik.values["search"]]);

  useEffect(() => {
    if (isFocused) {
      fetchApplication();
    }
  }, [isFocused, currentPosition]);

  useEffect(() => {
    if (formik.values["arrivalDate"]) {
      formik.validateForm();
    }
  }, [formik.values["arrivalDate"]]);

  return (
    <ScrollView scrollEventThrottle={400} background="white" height="full">
      <Box background="white" pb="8" px="4" width="full" height="full">
        <Box py={6}>
          {currentPosition !== 3 && (
            <StepIndicator
              customStyles={customStyles}
              currentPosition={currentPosition}
              labels={labels}
              stepCount={3}
            />
          )}
        </Box>
        {currentPosition === 1 && (
          <>
            <Input
              mb="4"
              placeholder="Cari"
              name="search"
              type="text"
              formik={formik}
            />
            <>
              {!isLoading ? (
                offices.map((office, index) => (
                  <Card
                    key={index}
                    nextStep={2}
                    image={Paspor}
                    formik={formik}
                    uid={office.id}
                    title={office.title}
                    address={office.address}
                    onActions={async () => {
                      setOptionsArrivalTime(office.arrivalTime);
                      // formik.handleReset();
                      formik.values["address"] = office.title;
                      const q = query(
                        collection(db, "applications"),
                        where("officeId", "==", office.id)
                      );
                      const docs = await getDocs(q);
                      const stateApplications = [];
                      docs.forEach((doc) => {
                        stateApplications.push(doc.data());
                      });
                      formik.values["quotaAvailable"] = String(
                        Number(office.quotaAvailable) - stateApplications.length
                      );
                      formik.values["uid"] = office.id;
                      setCurrentPosition(2);
                    }}
                  />
                ))
              ) : (
                <Spinner size="lg" />
              )}
            </>
          </>
        )}
        {currentPosition === 2 && (
          <>
            <Box mb="8">
              <Select
                label="Jenis Permohonan"
                name="applicationType"
                type="text"
                keyboardType="numeric"
                formik={formik}
                options={[
                  "Permohonan Paspor Baru",
                  "Perpanjangan Atau Pergantian Paspor",
                ]}
              />
              <DateCustom
                label="Tanggal Kedatangan"
                name="arrivalDate"
                type="text"
                formik={formik}
                onPress={() => {
                  setIsShowDatePicker(true);
                }}
              />
              {isShowDatePicker && (
                <Datepicker
                  minimumDate={new Date()}
                  name="arrivalDate"
                  setIsShowDatePicker={setIsShowDatePicker}
                  formik={formik}
                />
              )}
              <Radio
                name="arrivalTime"
                label="Waktu Kedatangan"
                formik={formik}
                options={optionsArrivalTime}
              />
              <Input
                isReadOnly
                label="Kuota Tersedia"
                name="quotaAvailable"
                type="text"
                keyboardType="numeric"
                formik={formik}
              />
              <Input
                isReadOnly
                label="Email"
                name="email"
                type="email"
                formik={formik}
              />
              <Input
                isReadOnly
                label="Kantor Imigrasi"
                name="address"
                type="text"
                formik={formik}
              />
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Button
                variant="outline"
                onPress={() => {
                  formik.handleReset();
                  setCurrentPosition(1);
                }}
              >
                Kembali
              </Button>
              <Button
                disabled={isLoading || !isEmpty(formik.errors)}
                onPress={formik.handleSubmit}
              >
                {isLoading ? "Loading..." : "Lanjut"}
              </Button>
            </Box>
          </>
        )}
        {currentPosition === 3 && (
          <>
            <Box
              borderWidth="1"
              borderColor="gray.300"
              borderRadius="md"
              mb="4"
            >
              <Box borderBottomWidth="1" borderBottomColor="gray.300" py={2}>
                <Heading fontSize="lg" textAlign="center">
                  {moment(application?.arrivalDate?.seconds * 1000).format(
                    "dddd, DD MMMM YYYY"
                  )}
                </Heading>
              </Box>
              <Box py={4} px={6}>
                <Box display="flex" flexDirection="row" mb="1">
                  <Text width="20">Nama</Text>
                  <Text width="4">:</Text>
                  <Text>{user.fullname}</Text>
                </Box>
                <Box display="flex" flexDirection="row" mb="1">
                  <Text width="20">NIK</Text>
                  <Text width="4">:</Text>
                  <Text>{user.idNumber}</Text>
                </Box>
                <Box display="flex" flexDirection="row" mb="1">
                  <Text width="20">Tempat</Text>
                  <Text width="4">:</Text>
                  <Text>{application.title}</Text>
                </Box>
                <Box display="flex" flexDirection="row" mb="1">
                  <Text width="20">Waktu</Text>
                  <Text width="4">:</Text>
                  <Text>{application.arrivalTime}</Text>
                </Box>
              </Box>
            </Box>
            <Button
              disabled={isLoading}
              onPress={() => {
                setCurrentPosition(1);
              }}
            >
              {isLoading ? "Loading..." : "Balik Ke Beranda"}
            </Button>
          </>
        )}
      </Box>
    </ScrollView>
  );
}

export default Dashboard;
