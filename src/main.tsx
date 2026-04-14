import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import PokedexPage from "@/pages/PokedexPage";
import PokemonPage from "@/pages/PokemonPage";
import NotFoundPage from "@/pages/NotFoundPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokedexPage />} />
        <Route path="/pokemon/:name" element={<PokemonPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
