import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import Home from "./app/Home";
import React from "react";

export default function App() {
  return (
    <MantineProvider>
      <Home />
    </MantineProvider>
  );
}
