import React, { useState, useContext } from "react";
import { Box, Heading, Text } from "native-base";
import * as yup from "yup";
import { useFormik } from "formik";
import SnackBar from "react-native-snackbar-component";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { AuthContext } from "../../context/authContext";
import { isEmpty } from "lodash";

function ForgotPassword() {
  const { passwordReset } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Email tidak boleh kosong")
        .email("Email tidak valid")
        .min(6, "Email minimal 6 karakter"),
    }),
    onSubmit: async (values) => {
      setError("");
      setSuccess("");
      setIsLoading(true);
      try {
        const response = await passwordReset(values.email);
        if (response?.message) {
          setError(response.message);
        } else {
          setSuccess("Reset password terkirim, silahkan cek email anda");
        }
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    },
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      background="white"
      h="full"
      pb="8"
      px="4"
    >
      <Box>
        <Heading mb="8" fontSize="2xl" textAlign="center">
          Selamat Datang
        </Heading>
        <Box mb="2">
          <Input label="Email" name="email" type="email" formik={formik} />
        </Box>
      </Box>
      <Button
        disabled={isLoading || !isEmpty(formik.errors)}
        handleClick={formik.handleSubmit}
        w="full"
        mx="auto"
        height="12"
        size="lg"
      >
        {isLoading ? "Loading..." : "Reset Password"}
      </Button>
      <SnackBar
        style={{ color: "red" }}
        visible={!isEmpty(error)}
        textMessage={error}
        autoHidingTime={2000}
        backgroundColor="#ef4444"
      />
      <SnackBar
        visible={!isEmpty(success)}
        textMessage={success}
        autoHidingTime={2000}
      />
    </Box>
  );
}

export default ForgotPassword;
