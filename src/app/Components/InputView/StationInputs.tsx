import {
  ActionIcon,
  Button,
  Center,
  Group,
  Select,
  Space,
} from "@mantine/core";
import { StationType } from "../../../types/Types";
import { IconArrowRight, IconX } from "@tabler/icons-react";
import React from "react";

interface InputsProps {
  allStations: StationType[];
  selectedStations: StationType[];
  setSelectedStations: React.Dispatch<React.SetStateAction<StationType[]>>;
}

export default function Inputs({
  allStations,
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

  return (
    <>
      {/* Dynamic selects based on the current number of selections */}
      {selectedStations.map((station, index) => (
        <Group key={index} justify="space-between">
          <Select
            label={`Station ${index + 1}`}
            value={selectedStations[index].commonName || ""}
            onChange={(value) => handleSelect(value, index)}
            data={allStations.map((item) => item.commonName)}
            placeholder={`Select station ${index + 1}`}
            searchable
            disabled={selectedStations.length > 5 && !selectedStations[index]} // Disable select when limit is reached
            w="20em"
          />
          <ActionIcon
            variant="light"
            color="cyan"
            radius="xl"
            w="1em"
            h="1em"
            onClick={() => {
              setSelectedStations((prevState) =>
                prevState.filter((_, i) => i !== index)
              );
            }}
          >
            <IconX size={18} />
          </ActionIcon>
        </Group>
      ))}
    </>
  );
}
