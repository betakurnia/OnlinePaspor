import React from "react";
import { Box, Heading, Text, Center, Stack, Image } from "native-base";
import Button from "../Button";

const Card = ({ image, title, address, onActions }) => {
  return (
    <Box
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700",
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: "gray.50",
      }}
      width="full"
      mb="4"
    >
      <Box>
        <Image source={image} alt="image" width="full" height="40" />
      </Box>
      <Stack p="4" space={3}>
        <Stack space={2}>
          <Heading size="md" ml="-1">
            {title}
          </Heading>
          <Text
            fontSize="xs"
            _light={{
              color: "primary.500",
            }}
            _dark={{
              color: "primary.400",
            }}
            fontWeight="500"
            ml="-0.5"
            mt="-1"
          >
            Alamat
          </Text>
        </Stack>
        <Text fontWeight="400">{address}</Text>
        <Button onPress={onActions}>Pilih Kantor</Button>
      </Stack>
    </Box>
  );
};

export default Card;
