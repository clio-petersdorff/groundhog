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
  List,
  ColorSwatch,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
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

  useEffect(() => {
    async function getResults(selectedStations) {
      const data = {
        stations: selectedStations.map(({ stationNaptan }) => stationNaptan),
      };

      console.log(data);

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

  console.log("Fair nodes:", fairNodes);
  console.log("Travel times:", travelTimes);

  if (loading) {
    return <Loading />;
  }

  if (fairNodes === null) {
    <NotFound />;
  }

  return (
    <Stack>
      {travelTimes &&
        travelTimes.map((node, i) => (
          <Stack>
            <Group key={i}>
              <Title order={5}>Fair station {i + 1}:</Title>
              <Text>{node[0].fairStation}</Text>
            </Group>
            <Group>
              {node.map((row, j) => (
                <Paper
                  key={`row-${i}-${j}`}
                  p="sm"
                  bg="gray.1"
                  w="30%"
                  // h="15em"
                >
                  <Text size="sm">
                    {allStations.find(
                      (station) => station.stationNaptan === row.fromStation
                    )?.commonName ?? "can't find name"}
                  </Text>
                  <Text size="sm" fw="bold">
                    {row.travel_time} minutes
                  </Text>
                  <List size="sm">
                    {row.route.map((pathItem) => (
                      <List.Item
                        key={pathItem.line}
                        icon={
                          <ColorSwatch
                            color={lineToColour.get(pathItem.line) ?? ""}
                            size={15}
                          />
                        }
                      >
                        {pathItem.line}
                      </List.Item>
                    ))}
                  </List>
                </Paper>
              ))}
            </Group>
          </Stack>
        ))}
      <Space h="2em" />
      <Button
        onClick={() => setView("inputs")}
        w="7em"
        color="cyan"
        leftSection={<IconArrowLeft size={14} />}
      >
        Back
      </Button>
    </Stack>
  );
}
