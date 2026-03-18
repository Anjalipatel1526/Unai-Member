import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './platform/superadmin/layout/MainLayout';
import { Dashboard } from './platform/superadmin/pages/Dashboard';
import { Clients } from './platform/superadmin/pages/Clients';

import { Billing } from './platform/superadmin/pages/Billing';
import { Support } from './platform/superadmin/pages/Support';
import { Monitoring } from './platform/superadmin/pages/Monitoring';
import { Features } from './platform/superadmin/pages/Features';
import { Roles } from './platform/superadmin/pages/Roles';
import { Settings } from './platform/superadmin/pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="billing" element={<Billing />} />
          <Route path="support" element={<Support />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="features" element={<Features />} />
          <Route path="roles" element={<Roles />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
