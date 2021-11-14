import React from "react";
import { Box, Avatar, Text } from "native-base";
import moment from "moment";

function Banner(props) {
  const { name, nik, dateOfBirth } = props;

  return (
    <Box
      background="primary.500"
      width="full"
      py="4"
      px="8"
      mb="4"
      rounded="lg"
    >
      <Box display="flex" flexDirection="row" alignItems="center">
        <Avatar size="md" />
        <Box ml="6">
          <Text color="#ffffff" mb="1">
            {name}
          </Text>
          <Text color="#ffffff" mb="1">
            {nik}
          </Text>
          <Text color="#ffffff" mb="1">
            {moment(dateOfBirth).format("DD MMMM YYYY")}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default Banner;
