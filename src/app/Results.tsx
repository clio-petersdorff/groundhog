import { useEffect, useState } from "react";
import { StationType } from "../types/Types";
import Loading from "./Loading";
import axios from "axios";

import { Button, Paper, Stack, Text, Space } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import React from "react";

interface ResultsProps {
  stations: StationType[];
  setView: (view: string) => void;
}
interface MeetingPointType {
  fair_node: string;
  travel_times: {
    [key: string]: {
      travel_time: number;
    };
  };
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

  return (
    <Stack>
      <Paper shadow="sm" p="lg" w="30em">
        {meetingPoint && <Text>Your favourite meeting point: {fairNode}</Text>}
      </Paper>
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
