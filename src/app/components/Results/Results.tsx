import { useState } from "react";
import { StationType, TravelTimeType } from "../../../types/Types";
import Loading from "../Loading/Loading";
import NotFound from "../NotFound/NotFound";
import { Stack, ActionIcon, Text, Paper, Group } from "@mantine/core";
import { IconArrowLeft, IconChevronRight } from "@tabler/icons-react";
import { useResultsData } from "./useResultsData";
import FairStation from "./FairStation";
import React from "react";

interface ResultsProps {
  stations: StationType[];
  allStations: StationType[];
  setView: (view: string) => void;
}

export default function Results({
  stations,
  allStations,
  setView,
}: ResultsProps) {
  const { loading, travelTimes, fairNodes } = useResultsData(stations);
  const [expandedCard, setExpandedCard] = useState<TravelTimeType | null>(null);
  const [expandedStationIndex, setExpandedStationIndex] = useState<
    number | null
  >(null);

  if (loading) {
    return <Loading />;
  }

  if (fairNodes === null || travelTimes === null || travelTimes.length === 0) {
    return <NotFound />;
  }

  // Get the fairest station (first one)
  const fairestStationData = travelTimes[0];
  const fairestStationNaptan = fairestStationData[0]?.fairStation || "";
  const fairestStationName =
    allStations.find(
      (station) => station.stationNaptan === fairestStationNaptan
    )?.commonName || fairestStationNaptan;

  const handleToggleExpand = (card: TravelTimeType) => {
    setExpandedCard(expandedCard === card ? null : card);
  };

  const handleToggleStation = (index: number) => {
    setExpandedStationIndex(expandedStationIndex === index ? null : index);
    setExpandedCard(null); // Reset card expansion when switching stations
  };

  return (
    <Stack>
      <ActionIcon
        onClick={() => setView("inputs")}
        color="cyan"
        variant="light"
        p={0}
        style={{ position: "absolute", top: "1em", left: "0.5em" }}
      >
        <IconArrowLeft />
      </ActionIcon>

      {/* First (fairest) station - always expanded */}
      <FairStation
        stationData={fairestStationData}
        allStations={allStations}
        stationName={fairestStationName}
        expandedCard={expandedCard}
        onToggleExpand={handleToggleExpand}
      />

      {/* Other fair stations - collapsed by default */}
      {travelTimes.length > 1 && (
        <Stack gap="sm" mt="xl">
          <Text size="sm" fw={600} c="dimmed">
            Other options:
          </Text>
          {travelTimes.slice(1).map((node, i) => {
            const stationIndex = i + 1;
            const stationNaptan = node[0]?.fairStation || "";
            const stationName =
              allStations.find(
                (station) => station.stationNaptan === stationNaptan
              )?.commonName || stationNaptan;
            const isExpanded = expandedStationIndex === stationIndex;

            return (
              <Stack key={stationIndex} gap="sm">
                {isExpanded ? (
                  <FairStation
                    stationData={node}
                    allStations={allStations}
                    stationName={stationName}
                    expandedCard={expandedCard}
                    onToggleExpand={handleToggleExpand}
                  />
                ) : (
                  <Paper
                    withBorder
                    p="md"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleToggleStation(stationIndex)}
                  >
                    <Group justify="space-between" wrap="nowrap">
                      <Text size="sm" fw={600}>
                        {stationName}
                      </Text>
                      <Group gap="xs" w="7em">
                        <Text size="sm" c="dimmed">
                          view more
                        </Text>
                        <IconChevronRight size={16} />
                      </Group>
                    </Group>
                  </Paper>
                )}
              </Stack>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}
