import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import Home from "./app/Home";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [stations, setStations] = useState({});
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8000/api/stations");
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {
    setStations(fetchAPI());
  }, []);

  return (
    <MantineProvider>
      <Home />
    </MantineProvider>
  );
}
