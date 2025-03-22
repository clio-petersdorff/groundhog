import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import Home from "./app/Home";
import Results from "./app/Results";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
