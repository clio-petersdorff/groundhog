// Route paths for the application
export const ROUTES = {
  HOME: "/",
  INPUTS: "/inputs",
  RESULTS: "/results",
} as const;

// Type for route paths
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
