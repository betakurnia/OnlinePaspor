import React from "react";
import { FormControl, Input } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

function Datepicker(props) {
  const { name, formik, setIsShowDatePicker } = props;

  const value = formik.values[name] ? formik.values[name] : new Date();

  return (
    <DateTimePicker
      {...props}
      value={value}
      is24Hour={true}
      display="default"
      name={name}
      onChange={(event, selectedValue) => {
        formik.values[name] = selectedValue;

        setIsShowDatePicker(false);
      }}
    />
  );
}

export default Datepicker;

export function DateCustom(props) {
  const { name, label, onPress, formik } = props;

  const value = formik.values[name]
    ? moment(formik.values[name]).format("YYYY-MM-DD")
    : "";

  return (
    <FormControl isInvalid={formik.errors[name]} mb="2">
      <FormControl.Label>{label}</FormControl.Label>
      <Input value={value} onFocus={onPress} type="text" {...props} />
      <FormControl.ErrorMessage>
        {formik.errors[name] &&
          formik.errors[name].charAt(0).toUpperCase() +
            formik.errors[name].slice(1)}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
