import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import Home from "./app/Home";

export default function App() {
  return (
    <MantineProvider>
      <Home />
    </MantineProvider>
  );
}
