import React, { useContext, useEffect } from "react";
import { Box, Heading, Image } from "native-base";
import Button from "../../components/Button";
import { AuthContext } from "../../context/authContext";
const Plane = require("../../assets/images/9228dbef8dac2e2f854300fbf03b8fde.png");

function Home({ navigation }) {
  const { loggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (loggedIn) {
      navigation.navigate("Dashboard");
    }
  }, [loggedIn]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      backgroundColor="white"
      h="full"
      pb="8"
      px="4"
    >
      <Box>
        <Image mx="auto" w="32" h="32" mb="4" source={Plane} alt="Plane" />
        <Heading mb="40" fontSize="2xl" textAlign="center">
          Layanan Paspor Online
        </Heading>
      </Box>
      <Box>
        <Button
          variant="outline"
          mb="2"
          height="12"
          size="lg"
          _pressed={{ backgroundColor: "white", borderColor: "primary.300" }}
          w="full"
          handleClick={() => {
            navigation.navigate("Login");
          }}
        >
          Masuk
        </Button>
        <Button
          mb="2"
          height="12"
          size="lg"
          w="full"
          handleClick={() => {
            navigation.navigate("Register");
          }}
        >
          Daftar
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
