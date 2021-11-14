import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeBaseProvider, extendTheme } from "native-base";
import Home from "./views/Home";
import Login from "./views/Login";
import ForgotPassword from "./views/ForgotPassword";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import Guide from "./views/Guide";
import History from "./views/History";
import Page from "./components/Page";
import { AuthContext } from "./context/authContext";
import { isEmpty } from "lodash";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  query,
  addDoc,
  getDocs,
  collection,
  where,
} from "firebase/firestore/lite";
import { auth, db } from "./firebase";
import { Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const theme = extendTheme({
  colors: {
    primary: {
      300: "rgba(235, 143, 143, 0.6)",
      500: "rgba(235, 143, 143, 1)",
    },
  },
});

export default function App() {
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const register = async (user) => {
    try {
      const data = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      await addDoc(collection(db, "users"), {
        uid: data.user.uid,
        fullname: user.fullname,
        dateOfBirth: user.dateOfBirth,
        idNumber: user.idNumber,
        phoneNumber: user.phoneNumber,
      });
      setSuccess(true);
    } catch (e) {
      return e;
    }
  };

  const login = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      return e;
    }
  };

  const logout = async () => {
    setUser({ ...user, loggedIn: false });
    try {
      return await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  };

  const passwordReset = async (email) => {
    try {
      return await sendPasswordResetEmail(auth, email);
    } catch (e) {
      return e;
    }
  };

  const fetchUser = () => {
    setIsLoading(true);
    onAuthStateChanged(auth, async (authenticatedUser) => {
      if (authenticatedUser) {
        try {
          const q = query(
            collection(db, "users"),
            where("uid", "==", authenticatedUser.uid)
          );
          const docs = await getDocs(q);
          let userDoc = {};
          docs.forEach((doc) => {
            userDoc = {
              ...doc.data(),
            };
          });
          setUser({ ...authenticatedUser, ...userDoc });
        } catch (e) {
          console.log(e);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchUser();
  }, [success]);

  return (
    <>
      {!isLoading && (
        <AuthContext.Provider
          value={{
            user,
            setUser,
            loggedIn: !isEmpty(user),
            register,
            login,
            logout,
            passwordReset,
          }}
        >
          <NativeBaseProvider theme={theme}>
            <NavigationContainer>
              {isEmpty(user) ? (
                <Stack.Navigator>
                  <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                      title: null,
                    }}
                  />
                  <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                      title: null,
                    }}
                  />
                  <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                      title: null,
                    }}
                  />
                  <Stack.Screen
                    name="Forgot Password"
                    component={ForgotPassword}
                    options={{
                      title: null,
                    }}
                  />
                </Stack.Navigator>
              ) : (
                <Page open={open} setOpen={setOpen}>
                  <Tab.Navigator>
                    <Tab.Screen
                      name="Beranda"
                      component={Dashboard}
                      options={{
                        title: "Beranda",

                        headerLeft: () => (
                          <Entypo
                            onPress={() => {
                              setOpen(true);
                            }}
                            name="menu"
                            size={24}
                            color="black"
                          />
                        ),
                        tabBarIcon: ({ color }) => {
                          return (
                            <Entypo
                              name="home"
                              size={24}
                              color="black"
                              style={{ color: color }}
                            />
                          );
                        },
                        tabBarActiveTintColor: "rgba(235, 143, 143, 1)",
                      }}
                    />
                    <Tab.Screen
                      name="Petunjuk"
                      component={Guide}
                      options={{
                        title: "Petunjuk",
                        headerLeft: () => (
                          <Entypo
                            onPress={() => {
                              setOpen(true);
                            }}
                            name="menu"
                            size={24}
                            color="black"
                          />
                        ),
                        tabBarIcon: ({ color }) => (
                          <AntDesign
                            name="book"
                            size={24}
                            color="black"
                            style={{ color: color }}
                          />
                        ),
                        tabBarActiveTintColor: "rgba(235, 143, 143, 1)",
                      }}
                    />
                    <Tab.Screen
                      name="Riwayat"
                      component={History}
                      options={{
                        title: "Riwayat",
                        headerLeft: () => (
                          <Entypo
                            onPress={() => {
                              setOpen(true);
                            }}
                            name="menu"
                            size={24}
                            color="black"
                          />
                        ),
                        tabBarIcon: ({ color }) => (
                          <FontAwesome
                            name="history"
                            size={24}
                            color="black"
                            style={{ color: color }}
                          />
                        ),
                        tabBarActiveTintColor: "rgba(235, 143, 143, 1)",
                      }}
                    />
                  </Tab.Navigator>
                </Page>
              )}
            </NavigationContainer>
          </NativeBaseProvider>
        </AuthContext.Provider>
      )}
    </>
  );
}
