import { useEffect, useState } from "react";
import { FairNodeType, StationType, TravelTimeType } from "../../types/Types";
import axios from "axios";
import { getApiUrl } from "../../config/env";
import { logUserEvent } from "./analytics";

export function useResultsData(stations: StationType[]) {
  const [loading, setLoading] = useState<boolean>(true);
  const [travelTimes, setTravelTimes] = useState<TravelTimeType[][] | null>([]);

  const fetchResults = async (stations: StationType[]) => {
    if (stations.length === 0) return;

    setLoading(true);
    const stationNaptans = stations.map((s) => s.stationNaptan);
    logUserEvent(stationNaptans);

    try {
      const { data } = await axios.post(getApiUrl("ROUTE"), {
        stations: stationNaptans,
      });
      setTravelTimes(data.travel_times);
    } catch {
      setTravelTimes(null);
    } finally {
      setLoading(false);
    }
  };

  return { loading, travelTimes, fetchResults };
}
