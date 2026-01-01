import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import Results from "../Results";
import { useStations } from "../context/StationsContext";

export default function ResultsPage() {
  const navigate = useNavigate();
  const { allStations, selectedStations } = useStations();

  const handleNavigate = (view: string) => {
    if (view === "inputs") {
      navigate(ROUTES.INPUTS);
    }
  };

  return (
    <Results
      allStations={allStations}
      stations={selectedStations}
      setView={handleNavigate}
    />
  );
}
