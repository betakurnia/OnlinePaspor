import React, { useState, useEffect, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Box, ScrollView, Spinner } from "native-base";
import {
  getDocs,
  getDoc,
  collection,
  query,
  where,
  doc,
} from "firebase/firestore/lite";
import Card from "../../components/CardTwo";
import { db } from "../../firebase";
import { AuthContext } from "../../context/authContext";

function History() {
  const isFocused = useIsFocused();
  const [historyNewApplicants, setHistoryNewApplicants] = useState([]);
  const [historyUpdateApplicants, setHistoryUpdateApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthContext);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "applications"),
        where("userId", "==", user.uid)
      );
      const docs = await getDocs(q);
      const stateHistory = [];
      docs.forEach((doc) => {
        stateHistory.push(doc.data());
      });

      const qOffices = stateHistory.map(async (history) => {
        return await getDoc(doc(db, "offices", history.officeId));
      });
      const docs2 = await Promise.all(qOffices);

      docs2.forEach((doc, index) => {
        const data = doc.data();
        stateHistory[index] = {
          ...stateHistory[index],
          ...data,
        };
      });

      const stateNewApplicationHistory = stateHistory.filter((history) => {
        return history.applicationType === "Permohonan Paspor Baru";
      });

      const stateUpdateApplicationHistory = stateHistory.filter((history) => {
        return (
          history.applicationType === "Perpanjangan Atau Pergantian Paspor"
        );
      });

      setHistoryNewApplicants(stateNewApplicationHistory);
      setHistoryUpdateApplicants(stateUpdateApplicationHistory);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchHistory();
    }
  }, [isFocused]);

  return (
    <ScrollView background="white" height="full">
      <Box background="white" pb="8" px="4" width="full" height="full">
        {!isLoading ? (
          <>
            <Card
              idNumber={user.idNumber}
              name={user.fullname}
              title="Pembuatan Paspor Baru"
              applications={historyNewApplicants}
            />
            <Card
              idNumber={user.idNumber}
              name={user.fullname}
              title="Penggantian / Perpanjangan Paspor"
              applications={historyUpdateApplicants}
            />
          </>
        ) : (
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Spinner size="lg" />
          </Box>
        )}
      </Box>
    </ScrollView>
  );
}

export default History;
