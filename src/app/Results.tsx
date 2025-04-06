import { useEffect, useState } from "react";
import { StationType } from "../types/Types";
import Loading from "./Loading";
import axios from "axios";

import { Button, Paper, Stack, Text, Space } from "@mantine/core";
import { IconArrowLeft, IconStar } from "@tabler/icons-react";
import React from "react";

interface ResultsProps {
  stations: StationType[];
  setView: (view: string) => void;
}

export default function Results({ stations, setView }: ResultsProps) {
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    // Get all station names
    const fetchAPI = async () => {
      const response = await axios.get("http://localhost:8000/api/routes");
    };

    fetchAPI();
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Stack>
      <Paper shadow="sm" p="lg" w="30em"></Paper>
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
