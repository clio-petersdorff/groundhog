import React from "react";
import { Box, Button, Flex, List, Paper, Stack, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";

export default function HowToGuide({
  setView,
}: {
  setView: (view: string) => void;
}) {
  return (
    <Stack gap="3em">
      <Paper shadow="sm" radius="lg" withBorder p="xl">
        <Stack>
          <Text fw="bold">How to use MiddlePoint</Text>
          <List spacing="sm">
            <List.Item>
              Enter your and your friends' street address or nearest tube or
              rail station.
            </List.Item>
            <List.Item>
              The app calculates the fairest meeting point for everyone based on
              shortest travel time.
            </List.Item>
            <List.Item>
              Supports Tube, Overground, and DLR — powered by live TfL data.
            </List.Item>
          </List>
        </Stack>
      </Paper>

      <Flex justify="flex-end">
        <Button
          w="7em"
          color="cyan"
          rightSection={<IconArrowRight size={14} />}
          onClick={() => setView("inputs")}
        >
          Next
        </Button>
      </Flex>
    </Stack>
  );
}
