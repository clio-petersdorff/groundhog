import { useState, useEffect } from "react";
import { Center, Stack, Title, Space } from "@mantine/core";
import getTubeStations from "../actions/getTubeStations";
import Inputs from "./Inputs";
import Results from "./Results";

interface StationType {
  name: string;
  zones: string;
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [allStations, setAllStations] = useState<StationType[]>([]);
  const [selectedStations, setSelectedStations] = useState<StationType[]>([]); // Changed to store StationType
  const [view, setView] = useState<string>("inputs");

  // Fetch stations on component mount
  useEffect(() => {
    const fetchStations = async () => {
      const fetchedStations = await getTubeStations();
      setAllStations(fetchedStations);
    };

    fetchStations();
  }, []);

  return (
    <Center h="100vh">
      <Stack w="30em">
        <Title order={2} ta="center">
          PubHour
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
    </Center>
  );
}
