import React from "react";
import Results from "../components/Results/Results";
import { useStations } from "../context/StationsContext";

export default function ResultsPage() {
  const { allStations, selectedStations } = useStations();

  return <Results allStations={allStations} stations={selectedStations} />;
}
