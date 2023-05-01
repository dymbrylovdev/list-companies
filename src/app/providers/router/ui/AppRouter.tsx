import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoaderPage } from 'pages/loader';
import { RouterConfig } from "shared/config";
import { Sidebar } from "widgetes/sidebar";

export const AppRouter = () => (
  <Suspense fallback={<LoaderPage />}>
    <Routes>
      {Object.values(RouterConfig).map(({ element, path }) => (
        <Route
          key={path}
          path={path}
          element={element}
        />
      ))}
    </Routes>
  </Suspense>
);
