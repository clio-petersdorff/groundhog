import { Stack, Image, Title, Paper } from "@mantine/core";
import React from "react";

export default function NotFound() {
  return (
    <Paper shadow="0" radius="lg" withBorder p="xl">
      <Stack align="center">
        <Title order={5}>
          Hmm... I couldn&apos;t find a route - try again with a different
          address.
        </Title>
        <Image
          src="/sad_robot.png"
          alt="No route found"
          w="60%"
          h="auto"
          radius="md"
        />
      </Stack>
    </Paper>
  );
}
