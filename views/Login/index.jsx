import React, { useState, useContext } from "react";
import { Box, Heading, Text } from "native-base";
import * as yup from "yup";
import { useFormik } from "formik";
import SnackBar from "react-native-snackbar-component";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { AuthContext } from "../../context/authContext";
import { isEmpty } from "lodash";

function Login({ navigation }) {
  const { login } = useContext(AuthContext);

  const [isShowPassword, setIsShowPassword] = useState(true);

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Email tidak boleh kosong")
        .email("Email tidak valid")
        .min(6, "Email minimal 6 karakter"),
      password: yup
        .string()
        .required("Password tidak boleh kosong")
        .min(6, "Password minimal 6 karakter"),
    }),
    onSubmit: async (values) => {
      setError("");
      setIsLoading(true);
      try {
        const response = await login(values.email, values.password);
        if (response.message) {
          setError(response.message);
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
      <Box mb="8">
        <Heading mb="8" fontSize="2xl" textAlign="center">
          Selamat Datang
        </Heading>
        <Input label="Email" name="email" type="email" formik={formik} />
        <Input
          label="Password"
          name="password"
          type={isShowPassword ? "password" : "text"}
          formik={formik}
          isShowPassword={isShowPassword}
          setIsShowPassword={setIsShowPassword}
        />
        <Box w="full">
          <Text
            textAlign="right"
            onPress={() => {
              navigation.navigate("Forgot Password");
            }}
          >
            Lupa Password?
          </Text>
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
        {isLoading ? "Loading..." : "Masuk"}
      </Button>
      <SnackBar
        style={{ color: "red" }}
        visible={!isEmpty(error)}
        textMessage={error}
        autoHidingTime={2000}
        backgroundColor="#ef4444"
      />
    </Box>
  );
}

export default Login;
