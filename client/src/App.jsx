import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import PublicLayout from './layouts/PublicLayout';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Temporary placeholder for unbuilt screens
const Placeholder = ({ title }) => (
  <div className="flex-1 flex items-center justify-center bg-surface p-8">
    <div className="bg-surface-container rounded-2xl p-8 border border-outline-variant max-w-md w-full text-center">
      <h2 className="text-2xl font-bold text-on-surface mb-2">{title}</h2>
      <p className="text-on-surface-variant text-sm">This screen is scheduled for a future phase.</p>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (No Auth Required) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Auth Gated Routes */}
        <Route element={<AuthLayout />}>
          {/* Dashboard & Admin */}
          <Route path="/dashboard" element={<Placeholder title="App Dashboard" />} />
          
          {/* Master Data: Contacts & Products */}
          <Route path="/contacts" element={<Placeholder title="Contacts" />} />
          <Route path="/products" element={<Placeholder title="Products" />} />
          
          {/* Accounting Setup */}
          <Route path="/chart-of-accounts" element={<Placeholder title="Chart of Accounts" />} />
          <Route path="/journals" element={<Placeholder title="Journals" />} />
          <Route path="/journal-entries" element={<Placeholder title="Journal Entries" />} />
          <Route path="/analyticals" element={<Placeholder title="Analyticals" />} />
          <Route path="/analytical-budget" element={<Placeholder title="Analytical Budget" />} />
          
          {/* Budgeting */}
          <Route path="/budget-report" element={<Placeholder title="Budget Report" />} />

          {/* Purchase Cycle */}
          <Route path="/purchase-orders" element={<Placeholder title="Purchase Orders" />} />
          <Route path="/vendor-bills" element={<Placeholder title="Vendor Bills" />} />
          <Route path="/payments" element={<Placeholder title="Payments" />} />

          {/* Sales Cycle */}
          <Route path="/sales-orders" element={<Placeholder title="Sales Orders" />} />
          <Route path="/customer-invoices" element={<Placeholder title="Customer Invoices" />} />
          <Route path="/receipts" element={<Placeholder title="Receipts" />} />

          {/* Reports */}
          <Route path="/balance-sheet" element={<Placeholder title="Balance Sheet" />} />
          <Route path="/profit-and-loss" element={<Placeholder title="Profit and Loss" />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

