import { useEffect, useRef, useState } from "react";
import fetchNearbyPlaces from "../actions/fetchNearbyPlaces";
import getAllCandidates from "../actions/getAllCandidates";
import { StationType } from "../types/Types";
import Loading from "./Loading";
import { Badge, Button, Group, Paper, Stack, Title, Text } from "@mantine/core";
import { IconArrowLeft, IconStar } from "@tabler/icons-react";

interface ResultsProps {
  stations: StationType[];
  setView: (view: string) => void;
}

export default function Results({ stations, setView }: ResultsProps) {
  const [nearbyPlaces, setNearbyPlaces] = useState<any[] | null>(null); // Store the fetched places
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [allCandidates, setAllCandidates] = useState<any[] | null>(null);

  useEffect(() => {
    const candidates = getAllCandidates(stations);

    setAllCandidates(candidates);
  }, []);

  // Inside your Results component
  const isFetching = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (isFetching.current || !allCandidates) return; // Add null check for allCandidates
      isFetching.current = true;

      try {
        setLoading(true);
        const places = await fetchNearbyPlaces(
          allCandidates[0]?.latitude || 0,
          allCandidates[0]?.longitude || 0,
          "restaurant"
        );
        setNearbyPlaces(places);
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    };

    fetchData();
  }, [allCandidates]);

  if (!nearbyPlaces || loading) {
    return <Loading />;
  }

  console.log(nearbyPlaces);

  return (
    <Stack>
      {nearbyPlaces.map((item) => (
        <Paper shadow="xs" p="xl">
          <Stack>
            <Group justify="space-between">
              <Title order={5}>{item.displayName.text}</Title>
              <Badge color="yellow" leftSection={<IconStar size={12} />}>
                {item.rating}
              </Badge>
            </Group>
            <Text>{item.formattedAddress}</Text>
          </Stack>
        </Paper>
      ))}
      <Button
        onClick={() => (setView("inputs"), setAllCandidates(null))}
        w="7em"
        color="cyan"
        leftSection={<IconArrowLeft size={14} />}
      >
        Back
      </Button>
    </Stack>
  );
}
