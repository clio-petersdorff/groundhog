import React from "react";
import Inputs from "../components/InputView/Inputs";
import { useStations } from "../context/StationsContext";

export default function InputsPage() {
  const { allStations, selectedStations, setSelectedStations } = useStations();

  return (
    <Inputs
      allStations={allStations}
      selectedStations={selectedStations}
      setSelectedStations={setSelectedStations}
    />
  );
}
