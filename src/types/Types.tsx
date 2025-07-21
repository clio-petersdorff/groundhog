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

export type FairNodeType = {
  fair_node: string;
  fair_name: string;
  max_time: number;
};

type RouteType = {
  line: string;
  path: string[];
};

export type TravelTimeType = {
  fairStation: string;
  fromStation: string;
  travel_time: number;
  route: RouteType[];
};
