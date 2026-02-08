import React from "react";
import { useStations } from "../context/StationsContext";
import Inputs from "../Components/InputView/Inputs";

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
