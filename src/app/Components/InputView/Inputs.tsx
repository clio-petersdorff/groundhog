import { Button, Center, Group, SegmentedControl, Space } from "@mantine/core";
import { StationType } from "../../../types/Types";
import { IconArrowRight } from "@tabler/icons-react";
import React, { useState } from "react";
import StationInputs from "./StationInputs";
import AddressInputs from "./AddressInputs";

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
  const [searchType, setSearchType] = useState<string>("station");

  // Add a new select input
  const handleAddSelect = () => {
    if (selectedStations.length < 5) {
      setSelectedStations([...selectedStations, {} as StationType]); // Add empty object as placeholder
    }
  };

  return (
    <>
      <SegmentedControl
        fullWidth
        value={searchType}
        onChange={setSearchType}
        data={[
          { label: "Search by station", value: "station" },
          { label: "Search by address", value: "address" },
        ]}
      />

      {
        // Render inputs based on search type
        searchType === "station" ? (
          <StationInputs
            allStations={allStations}
            selectedStations={selectedStations}
            setSelectedStations={setSelectedStations}
          />
        ) : (
          <AddressInputs />
        )
      }

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
