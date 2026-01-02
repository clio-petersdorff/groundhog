import { useEffect, useState } from "react";
import { FairNodeType, StationType, TravelTimeType } from "../types/Types";
import Loading from "./Loading";
import axios from "axios";

import {
  Paper,
  Stack,
  Text,
  Space,
  Title,
  Group,
  ColorSwatch,
  Divider,
  ActionIcon,
  Badge,
} from "@mantine/core";
import { IconArrowLeft, IconArrowRight, IconRouteX } from "@tabler/icons-react";
import React from "react";
import NotFound from "./Components/NotFound/NotFound";
import { lineToColour } from "../constants/colourMap";
import { getApiUrl } from "../config/env";

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
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [travelTimes, setTravelTimes] = useState<TravelTimeType[][] | null>([]);
  const [fairNodes, setFairNodes] = useState<FairNodeType[] | null>([]);
  const [expand, setExpand] = useState<TravelTimeType>({} as TravelTimeType);

  useEffect(() => {
    async function getResults(selectedStations: StationType[]) {
      const data = {
        stations: selectedStations.map(({ stationNaptan }) => stationNaptan),
      };
      try {
        setLoading(true);
        const response = await axios.post(getApiUrl("ROUTE"), data);
        setFairNodes(response.data.fair_nodes);
        setTravelTimes(response.data.travel_times);
      } catch (error) {
        console.error("Error fetching results:", error);
        setFairNodes(null);
        setTravelTimes(null);
      } finally {
        setLoading(false);
      }
    }

    getResults(stations);
  }, [stations]);

  if (loading) {
    return <Loading />;
  }

  if (fairNodes === null || travelTimes === null) {
    return <NotFound />;
  }

  // Get the fairest station (first one) for hero card
  const fairestStationData = travelTimes[0];
  const fairestStationNaptan = fairestStationData[0]?.fairStation || "";
  const fairestStationName =
    allStations.find(
      (station) => station.stationNaptan === fairestStationNaptan
    )?.commonName || fairestStationNaptan;

  // Calculate max and average travel times for fairest station
  const travelTimesForFairest = fairestStationData.map(
    (row) => row.travel_time
  );
  const maxTime = Math.max(...travelTimesForFairest);
  const avgTime =
    travelTimesForFairest.reduce((a, b) => a + b, 0) /
    travelTimesForFairest.length;

  return (
    <Stack>
      {travelTimes && travelTimes.length > 0 ? (
        <>
          <ActionIcon
            onClick={() => setView("inputs")}
            color="cyan"
            variant="light"
            p={0}
            style={{ position: "absolute", top: "1em", left: "0.5em" }}
          >
            <IconArrowLeft />
          </ActionIcon>

          {/* Hero Card - Recommended Meeting Point */}
          <Paper withBorder p="md" style={{ backgroundColor: "#f8f9fa" }}>
            <Stack gap="sm" align="center">
              <Text size="xl">🎯</Text>
              <Title order={4} ta="center">
                {fairestStationName}
              </Title>
              <Group gap="md">
                <Badge size="md" variant="filled" color="cyan">
                  {Math.round(maxTime)}m max
                </Badge>
                <Badge size="md" variant="filled" color="teal">
                  {Math.round(avgTime)} min avg
                </Badge>
              </Group>
            </Stack>
          </Paper>

          {/* Individual User Travel Cards */}
          <Stack gap="sm">
            {fairestStationData.map((row, index) => {
              const fromStation =
                allStations.find(
                  (station) => station.stationNaptan === row.fromStation
                )?.commonName || "Unknown station";

              const travelTime = Number(row.travel_time);
              const isLongest = travelTime === maxTime;

              return (
                <Stack key={index}>
                  {expand === row ? (
                    <Paper
                      onClick={() => setExpand({} as TravelTimeType)}
                      withBorder
                      p="md"
                    >
                      <Stack>
                        <Group wrap="nowrap" justify="space-between">
                          <Text size="sm" c="dimmed">
                            {Math.round(travelTime)} min
                          </Text>
                          <Group gap="xs">
                            <Text fw={600}>User {index + 1}</Text>
                            {isLongest && (
                              <Badge size="sm" color="red" variant="light">
                                Longest
                              </Badge>
                            )}
                          </Group>
                        </Group>
                        <Text size="sm" c="dimmed">
                          From: {fromStation}
                        </Text>
                        <Divider />
                        <Text size="xs" fw={600} mb="xs">
                          Full Route:
                        </Text>
                        {/* Reverse order so meeting point is shown last */}
                        {row.route
                          .slice()
                          .reverse()
                          .flatMap((pathItem, routeIndex) =>
                            pathItem.path.map((station, stationIndex) => (
                              <Group
                                key={`${routeIndex}-${stationIndex}`}
                                wrap="nowrap"
                              >
                                <ColorSwatch
                                  color={lineToColour.get(pathItem.line) ?? ""}
                                  size={15}
                                />
                                <Text size="sm">{station}</Text>
                                {routeIndex === row.route.length - 1 &&
                                  stationIndex === pathItem.path.length - 1 && (
                                    <Badge
                                      size="xs"
                                      color="cyan"
                                      variant="light"
                                    >
                                      🎯 Meeting Point
                                    </Badge>
                                  )}
                              </Group>
                            ))
                          )}
                      </Stack>
                    </Paper>
                  ) : (
                    <Paper onClick={() => setExpand(row)} withBorder p="md">
                      <Group gap="xl" wrap="nowrap">
                        <Stack gap={0} align="center" w="3em">
                          <Title order={4} p={0}>
                            {Math.round(travelTime)}
                          </Title>
                          <Text size="sm" c="dimmed">
                            min
                          </Text>
                        </Stack>
                        <Stack gap="xs" style={{ flex: 1 }}>
                          <Group gap="xs" wrap="nowrap">
                            <Text fw={600} size="sm">
                              User {index + 1}
                            </Text>
                            {isLongest && (
                              <Badge size="sm" color="red" variant="light">
                                Longest
                              </Badge>
                            )}
                          </Group>
                          <Text size="sm" c="dimmed">
                            From: {fromStation}
                          </Text>
                          <Group gap="xs" wrap="wrap">
                            {row.route
                              .slice()
                              .reverse()
                              .map((pathItem, routeIndex) => (
                                <Group key={routeIndex} gap="xs">
                                  <ColorSwatch
                                    color={
                                      lineToColour.get(pathItem.line) ?? ""
                                    }
                                    size={15}
                                  />
                                  <Text size="sm">{pathItem.line}</Text>
                                  {routeIndex < row.route.length - 1 && (
                                    <IconArrowRight size={14} />
                                  )}
                                </Group>
                              ))}
                          </Group>
                        </Stack>
                      </Group>
                    </Paper>
                  )}
                </Stack>
              );
            })}
          </Stack>

          {/* Show other fair stations if any */}
          {travelTimes.length > 1 && (
            <Stack gap="sm" mt="xl">
              <Text size="sm" fw={600} c="dimmed">
                Other options:
              </Text>
              {travelTimes.slice(1).map((node, i) => (
                <Stack key={i + 1}>
                  <Group gap="sm" wrap="nowrap">
                    <Text size="sm" fw="bold" w="90%">
                      Fair station {i + 2}: {""}
                      <Text span>{node[0].fairStation}</Text>
                    </Text>
                  </Group>

                  {node.map((row) =>
                    expand === row ? (
                      <Paper
                        withBorder
                        p="xs"
                        onClick={() => setExpand({} as TravelTimeType)}
                      >
                        <Stack>
                          <Group wrap="nowrap">
                            <IconRouteX size={24} />
                            <Stack gap={0}>
                              <Title order={5}>
                                {Number(row.travel_time).toFixed(0)} minutes{" "}
                              </Title>
                              <Text size="sm" c="dimmed">
                                from{" "}
                                {allStations.find(
                                  (station) =>
                                    station.stationNaptan === row.fromStation
                                )?.commonName ?? "can't find name"}
                              </Text>
                            </Stack>
                          </Group>
                          <Divider />
                          {row.route.slice().flatMap((pathItem, index) =>
                            pathItem.path.map((station) => (
                              <Group key={`${index}-${station}`} wrap="nowrap">
                                <ColorSwatch
                                  color={lineToColour.get(pathItem.line) ?? ""}
                                  size={15}
                                />
                                <Text size="sm">{station}</Text>
                              </Group>
                            ))
                          )}
                        </Stack>
                      </Paper>
                    ) : (
                      <Stack>
                        <Paper withBorder p="xs" onClick={() => setExpand(row)}>
                          <Group gap="xl" wrap="nowrap">
                            <Stack gap={0} align="center" w="3em">
                              <Title order={4} p={0}>
                                {Number(row.travel_time).toFixed(0)}
                              </Title>
                              <Text size="sm" c="dimmed">
                                min
                              </Text>
                            </Stack>
                            <Stack gap="xs">
                              <Group>
                                {row.route
                                  .slice()
                                  .reverse()
                                  .map((pathItem, index) => (
                                    <Group key={index} gap="xs">
                                      <ColorSwatch
                                        color={
                                          lineToColour.get(pathItem.line) ?? ""
                                        }
                                        size={15}
                                      />
                                      <Text size="sm">{pathItem.line}</Text>
                                      {index < row.route.length - 1 && (
                                        <IconArrowRight size={14} />
                                      )}
                                    </Group>
                                  ))}
                              </Group>
                              <Text size="sm">
                                from{" "}
                                {allStations.find(
                                  (station) =>
                                    station.stationNaptan === row.fromStation
                                )?.commonName ?? "can't find name"}
                              </Text>
                            </Stack>
                          </Group>
                        </Paper>
                      </Stack>
                    )
                  )}

                  <Space h="1em" />
                </Stack>
              ))}
            </Stack>
          )}
        </>
      ) : (
        <Loading />
      )}
    </Stack>
  );
}
