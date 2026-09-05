import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import PublicLayout from './layouts/PublicLayout';
import { useAuth } from './context/AuthContext';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreateUser from './pages/CreateUser';
import ContactList from './pages/ContactList';
import ContactKanban from './pages/ContactKanban';
import CreateContact from './pages/CreateContact';
import ProductList from './pages/ProductList';
import ProductKanban from './pages/ProductKanban';
import CreateProduct from './pages/CreateProduct';
import ChartOfAccounts from './pages/ChartOfAccounts';
import NewAccount from './pages/NewAccount';
import Journals from './pages/Journals';
import NewJournal from './pages/NewJournal';
import JournalEntries from './pages/JournalEntries';
import NewJournalEntry from './pages/NewJournalEntry';
import BudgetForm from './pages/BudgetForm';
import PurchaseOrderForm from './pages/PurchaseOrderForm';
import VendorBillForm from './pages/VendorBillForm';
import BillPaymentForm from './pages/BillPaymentForm';
import BudgetRevisedForm from './pages/BudgetRevisedForm';
import BudgetReportList from './pages/BudgetReportList';
import BudgetReportKanban from './pages/BudgetReportKanban';
import ForgotPassword from './pages/ForgotPassword';
import SalesOrderForm from './pages/SalesOrderForm';
import CustomerInvoiceForm from './pages/CustomerInvoiceForm';
import InvoiceRegister from './pages/InvoiceRegister';
import ProfitAndLoss from './pages/ProfitAndLoss';
import SalesSheet from './pages/SalesSheet';

// Temporary placeholder for unbuilt screens
const Placeholder = ({ title }) => (
  <div className="flex-1 flex items-center justify-center bg-surface p-8">
    <div className="bg-surface-container rounded-2xl p-8 border border-outline-variant max-w-md w-full text-center">
      <h2 className="text-2xl font-bold text-on-surface mb-2">{title}</h2>
      <p className="text-on-surface-variant text-sm">This screen is scheduled for a future phase.</p>
    </div>
  </div>
);

// Auth guard: redirect unauthenticated users to /login
function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (No Auth Required) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Auth Gated Routes */}
        <Route element={<AuthLayout />}>
          {/* Dashboard & Admin */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-user" element={<CreateUser />} />          
          {/* Master Data: Contacts & Products */}
          <Route path="/contacts" element={<Navigate to="/contacts/list" replace />} />
          <Route path="/contacts/list" element={<ContactList />} />
          <Route path="/contacts/kanban" element={<ContactKanban />} />
          <Route path="/contacts/new" element={<CreateContact />} />
          <Route path="/products" element={<Navigate to="/products/list" replace />} />
          <Route path="/products/list" element={<ProductList />} />
          <Route path="/products/kanban" element={<ProductKanban />} />
          <Route path="/products/new" element={<CreateProduct />} />
          
          {/* Accounting Setup */}
          <Route path="/chart-of-accounts" element={<ChartOfAccounts />} />
          <Route path="/chart-of-accounts/new" element={<NewAccount />} />
          <Route path="/journals" element={<Journals />} />
          <Route path="/journals/new" element={<NewJournal />} />
          <Route path="/journal-entries" element={<JournalEntries />} />
          <Route path="/journal-entries/new" element={<NewJournalEntry />} />
          <Route path="/analyticals" element={<Placeholder title="Analyticals" />} />
          
          {/* Budgeting */}
          <Route path="/analytical-budget" element={<Navigate to="/budget-report" replace />} />
          <Route path="/analytical-budget/new" element={<BudgetForm />} />
          <Route path="/analytical-budget/revised" element={<BudgetRevisedForm />} />
          <Route path="/budget-report" element={<BudgetReportList />} />
          <Route path="/budget-report/kanban" element={<BudgetReportKanban />} />

          {/* Purchase Cycle */}
          <Route path="/purchase-orders" element={<PurchaseOrderForm />} />
          <Route path="/purchase-orders/new" element={<PurchaseOrderForm />} />
          <Route path="/vendor-bills" element={<VendorBillForm />} />
          <Route path="/vendor-bills/new" element={<VendorBillForm />} />
          <Route path="/payments" element={<BillPaymentForm />} />
          <Route path="/payments/new" element={<BillPaymentForm />} />

          {/* Sales Cycle */}
          <Route path="/sales-orders" element={<SalesOrderForm />} />
          <Route path="/sales-orders/new" element={<SalesOrderForm />} />
          <Route path="/customer-invoices" element={<InvoiceRegister />} />
          <Route path="/customer-invoices/new" element={<CustomerInvoiceForm />} />
          <Route path="/receipts" element={<Placeholder title="Receipts" />} />

          {/* Reports */}
          <Route path="/balance-sheet" element={<Placeholder title="Balance Sheet" />} />
          <Route path="/profit-and-loss" element={<ProfitAndLoss />} />
          <Route path="/sales-sheet" element={<SalesSheet />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}


