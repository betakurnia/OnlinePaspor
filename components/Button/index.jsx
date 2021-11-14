import React from "react";
import { Button as NativeBaseButton } from "native-base";

function Button(props) {
  const { handleClick, children } = props;

  return (
    <NativeBaseButton
      _pressed={{ backgroundColor: "primary.300" }}
      color="primary.500"
      onPress={handleClick}
      {...props}
    >
      {children}
    </NativeBaseButton>
  );
}

export default Button;
