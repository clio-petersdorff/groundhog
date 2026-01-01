import React from "react";
import {
  Button,
  Center,
  Flex,
  Image,
  List,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
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
          <Text fw="bold">How to use TubeFair</Text>
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

      <Center>
        <Image src="/src/public/running_right.svg" h="10em" w="7em" />
      </Center>

      <Flex justify="flex-end">
        <Button
          w="10em"
          color="cyan"
          rightSection={<IconArrowRight size={14} />}
          onClick={() => setView("inputs")}
        >
          Get started
        </Button>
      </Flex>
    </Stack>
  );
}
