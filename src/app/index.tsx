import React, { Suspense } from 'react';
import './styles/index.scss';
import { AppRouter } from 'app/providers/router';
import { ClassNames } from 'shared/lib';
import { useTheme } from 'features/theme';
import { Sidebar } from 'widgetes/sidebar';
import { Modal } from "shared/ui";

const Index = () => {
  const { theme } = useTheme();

  return (
    <div className={ClassNames('app', {}, [theme])}>
      <Suspense fallback={<div>Translate...</div>}>
        <div className="container-content">
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default Index;
