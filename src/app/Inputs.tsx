import { Button, Center, Group, Select, Space } from "@mantine/core";
import { StationType } from "../types/Types";
import { IconArrowRight } from "@tabler/icons-react";

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
  // Handle station selection (limit to 5)
  const handleSelect = (value: string | null, index: number) => {
    const station = allStations.find((station) => station.name === value); // Find the full station object by name
    if (station) {
      setSelectedStations((prevState: any) => {
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
            onClick={() => setView("results")}
            w="7em"
            color="cyan"
            rightSection={<IconArrowRight size={14} />}
          >
            Next
          </Button>
        )}
      </Group>
    </>
  );
}
