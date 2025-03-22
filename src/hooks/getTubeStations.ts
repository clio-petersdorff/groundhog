import { StationType, StopPointType } from "../types/Types";

const url = "https://api.tfl.gov.uk/StopPoint/Mode/tube";

async function getTubeStations(): Promise<StationType[]> {
  const response = await fetch(url);
  const data: { stopPoints: StopPointType[] } = await response.json();

  // Extract station names & zones
  const stations: StationType[] = data.stopPoints.map((stop) => ({
    name: stop.commonName,
    zones:
      stop.additionalProperties.find((prop) => prop.key === "Zone")?.value ||
      "Unknown",
    latitude: stop.lat,
    longitude: stop.lon,
  }));

  // Remove duplicates by name
  const uniqueStations = Array.from(
    new Map(stations.map((s) => [s.name, s])).values()
  );

  return uniqueStations;
}

export default getTubeStations;
