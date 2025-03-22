import fs from "fs";
import path from "path";
import { StationType, StopPointType } from "../types/Types";

const url = "https://api.tfl.gov.uk/StopPoint/Mode/tube";

async function getTubeStations(): Promise<StationType[]> {
  const response = await fetch(url);
  const data: { stopPoints: StopPointType[] } = await response.json();

  const stations: StationType[] = data.stopPoints.map((stop) => ({
    name: stop.commonName,
    zones:
      stop.additionalProperties.find(
        (prop: { key: string }) => prop.key === "Zone"
      )?.value || "Unknown",
    latitude: stop.lat,
    longitude: stop.lon,
  }));

  const uniqueStations = Array.from(
    new Map(stations.map((s) => [s.name, s])).values()
  );

  return uniqueStations;
}

async function saveStationsToFile() {
  const stations = await getTubeStations();
  const filePath = path.join("./src/assets/tube_stations.json");

  fs.writeFileSync(filePath, JSON.stringify(stations, null, 2));
  console.log(`✅ Stations saved to ${filePath}`);
}

// Run the function once
saveStationsToFile();
