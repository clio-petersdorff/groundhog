import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import Home from "./app/Home";
import React, { useEffect } from "react";
import axios from "axios";

export default function App() {
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8000/api/users");
    console.log(response.data.users);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <MantineProvider>
      <Home />
    </MantineProvider>
  );
}
