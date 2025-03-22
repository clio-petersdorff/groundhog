// Define types for the response

export interface StopPointType {
  commonName: string;
  additionalProperties: { key: string; value: string }[];
  lat: number;
  lon: number;
}

export interface StationType {
  name: string;
  zones: string;
  latitude: number;
  longitude: number;
}
