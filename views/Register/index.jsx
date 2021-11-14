import React, { useState, useContext, useEffect } from "react";
import { Box, Heading, ScrollView } from "native-base";
import { useFormik } from "formik";
import SnackBar from "react-native-snackbar-component";
import * as yup from "yup";
import { isEmpty } from "lodash";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Datepicker from "../../components/Date";
import { DateCustom } from "../../components/Date";
import { AuthContext } from "../../context/authContext";

function Register() {
  const formik = useFormik({
    initialValues: {
      fullname: "",
      dateOfBirth: "",
      idNumber: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object().shape({
      fullname: yup.string().required("Nama lengkap tidak boleh kosong"),
      dateOfBirth: yup.string().required("Tanggal lahir tidak boleh kosong"),
      idNumber: yup
        .string()
        .length(16, "NIK harus 16 karakter")
        .required("NIK tidak boleh kosong"),
      phoneNumber: yup
        .string()
        .min(11, "Nomor handphone minimal 11 karakter")
        .max(13, "Nomor handphone maksimal 13 karakter")
        .required("Nomor handphone tidak boleh kosong"),
      email: yup
        .string()
        .email("Email tidak valid")
        .required("Email tidak boleh kosong")
        .min(6, "Email minimal 6 karakter"),
      password: yup
        .string()
        .required("Password tidak boleh kosong")
        .min(6, "Password minimal 6 karakter"),
      confirmPassword: yup
        .string()
        .required("Konfirmasi password tidak boleh kosong")
        .oneOf([yup.ref("password")], "Password harus sama"),
    }),
    onSubmit: async (user) => {
      setError("");
      setIsLoading(true);
      try {
        const response = await register(user);
        if (response.message) {
          setError(response.message);
        }
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    },
  });

  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useContext(AuthContext);

  useEffect(() => {
    if (formik.values["dateOfBirth"]) {
      formik.validateForm();
    }
  }, [formik.values["dateOfBirth"]]);

  return (
    <ScrollView height="100%">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        background="white"
        h="full"
        pb="8"
        px="4"
      >
        <Heading mb="8" fontSize="2xl" textAlign="center">
          Selamat Datang
        </Heading>

        <Box w="full" mb="8">
          <Input
            label="Nama Lengkap"
            name="fullname"
            type="text"
            formik={formik}
          />
          <DateCustom
            label="Tanggal Lahir"
            name="dateOfBirth"
            formik={formik}
            onPress={() => {
              formik.validateForm();

              setIsShowDatePicker(true);
            }}
          />
          {isShowDatePicker && (
            <Datepicker
              maximumDate={new Date()}
              name="dateOfBirth"
              setIsShowDatePicker={setIsShowDatePicker}
              formik={formik}
            />
          )}
          <Input
            keyboardType="numeric"
            label="Nomor Induk Kependudukan"
            name="idNumber"
            type="text"
            formik={formik}
          />
          <Input
            keyboardType="numeric"
            label="Nomor Handphone"
            name="phoneNumber"
            type="text"
            formik={formik}
          />
          <Input label="Email" name="email" type="text" formik={formik} />
          <Input
            label="Password"
            name="password"
            type={isShowPassword ? "password" : "text"}
            formik={formik}
            isShowPassword={isShowPassword}
            setIsShowPassword={setIsShowPassword}
          />
          <Input
            label="Konfirmasi Password"
            name="confirmPassword"
            type={isShowConfirmPassword ? "password" : "text"}
            formik={formik}
            isShowPassword={isShowConfirmPassword}
            setIsShowPassword={setIsShowConfirmPassword}
          />
        </Box>
        <Button
          handleClick={formik.handleSubmit}
          w="full"
          mx="auto"
          height="12"
          size="lg"
          disabled={isLoading || !isEmpty(formik.errors)}
        >
          {isLoading ? "Loading..." : "Daftar"}
        </Button>
      </Box>
      <SnackBar
        visible={!isEmpty(error)}
        textMessage={error}
        autoHidingTime={2000}
        backgroundColor="#ef4444"
      />
    </ScrollView>
  );
}

export default Register;
