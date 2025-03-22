import { StationType } from "../types/Types";

function getAllCandidates(stations: StationType[]) {
  // Find the midpoint between the two stations
  const { lat, lon } = getMidPoint(stations);

  // Calculate the distance from the midpoint to one of the stations ("radius")
  const radius = getDistance(
    lat,
    lon,
    stations[0].latitude,
    stations[0].longitude
  );

  // Filter stations that are further away than the radius
  const candidates = stations.filter((station) => {
    const distance = getDistance(lat, lon, station.latitude, station.longitude);
    return distance <= radius; // Keep stations within the radius
  });

  return [candidates];
}

export default getAllCandidates;

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

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2));
}
