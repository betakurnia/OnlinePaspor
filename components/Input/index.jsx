import React from "react";
import { Text, Icon, Input as NativebaseInput, FormControl } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

function Input(props) {
  const { name, label, type, formik, isShowPassword, setIsShowPassword } =
    props;

  return (
    <FormControl isInvalid={formik.errors[name]} mb="2">
      <FormControl.Label>{label}</FormControl.Label>
      <NativebaseInput
        onChangeText={formik.handleChange(name)}
        onBlur={formik.handleBlur(name)}
        name={name}
        value={formik.values[name]}
        type={type}
        InputRightElement={
          isShowPassword !== undefined ? (
            !isShowPassword ? (
              <Icon
                onPress={() => {
                  setIsShowPassword(!isShowPassword);
                }}
                as={<MaterialIcons name="visibility-off" />}
                size={5}
                mr="2"
                color="muted.400"
              />
            ) : (
              <Icon
                onPress={() => {
                  setIsShowPassword(!isShowPassword);
                }}
                as={<MaterialIcons name="visibility" />}
                size={5}
                mr="2"
                color="muted.400"
              />
            )
          ) : null
        }
        // variant="underlined"
        {...props}
      />
      <FormControl.ErrorMessage textTransform="uppercase">
        {formik.errors[name] &&
          formik.errors[name].charAt(0).toUpperCase() +
            formik.errors[name].slice(1)}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}

export default Input;
