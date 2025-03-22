import { useState, useEffect } from "react";
import {
  Center,
  Stack,
  Title,
  Select,
  Space,
  Button,
  Group,
} from "@mantine/core";
import getTubeStations from "../hooks/getTubeStations";
import { IconArrowRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface StationType {
  name: string;
  zones: string;
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [allStations, setAllStations] = useState<StationType[]>([]);
  const [selectedStations, setSelectedStations] = useState<StationType[]>([]); // Changed to store StationType

  const navigate = useNavigate(); // Create navigate function

  // Fetch stations on component mount
  useEffect(() => {
    const fetchStations = async () => {
      const fetchedStations = await getTubeStations();
      setAllStations(fetchedStations);
    };

    fetchStations();
  }, []);

  // Handle station selection (limit to 5)
  const handleSelect = (value: string | null, index: number) => {
    const station = allStations.find((station) => station.name === value); // Find the full station object by name
    if (station) {
      setSelectedStations((prevState) => {
        const newSelectedStations = [...prevState];
        newSelectedStations[index] = station;
        return newSelectedStations;
      });
    }
  };

  // Add a new select input
  const handleAddSelect = () => {
    if (selectedStations.length < 5) {
      setSelectedStations([...selectedStations, {} as StationType]); // Add empty object as placeholder
    }
  };

  return (
    <Center h="100vh">
      <Stack w="30em">
        <Title ta="center">Home page</Title>
        <Space h="3em" />

        {/* Dynamic selects based on the current number of selections */}
        {selectedStations.map((_, index) => (
          <Select
            key={index}
            label={`Station ${index + 1}`}
            value={selectedStations[index]?.name || ""}
            onChange={(value) => handleSelect(value, index)}
            data={allStations.map((item) => item.name)}
            placeholder={`Select station ${index + 1}`}
            searchable
            disabled={selectedStations.length > 5 && !selectedStations[index]} // Disable select when limit is reached
          />
        ))}

        {/* Button to add more selects up to 5 */}
        <Center>
          <Button w="4em" color="cyan" onClick={handleAddSelect}>
            +
          </Button>
        </Center>

        <Space h="2em" />
        <Group justify="flex-end">
          {selectedStations[1] && (
            <Button
              onClick={() => navigate("/results")}
              w="7em"
              color="cyan"
              rightSection={<IconArrowRight size={14} />}
            >
              Next
            </Button>
          )}
        </Group>
      </Stack>
    </Center>
  );
}
