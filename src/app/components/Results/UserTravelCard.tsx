import {
  Paper,
  Stack,
  Text,
  Title,
  Group,
  Divider,
  ColorSwatch,
  Tooltip,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { StationType, TravelTimeType } from "../../../types/Types";
import { lineToColour } from "../../../constants/colourMap";
import RouteDisplay from "./RouteDisplay";
import { capitalizeFirstLetter } from "../../actions/helpers";
import React from "react";

interface UserTravelCardProps {
  travelTime: TravelTimeType;
  userIndex: number;
  allStations: StationType[];
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function UserTravelCard({
  travelTime,
  userIndex,
  allStations,
  isExpanded,
  onToggleExpand,
}: UserTravelCardProps) {
  const fromStation =
    allStations.find(
      (station) => station.stationNaptan === travelTime.fromStation
    )?.commonName || "Unknown station";

  const travelTimeNum = Number(travelTime.travel_time);

  return (
    <Paper
      onClick={onToggleExpand}
      withBorder
      px="md"
      py="sm"
      radius="md"
      shadow="sm"
      style={{ cursor: "pointer" }}
    >
      <Stack gap="xs">
        <Group gap="xl" wrap="nowrap">
          <Stack gap={0} align="center" w="3em">
            <Title order={4} p={0}>
              {Math.round(travelTimeNum)}
            </Title>
            <Text size="sm" c="dimmed">
              min
            </Text>
          </Stack>

          <Stack gap={0}>
            <Text fw="bold" size="sm">
              User {userIndex + 1}
            </Text>
            <Text size="sm" c="dimmed">
              From: {fromStation}
            </Text>
          </Stack>
        </Group>

        <Divider />

        {isExpanded ? (
          <RouteDisplay route={travelTime.route} showMeetingPoint />
        ) : (
          <Tooltip label="Click to expand" position="right" color="#2D3142">
            <Group gap="xs" wrap="wrap">
              {travelTime.route.slice().map((pathItem, routeIndex) => (
                <Group key={routeIndex} gap="xs">
                  <ColorSwatch
                    color={lineToColour.get(pathItem.line) ?? ""}
                    size={12}
                  />
                  <Text size="sm">{capitalizeFirstLetter(pathItem.line)}</Text>
                  {routeIndex < travelTime.route.length - 1 && (
                    <IconArrowRight size={14} />
                  )}
                </Group>
              ))}
            </Group>
          </Tooltip>
        )}
      </Stack>
    </Paper>
  );
}
