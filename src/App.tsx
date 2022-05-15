import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './translation/i18n';

const Home = React.lazy(() => import('app/modules/home/routing'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>...Loading</div>}>
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
