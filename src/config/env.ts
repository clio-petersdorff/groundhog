export const API_BASE_URL = "http://localhost:8000";

export const API_ENDPOINTS = {
  STATIONS: "/api/stations",
  ROUTE: "/api/route",
} as const;

// Helper function to build full API URLs.
export const getApiUrl = (endpoint: keyof typeof API_ENDPOINTS): string => {
  return `${API_BASE_URL}${API_ENDPOINTS[endpoint]}`;
};
