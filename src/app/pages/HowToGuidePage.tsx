import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import HowToGuide from "../Components/HowToGuide/HowToGuide";

export default function HowToGuidePage() {
  const navigate = useNavigate();

  const handleNavigate = (view: string) => {
    // Map old view strings to new routes
    if (view === "inputs") {
      navigate(ROUTES.INPUTS);
    } else if (view === "results") {
      navigate(ROUTES.RESULTS);
    }
  };

  return <HowToGuide setView={handleNavigate} />;
}
