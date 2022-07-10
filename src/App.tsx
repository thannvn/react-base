import StorageService from 'shared/services/storage';
import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingComponent from 'shared/components/loading/loading.component';
import './translation/i18n';
import { setIconSet } from 'shared/services/icons/app-icon.component';
import icons from 'shared/services/icons/icon-list';

const Home = React.lazy(() => import('app/modules/home/routing'));

function App() {
  useEffect(() => {
    StorageService.init();
    setIconSet(icons);
  }, []);

  return (
    <div>
      <Suspense fallback={<LoadingComponent open />}>
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
