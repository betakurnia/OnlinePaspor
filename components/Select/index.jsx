import React from "react";
import { Select as NativebaseSelect, FormControl } from "native-base";

function Select(props) {
  const { name, label, formik, options } = props;

  return (
    <FormControl isInvalid={formik.errors[name]} mb="2" key={name}>
      <FormControl.Label>{label}</FormControl.Label>
      <NativebaseSelect
        name={name}
        minWidth="200"
        {...props}
        _selectedItem={{
          bg: "teal.600",
          // endIcon: <CheckIcon size={5} />,
        }}
        mt="1"
        onValueChange={formik.handleChange(name)}
        value={formik.values[name]}
      >
        {options.map((option) => (
          <NativebaseSelect.Item key={option} label={option} value={option} />
        ))}
      </NativebaseSelect>
      <FormControl.ErrorMessage textTransform="uppercase">
        {formik.errors[name] &&
          formik.errors[name].charAt(0).toUpperCase() +
            formik.errors[name].slice(1)}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}

export default Select;
