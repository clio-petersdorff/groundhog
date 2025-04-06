// Define types for the response

export interface StopPointType {
  commonName: string;
  additionalProperties: { key: string; value: string }[];
  lat: number;
  lon: number;
}

export interface StationType {
  commonName: string;
  stationNaptan: string;
  lat: number;
  lon: number;
  modes: string[];
}
