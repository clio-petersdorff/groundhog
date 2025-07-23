import { useEffect, useState } from "react";
import { FairNodeType, StationType, TravelTimeType } from "../types/Types";
import Loading from "./Loading";
import axios from "axios";

import {
  Button,
  Paper,
  Stack,
  Text,
  Space,
  Title,
  Group,
  ColorSwatch,
  Divider,
  ActionIcon,
} from "@mantine/core";
import { IconArrowLeft, IconArrowRight, IconRouteX } from "@tabler/icons-react";
import React from "react";
import NotFound from "./Components/NotFound/NotFount";
import { lineToColour } from "../constants/colourMap";

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
    async function getResults(selectedStations) {
      const data = {
        stations: selectedStations.map(({ stationNaptan }) => stationNaptan),
      };

      try {
        const response = await axios.post(
          "http://localhost:8000/api/route",
          data
        );

        console.log("Response data:", response.data);
        setFairNodes(response.data.fair_nodes);
        setTravelTimes(response.data.travel_times);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    }

    getResults(stations);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (fairNodes === null) {
    <NotFound />;
  }

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

          {travelTimes.map((node, i) => (
            <Stack key={i}>
              <Group>
                <Title order={5}>Fair station {i + 1}:</Title>
                <Text>{node[0].fairStation}</Text>
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
                      <Group gap="xl">
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
        </>
      ) : (
        <Loading />
      )}
    </Stack>
  );
}
