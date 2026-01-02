import { Group, Text, Badge, ColorSwatch, Stack } from "@mantine/core";
import { TravelTimeType } from "../../../types/Types";
import { lineToColour } from "../../../constants/colourMap";

interface RouteDisplayProps {
  route: TravelTimeType["route"];
  showMeetingPoint?: boolean;
}

export default function RouteDisplay({
  route,
  showMeetingPoint = false,
}: RouteDisplayProps) {
  // Reverse the route so the "from" station is shown first
  const reversedRoute = route.slice().reverse();

  return (
    <Stack gap="xs">
      {reversedRoute.flatMap((pathItem, routeIndex) =>
        pathItem.path
          .slice()
          .reverse() // Reverse so that the meeting point is shown last
          .map((station, stationIndex) => (
            <Group key={`${routeIndex}-${stationIndex}`} wrap="nowrap">
              <ColorSwatch
                color={lineToColour.get(pathItem.line) ?? ""}
                size={12}
              />
              <Text size="sm">{station}</Text>
              {showMeetingPoint &&
                routeIndex === reversedRoute.length - 1 &&
                stationIndex === pathItem.path.length - 1 && (
                  <Badge size="xs" color="teal" variant="light">
                    🎯 Meeting Point
                  </Badge>
                )}
            </Group>
          ))
      )}
    </Stack>
  );
}
