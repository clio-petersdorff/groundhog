import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import Inputs from "../Components/InputView/Inputs";
import { useStations } from "../context/StationsContext";

export default function InputsPage() {
  const navigate = useNavigate();
  const { allStations, selectedStations, setSelectedStations } = useStations();

  const handleNavigate = (view: string) => {
    if (view === "results") {
      navigate(ROUTES.RESULTS);
    }
  };

  return (
    <Inputs
      setView={handleNavigate}
      allStations={allStations}
      selectedStations={selectedStations}
      setSelectedStations={setSelectedStations}
    />
  );
}
