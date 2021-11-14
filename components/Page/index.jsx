import React, { useState, useContext } from "react";
import { Box, Heading, Text, Avatar } from "native-base";
import Drawer from "react-native-drawer";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/id";
import Button from "../Button";
import { AuthContext } from "../../context/authContext";

moment.locale("id");

function ControlPanel({ setOpen }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <Box
      maxWidth="64"
      background="#fff"
      height="100%"
      px="6"
      py="6"
      justifyContent="space-between"
    >
      <Box>
        <AntDesign
          onPress={() => {
            setOpen(false);
          }}
          style={{ textAlign: "right" }}
          name="close"
          size={24}
          color="black"
        />
        <Avatar mb="2" mx="auto" />

        <Heading textAlign="center" mb="2">
          {user?.fullname}
        </Heading>
        <Text textAlign="center" mb="2">
          {user?.idNumber}
        </Text>
        <Text textAlign="center" mb="2">
          {moment(new Date(user?.dateOfBirth?.seconds) * 1000).format(
            "DD MMMM YYYY"
          )}
        </Text>
      </Box>
      <Button
        mb="2"
        height="12"
        size="lg"
        w="full"
        onPress={async () => {
          try {
            await logout();
          } catch (e) {
            console.log(e);
          }
          setOpen(false);
        }}
      >
        Keluar
      </Button>
    </Box>
  );
}

const drawerStyles = {
  drawer: { shadowColor: "#000000", shadowOpacity: 0.8, shadowRadius: 3 },
  main: { paddingLeft: 3 },
};

function Page({ open, setOpen, children }) {
  return (
    <Drawer
      open={open}
      type="overlay"
      content={<ControlPanel />}
      tapToClose={true}
      openDrawerOffset={0.2} // 20% gap on the right side of drawer
      panCloseMask={0.2}
      closedDrawerOffset={-3}
      styles={drawerStyles}
      tweenHandler={(ratio) => ({
        main: { opacity: (2 - ratio) / 2 },
      })}
      content={<ControlPanel setOpen={setOpen} />}
    >
      {children}
    </Drawer>
  );
}

export default Page;
