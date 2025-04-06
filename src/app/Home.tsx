import React, { useState, useEffect } from "react";
import { Stack, Title, Space, Flex } from "@mantine/core";
import axios from "axios";
import Inputs from "./Inputs";
import Results from "./Results";
import { StationType } from "../types/Types";

export default function Home() {
  const [view, setView] = useState<string>("inputs");
  const [allStations, setAllStations] = useState<StationType[]>([]);
  const [selectedStations, setSelectedStations] = useState<StationType[]>([
    { commonName: "", stationNaptan: "", lat: 0, lon: 0, modes: [] },
    { commonName: "", stationNaptan: "", lat: 0, lon: 0, modes: [] },
  ]);

  useEffect(() => {
    // Get all station names
    const fetchAPI = async () => {
      const response = await axios.get("http://localhost:8000/api/stations");
      setAllStations(response.data);
    };

    fetchAPI();
  }, []);

  return (
    <Flex gap="xl" justify="center" align="center" direction="column">
      <Stack w="30em">
        <Space h="3em" />

        <Title order={2} ta="center">
          Centre Point
        </Title>
        <Space h="3em" />
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
