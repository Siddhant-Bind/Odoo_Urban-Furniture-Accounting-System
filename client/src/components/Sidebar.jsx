import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Package, FileText, PieChart, CreditCard, ShoppingCart } from 'lucide-react';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  {
    label: 'Sales',
    items: [
      { path: '/sales-orders', label: 'Sales Order', icon: ShoppingCart },
      { path: '/customer-invoices', label: 'Sale Invoice', icon: FileText },
      { path: '/receipts', label: 'Receipt', icon: CreditCard },
    ],
  },
  {
    label: 'Purchase',
    items: [
      { path: '/purchase-orders', label: 'Purchase Order', icon: ShoppingCart },
      { path: '/vendor-bills', label: 'Purchase Bill', icon: FileText },
      { path: '/payments', label: 'Payment', icon: CreditCard },
    ],
  },
  {
    label: 'Account',
    items: [
      { path: '/contacts', label: 'Contact', icon: Users },
      { path: '/products', label: 'Product', icon: Package },
      { path: '/analyticals', label: 'Analyticals', icon: PieChart },
      { path: '/analytical-budget', label: 'Analytical Budget', icon: PieChart },
      { path: '/chart-of-accounts', label: 'Chart of Account', icon: FileText },
      { path: '/journals', label: 'Journals', icon: FileText },
      { path: '/journal-entries', label: 'Journal Entries', icon: FileText },
    ],
  },
  {
    label: 'Report',
    items: [
      { path: '/balance-sheet', label: 'Balance Sheet', icon: PieChart },
      { path: '/profit-and-loss', label: 'Profit and Loss', icon: PieChart },
      { path: '/budget-report', label: 'Budget Report', icon: PieChart },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-surface-bg border-r border-border flex flex-col h-[calc(100vh-4rem)] overflow-y-auto hidden md:block">
      <div className="p-4 flex flex-col gap-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive ? 'bg-primary-bg text-primary' : 'text-text-secondary hover:bg-page-bg hover:text-text-primary'
            }`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        {menuItems.slice(1).map((group, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <h3 className="px-3 text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
              {group.label}
            </h3>
            {group.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-bg text-primary'
                      : 'text-text-secondary hover:bg-page-bg hover:text-text-primary'
                  }`
                }
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}
