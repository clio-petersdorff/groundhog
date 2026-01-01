import React, { useState, useEffect } from "react";
import { Stack, Title, Space, Flex, Text } from "@mantine/core";
import axios from "axios";
import Inputs from "./Components/InputView/Inputs";
import Results from "./Results";
import { StationType } from "../types/Types";
import HowToGuide from "./Components/HowToGuide/HowToGuide";
import { getApiUrl } from "../config/env";

export default function Home() {
  const [view, setView] = useState<string>("how-to-guide");
  const [allStations, setAllStations] = useState<StationType[]>([]);
  const [selectedStations, setSelectedStations] = useState<StationType[]>([
    { commonName: "", stationNaptan: "", lat: 0, lon: 0, modes: [] },
    { commonName: "", stationNaptan: "", lat: 0, lon: 0, modes: [] },
  ]);

  useEffect(() => {
    // Get all station names
    const fetchAPI = async () => {
      const response = await axios.get(getApiUrl("STATIONS"));
      const uniqueStations: StationType[] = Array.from(
        new Map(
          (response.data as StationType[]).map((station) => [
            station.commonName,
            station,
          ])
        ).values()
      );
      setAllStations(uniqueStations);
    };

    fetchAPI();
  }, []);

  return (
    <Flex gap="xl" justify="center" align="center" direction="column">
      <Stack
        w="25em"
        gap="xl"
        style={{ position: "relative" }}
        p="sm"
        py="md"
        mih="100vh"
      >
        <Title order={2} ta="center">
          TubeFair
        </Title>

        {view === "how-to-guide" && <HowToGuide setView={setView} />}

        {view === "inputs" && (
          <Inputs
            setView={setView}
            allStations={allStations}
            selectedStations={selectedStations}
            setSelectedStations={setSelectedStations}
          />
        )}

        {view === "results" && (
          <Results
            allStations={allStations}
            stations={selectedStations}
            setView={setView}
          />
        )}
        <Space h="md" />
        <Text
          fw="bold"
          size="xs"
          c="teal"
          style={{ position: "absolute", bottom: 0, left: 0, padding: "1em" }}
        >
          An app by Clio
        </Text>
      </Stack>
    </Flex>
  );
}
