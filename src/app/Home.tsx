import React, { useState, useEffect } from "react";
import { Stack, Title, Space, Flex } from "@mantine/core";
import axios from "axios";
import Inputs from "./Components/InputView/Inputs";
import Results from "./Results";
import { StationType } from "../types/Types";
import HowToGuide from "./Components/HowToGuide/HowToGuide";

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
      const response = await axios.get("http://localhost:8000/api/stations");
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
      <Stack w="30em" gap="xl">
        <Space h="3em" />

        <Title order={2} ta="center">
          Centre Point
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
          <Results stations={selectedStations} setView={setView} />
        )}
      </Stack>
    </Flex>
  );
}
