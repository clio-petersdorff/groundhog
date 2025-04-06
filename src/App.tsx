import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import Home from "./app/Home";
import React, { useEffect, useState } from "react";

export default function App() {
  return (
    <MantineProvider>
      <Home />
    </MantineProvider>
  );
}
