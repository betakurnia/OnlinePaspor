import React from "react";
import { Radio, FormControl } from "native-base";

function RadioCustom(props) {
  const { name, label, formik, options } = props;

  return (
    <FormControl isInvalid={formik.errors[name]} mb="2">
      <FormControl.Label>{label}</FormControl.Label>
      <Radio.Group
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange(name)}
        display="flex"
        flexDirection="row"
      >
        {options.map((option) => (
          <Radio value={option} my={1} mr={4}>
            {option}
          </Radio>
        ))}
      </Radio.Group>
      <FormControl.ErrorMessage textTransform="uppercase">
        {formik.errors[name] &&
          formik.errors[name].charAt(0).toUpperCase() +
            formik.errors[name].slice(1)}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}

export default RadioCustom;
