import { Title } from "@mantine/core";
import getAllCandidates from "../actions/getAllCandidates";
import { StationType } from "../types/Types";
import Loading from "./Loading";

interface ResultsProps {
  stations: StationType[];
  setView: (view: string) => void;
}

export default function Results({ stations }: ResultsProps) {
  const candidates = getAllCandidates(stations);
  console.log(candidates);

  if (!candidates) {
    return <Loading />;
  }

  return (
    <>
      <Title>All station options</Title>
      {/* {candidates.map((item) => item.name)} */}
    </>
  );
}
