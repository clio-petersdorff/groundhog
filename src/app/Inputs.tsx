import { Button, Center, Group, Select, Space } from "@mantine/core";
import { StationType } from "../types/Types";
import { IconArrowRight } from "@tabler/icons-react";
import React from "react";

interface InputsProps {
  allStations: StationType[];
  setView: (view: string) => void;
  selectedStations: StationType[];
  setSelectedStations: React.Dispatch<React.SetStateAction<StationType[]>>;
}

export default function Inputs({
  allStations,
  setView,
  selectedStations,
  setSelectedStations,
}: InputsProps) {
  // Handle station selection
  const handleSelect = (value: string | null, index: number) => {
    const station = allStations.find((station) => station.commonName === value); // Find the full station object by name
    if (station) {
      setSelectedStations((prevState: StationType[]) => {
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
    <>
      {/* Dynamic selects based on the current number of selections */}
      {selectedStations.map((station, index) => (
        <Select
          key={index}
          label={`Station ${index + 1}`}
          value={selectedStations[index].commonName || ""}
          onChange={(value) => handleSelect(value, index)}
          data={allStations.map((item) => item.commonName)}
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
        <Button
          onClick={() => setView("results")}
          w="7em"
          color="cyan"
          rightSection={<IconArrowRight size={14} />}
          disabled={
            selectedStations.filter((station) => station.commonName !== "")
              .length < 2
          } // Only enable if at least 2 stations are selected
        >
          Next
        </Button>
      </Group>
    </>
  );
}
