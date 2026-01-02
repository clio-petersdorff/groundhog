import { Paper, Stack } from "@mantine/core";
import { StationType, TravelTimeType } from "../../../types/Types";
import HeroCard from "./HeroCard";
import UserTravelCard from "./UserTravelCard";

interface FairStationProps {
  stationData: TravelTimeType[];
  allStations: StationType[];
  stationName: string;
  expandedCard: TravelTimeType | null;
  onToggleExpand: (card: TravelTimeType) => void;
}

export default function FairStation({
  stationData,
  allStations,
  stationName,
  expandedCard,
  onToggleExpand,
}: FairStationProps) {
  // Calculate max and average travel times
  const travelTimes = stationData.map((row) => row.travel_time);
  const maxTime = Math.max(...travelTimes);
  const avgTime = travelTimes.reduce((a, b) => a + b, 0) / travelTimes.length;

  return (
    <Paper p="lg" radius="md" bg="#EAE8FF">
      <Stack gap="sm">
        <HeroCard
          stationName={stationName}
          maxTime={maxTime}
          avgTime={avgTime}
        />
        {stationData.map((row, index) => (
          <UserTravelCard
            key={index}
            travelTime={row}
            userIndex={index}
            allStations={allStations}
            isExpanded={expandedCard === row}
            onToggleExpand={() => onToggleExpand(row)}
          />
        ))}
      </Stack>
    </Paper>
  );
}
