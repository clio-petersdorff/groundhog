import { Stack, Image, Title, Paper } from "@mantine/core";
import React from "react";

export default function NotFound() {
  return (
    <Paper shadow="0" radius="lg" withBorder p="xl">
      <Stack align="center" gap="xl">
        <Title order={5}>
          Hmm... I couldn&apos;t find a route - try again with a different
          address.
        </Title>
        <Image
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTY1M2t5N3pqbWF6aXlkenJkMGhub3BycnN2M2Q3MnZjNjhic2Q2YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Z5xk7fGO5FjjTElnpT/giphy.gif"
          alt="No route found"
          w="80%"
          h="auto"
          radius="md"
        />
      </Stack>
    </Paper>
  );
}
