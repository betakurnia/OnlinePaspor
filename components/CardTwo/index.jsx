import React from "react";
import { Box, Heading, Text, Badge } from "native-base";
import moment from "moment";

moment.locale("id");

function Card({ title, applications }) {
  return (
    <Box borderWidth="1" borderColor="gray.300" borderRadius="xl" mb="6">
      <Box borderBottomWidth="1" borderBottomColor="gray.300" py={2}>
        <Heading fontSize="xl" textAlign="center">
          {title}
        </Heading>
      </Box>
      <Box>
        {applications.length > 0 ? (
          applications.map((application) => (
            <Box
              pt={5}
              pb={3}
              px={6}
              flexDirection="row"
              justifyContent="space-between"
            >
              <Box mb="4">
                <Text fontWeight="bold">{application.idNumber}</Text>
                <Text>{application.name}</Text>
                <Text>
                  {moment(application?.arrivalDate?.seconds * 1000).format(
                    "dddd, DD MMMM YYYY"
                  )}
                </Text>
                <Text>{application.title}</Text>
              </Box>
              <Box>
                {application.isFinished ? (
                  <Badge borderRadius="md" background="green.500">
                    <Text color="white">Selesai</Text>
                  </Badge>
                ) : (
                  <Badge borderRadius="md" background="yellow.500">
                    <Text color="white">Belum Selesai</Text>
                  </Badge>
                )}
              </Box>
            </Box>
          ))
        ) : (
          <Box pt={2} pb={2} px={2}>
            <Text textAlign="center">Data tidak tersedia</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Card;
