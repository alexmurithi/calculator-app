import { BrowserRouter as Router } from 'react-router-dom';
import { Suspense } from 'react';
import AppRoutes from './Routes';

const App = () => {
  return (
    <>
      <Suspense fallback={<div>loading..</div>}>
        <Router>
          <AppRoutes />
        </Router>
      </Suspense>
    </>
  );
};

export default App;
