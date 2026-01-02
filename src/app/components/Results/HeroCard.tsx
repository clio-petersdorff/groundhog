import { Paper, Stack, Text, Title, Group, Badge } from "@mantine/core";
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
        🎯 {stationName}
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
  );
}
