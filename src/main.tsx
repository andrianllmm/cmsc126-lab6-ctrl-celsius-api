import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';

import MainLayout from '@/layouts/MainLayout';
import PokedexPage from '@/pages/PokedexPage';
import PokemonPage from '@/pages/PokemonPage';
import NotFoundPage from '@/pages/NotFoundPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<PokedexPage />} />
          <Route path='/pokemon/:name' element={<PokemonPage />} />
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
