import { StationType } from "../types/Types";

function getAllCandidates(stations: StationType[]) {
  // Find the midpoint between the two stations
  const { lat, lon } = getMidPoint(stations);
  // Calculate the distance from the midpoint to one of the stations ("radius")

  // Filter stations that are further away than the radius

  return [];
}

function getMidPoint(stations: StationType[]) {
  // Sum together the latitudes and longitudes
  const { lat, lon } = stations.reduce(
    (accumulator, { latitude, longitude }) => {
      accumulator.lat += latitude;
      accumulator.lon += longitude;
      return accumulator;
    },
    { lat: 0, lon: 0 }
  );
  // Get the average latitude and longitude
  const midLat = lat / stations.length;
  const midLon = lon / stations.length;

  return { lat: midLat, lon: midLon };
}
