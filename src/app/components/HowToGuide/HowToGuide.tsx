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
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";

export default function HowToGuide() {
  const navigate = useNavigate();

  return (
    <Stack gap="3em">
      <Paper shadow="sm" radius="lg" withBorder p="xl">
        <Stack>
          <Text fw="bold">How to use TubeFair</Text>
          <List spacing="sm">
            <List.Item>
              Enter your and your friends' nearest Tube, Overground or DLR
              stations.
            </List.Item>
            <List.Item>
              The app calculates the fairest meeting point for everyone based on
              their travel times.
            </List.Item>
            <List.Item>Powered by TfL data.</List.Item>
          </List>
        </Stack>
      </Paper>

      <Center>
        <Image src="running_right.svg" h="10em" w="7em" />
      </Center>

      <Flex justify="flex-end">
        <Button
          w="10em"
          color="cyan"
          rightSection={<IconArrowRight size={14} />}
          onClick={() => navigate(ROUTES.INPUTS)}
        >
          Get started
        </Button>
      </Flex>
    </Stack>
  );
}
