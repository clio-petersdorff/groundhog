import { Stack, Title, Group, Badge, Text } from "@mantine/core";
import React from "react";

interface HeroCardProps {
  stationName: string;
  maxTime: number;
  avgTime: number;
}

export default function HeroCard({
  stationName,
  maxTime,
  avgTime,
}: HeroCardProps) {
  return (
    <Stack gap="sm" align="center" p="md">
      <Title order={4} ta="center">
        🎯 {stationName.split("/")[0]}
      </Title>
      <Group gap="md">
        <Badge size="md" variant="filled" color="cyan">
          max: {Math.round(maxTime)} min
        </Badge>
        <Badge size="md" variant="filled" color="teal">
          Avg: {Math.round(avgTime)} min
        </Badge>
      </Group>
    </Stack>
  );
}
