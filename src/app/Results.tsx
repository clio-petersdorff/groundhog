import { useEffect, useState } from "react";
import { StationType } from "../types/Types";
import Loading from "./Loading";
import axios from "axios";

import { Button, Paper, Stack, Text, Space, Title, Group } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import React from "react";
import NotFound from "./Components/NotFound/NotFount";

interface ResultsProps {
  stations: StationType[];
  setView: (view: string) => void;
}
interface MeetingPointType {
  fair_node: string;
  travel_times: [
    {
      station: string;
      travel_time: number;
    }
  ];
}

export default function Results({ stations, setView }: ResultsProps) {
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [meetingPoint, setMeetingPoint] = useState<MeetingPointType | null>(
    null
  );
  const [fairNode, setFairNode] = useState<string>("");

  useEffect(() => {
    async function getResults(selectedStations) {
      const data = {
        stations: selectedStations.map(({ commonName }) => commonName),
      };

      try {
        const response = await axios.post(
          "http://localhost:8000/api/route",
          data
        );

        setMeetingPoint(response.data[0]); // This updates the state
        setFairNode(
          response.data[0].fair_node.replace("virtual_station::", "")
        );
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

  if (meetingPoint === null) {
    <NotFound />;
  }

  console.log(meetingPoint);
  return (
    <Stack>
      {meetingPoint ? (
        <Paper shadow="sm" p="lg" w="30em">
          <Group>
            <Text size="xl" fw={900}>
              Your favourite meeting point:
            </Text>
            <Text
              size="xl"
              fw="bold"
              variant="gradient"
              gradient={{ from: "blue", to: "teal", deg: 90 }}
            >
              {fairNode}
            </Text>
          </Group>

          {meetingPoint?.travel_times.map((row) => (
            <Group>
              <Text>From {row.station}: </Text>
              <Text fw="bold">{row.travel_time} min</Text>
            </Group>
          ))}
        </Paper>
      ) : (
        <NotFound />
      )}
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
