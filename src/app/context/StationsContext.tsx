import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { StationType } from "../../types/Types";
import { getApiUrl } from "../../config/env";

interface StationsContextType {
  allStations: StationType[];
  selectedStations: StationType[];
  setSelectedStations: React.Dispatch<React.SetStateAction<StationType[]>>;
  isLoading: boolean;
}

const StationsContext = createContext<StationsContextType | undefined>(
  undefined
);

export function StationsProvider({ children }: { children: ReactNode }) {
  const [allStations, setAllStations] = useState<StationType[]>([]);
  const [selectedStations, setSelectedStations] = useState<StationType[]>([
    { commonName: "", stationNaptan: "", lat: 0, lon: 0, modes: [] },
    { commonName: "", stationNaptan: "", lat: 0, lon: 0, modes: [] },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Get all station names
    const fetchAPI = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(getApiUrl("STATIONS"));
        const uniqueStations: StationType[] = Array.from(
          new Map(
            (response.data as StationType[]).map((station) => [
              station.commonName,
              station,
            ])
          ).values()
        );
        setAllStations(uniqueStations);
      } catch (error) {
        console.error("Error fetching stations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAPI();
  }, []);

  return (
    <StationsContext.Provider
      value={{
        allStations,
        selectedStations,
        setSelectedStations,
        isLoading,
      }}
    >
      {children}
    </StationsContext.Provider>
  );
}

export function useStations() {
  const context = useContext(StationsContext);
  if (context === undefined) {
    throw new Error("useStations must be used within a StationsProvider");
  }
  return context;
}
