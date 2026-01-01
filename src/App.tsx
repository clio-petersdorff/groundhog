import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Layout from "./app/components/Layout/Layout";
import { StationsProvider } from "./app/context/StationsContext";
import HowToGuidePage from "./app/pages/HowToGuidePage";
import InputsPage from "./app/pages/InputsPage";
import ResultsPage from "./app/pages/ResultsPage";
import { ROUTES } from "./constants/routes";

export default function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <StationsProvider>
          <Layout>
            <Routes>
              <Route path={ROUTES.HOME} element={<HowToGuidePage />} />
              <Route path={ROUTES.INPUTS} element={<InputsPage />} />
              <Route path={ROUTES.RESULTS} element={<ResultsPage />} />
              <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
            </Routes>
          </Layout>
        </StationsProvider>
      </BrowserRouter>
    </MantineProvider>
  );
}
