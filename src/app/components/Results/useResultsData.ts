import { useEffect, useState } from "react";
import {
  FairNodeType,
  StationType,
  TravelTimeType,
} from "../../../types/Types";
import axios from "axios";
import { getApiUrl } from "../../../config/env";

export function useResultsData(stations: StationType[]) {
  const [loading, setLoading] = useState<boolean>(true);
  const [travelTimes, setTravelTimes] = useState<TravelTimeType[][] | null>([]);
  const [fairNodes, setFairNodes] = useState<FairNodeType[] | null>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function getResults(selectedStations: StationType[]) {
      const data = {
        stations: selectedStations.map(({ stationNaptan }) => stationNaptan),
      };
      try {
        setLoading(true);
        setError(null);
        const response = await axios.post(getApiUrl("ROUTE"), data);
        setFairNodes(response.data.fair_nodes);
        setTravelTimes(response.data.travel_times);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setFairNodes(null);
        setTravelTimes(null);
      } finally {
        setLoading(false);
      }
    }

    getResults(stations);
  }, [stations]);

  return { loading, travelTimes, fairNodes, error };
}
