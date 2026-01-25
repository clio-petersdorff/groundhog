import { Button, Center, Group, SegmentedControl, Space } from "@mantine/core";
import { StationType } from "../../../types/Types";
import { IconArrowRight } from "@tabler/icons-react";
import React, { useState } from "react";
import StationInputs from "./StationInputs";
import AddressInputs from "./AddressInputs";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import axios from "axios";
import { getApiUrl } from "../../../config/env";
import { getDeviceInfo, logUserEvent } from "../../actions/analytics.ts";
import Loading from "../Loading/Loading.tsx";

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
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<string>("station");
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loading />;
  }
  // Add a new select input
  const handleAddSelect = () => {
    if (selectedStations.length < 5) {
      setSelectedStations([...selectedStations, {} as StationType]); // Add empty object as placeholder
    }
  };

  // New function to fetch results before navigating
  const handleNext = async () => {
    setLoading(true);

    const stationNaptans = selectedStations
      .filter((s) => s.commonName)
      .map((s) => s.stationNaptan);

    setLoading(true); // start loading spinner

    try {
      const deviceInfo = getDeviceInfo();
      console.log(deviceInfo);

      logUserEvent(stationNaptans, deviceInfo);

      const { data } = await axios.post(getApiUrl("ROUTE"), {
        stations: stationNaptans,
      });

      navigate(ROUTES.RESULTS, {
        state: { travelTimes: data.travel_times, fairNodes: data.fair_nodes },
      });
    } catch (err) {
      console.error(err);
      // optionally show an error message
    } finally {
      setLoading(false);
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
          onClick={handleNext}
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
