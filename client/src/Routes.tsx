import { Route, Routes as DomRoutes } from 'react-router-dom';

import { Home } from './pages/home';
import { NotFound } from './pages/not-found';
import { SchedulesRegister } from './pages/work-times';

export function Routes() {
  return (
    <main className="h-screen w-screen">
      <DomRoutes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="schedules-register" element={<SchedulesRegister />} />
      </DomRoutes>
    </main>
  );
}
