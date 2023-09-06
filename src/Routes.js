import { Route, Routes } from 'react-router-dom';

import React, { lazy } from 'react';

const Calculator = lazy(() => import('./components/Calculator'));

const HistoryPage = lazy(() => import('./components/History'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Calculator />} />
      <Route path="history" exact element={<HistoryPage />} />
    </Routes>
  );
};

export default AppRoutes;
