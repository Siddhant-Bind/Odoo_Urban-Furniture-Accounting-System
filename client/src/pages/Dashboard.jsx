import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AlertTriangle, BarChart3, Briefcase, CheckCircle, ChevronDown, ChevronRight, Clock, Filter, Kanban, Landmark, LayoutGrid, List, Lock, LogOut, PieChart, Plus, Receipt, RefreshCw, Search, Shield, ShieldCheck, ShoppingBag, Truck, User, Wallet, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { fetchClient } from "../utils/api";

const SYSTEM_MODULES = [
  { name: "Sales Orders", path: "/sales-orders", category: "Sales" },
  { name: "Sale Invoices", path: "/customer-invoices", category: "Sales" },
  { name: "Receipts", path: "/receipts", category: "Sales" },
  { name: "Purchase Orders", path: "/purchase-orders", category: "Purchase" },
  { name: "Purchase Bills", path: "/vendor-bills", category: "Purchase" },
  { name: "Payments", path: "/payments", category: "Purchase" },
  { name: "Contacts", path: "/contacts/list", category: "Account" },
  { name: "Product Catalog", path: "/products/list", category: "Account" },
  { name: "Analytical Budget", path: "/analytical-budget/new", category: "Account" },
  { name: "Chart of Accounts", path: "/chart-of-accounts", category: "Account" },
  { name: "Journals", path: "/journals", category: "Account" },
  { name: "Journal Entries", path: "/journal-entries", category: "Account" },
  { name: "Balance Sheet", path: "/balance-sheet", category: "Report" },
  { name: "Profit and Loss", path: "/profit-and-loss", category: "Report" },
  { name: "Budget Report", path: "/budget-report", category: "Report" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const userRole = user?.role ?? "Admin";

  const [viewMode, setViewMode] = useState("list");
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [directoryFilter, setDirectoryFilter] = useState("");
  const [openSections, setOpenSections] = useState({
    sales: false,
    purchase: false,
    account: false,
    report: false,
  });

  const [salesOrders, setSalesOrders] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchClient('/sales/orders').catch(() => []),
      fetchClient('/purchase/orders').catch(() => []),
      fetchClient('/accounts').catch(() => []),
      fetchClient('/journal-entries').catch(() => []),
      fetchClient('/sales/invoices').catch(() => []),
      fetchClient('/purchase/bills').catch(() => [])
    ]).then(([sales, purchase, accs, entries, invs, bls]) => {
      setSalesOrders(sales);
      setPurchaseOrders(purchase);
      setAccounts(accs);
      setJournalEntries(entries);
      setInvoices(invs);
      setBills(bls);
      setLoading(false);
    });
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const salesTotal = salesOrders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);
  const salesDraftCount = salesOrders.filter(o => o.status === 'DRAFT').length;
  const salesConfirmedCount = salesOrders.filter(o => o.status !== 'DRAFT').length;

  const purchaseTotal = purchaseOrders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);
  const purchaseDraftCount = purchaseOrders.filter(o => o.status === 'DRAFT').length;
  const purchaseConfirmedCount = purchaseOrders.filter(o => o.status !== 'DRAFT').length;

  const bankAccount = accounts.find(a => a.accountType === 'BANK' || a.accountName?.toLowerCase().includes('bank')) || { balance: 0, accountName: 'Bank A/c' };
  const cashAccount = accounts.find(a => a.accountType === 'CASH' || a.accountName?.toLowerCase().includes('cash')) || { balance: 0, accountName: 'Cash Float' };
  const pendingEntries = journalEntries.filter(e => e.status === 'DRAFT').length;

  const totalAR = invoices.reduce((sum, inv) => {
    if (inv.status === 'POSTED') {
      const paid = inv.payments?.reduce((pSum, p) => pSum + Number(p.amount), 0) || 0;
      return sum + (Number(inv.totalAmount) - paid);
    }
    return sum;
  }, 0);

  const totalAP = bills.reduce((sum, bill) => {
    if (bill.status === 'POSTED') {
      const paid = bill.payments?.reduce((pSum, p) => pSum + Number(p.amount), 0) || 0;
      return sum + (Number(bill.totalAmount) - paid);
    }
    return sum;
  }, 0);

  const totalDebits = journalEntries.reduce((sum, entry) => 
    sum + (entry.lines?.reduce((lSum, line) => lSum + Number(line.debit || 0), 0) || 0)
  , 0);
  
  const totalCredits = journalEntries.reduce((sum, entry) => 
    sum + (entry.lines?.reduce((lSum, line) => lSum + Number(line.credit || 0), 0) || 0)
  , 0);

  const isLedgerBalanced = Math.abs(totalDebits - totalCredits) < 0.01;
  const ledgerVariance = Math.abs(totalDebits - totalCredits);

  const q = searchQuery.trim().toLowerCase();

  const filteredSalesOrders = salesOrders.filter((order) => {
    if (!q) return true;
    return (
      (order.orderNumber && order.orderNumber.toLowerCase().includes(q)) ||
      (order.customerName && order.customerName.toLowerCase().includes(q)) ||
      (order.status && order.status.toLowerCase().includes(q)) ||
      String(order.totalAmount || "").includes(q)
    );
  });

  const filteredPurchaseOrders = purchaseOrders.filter((order) => {
    if (!q) return true;
    return (
      (order.orderNumber && order.orderNumber.toLowerCase().includes(q)) ||
      (order.vendorName && order.vendorName.toLowerCase().includes(q)) ||
      (order.status && order.status.toLowerCase().includes(q)) ||
      String(order.totalAmount || "").includes(q)
    );
  });

  const matchingModules = q ? SYSTEM_MODULES.filter(m => m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q)) : [];
  const matchingInvoices = q ? invoices.filter(i => (i.invoiceNumber && i.invoiceNumber.toLowerCase().includes(q)) || (i.customerName && i.customerName.toLowerCase().includes(q))) : [];
  const matchingBills = q ? bills.filter(b => (b.billNumber && b.billNumber.toLowerCase().includes(q)) || (b.vendorName && b.vendorName.toLowerCase().includes(q))) : [];
  const matchingAccounts = q ? accounts.filter(a => (a.accountName && a.accountName.toLowerCase().includes(q)) || (a.code && a.code.toLowerCase().includes(q)) || (a.accountType && a.accountType.toLowerCase().includes(q))) : [];
  const matchingSales = q ? salesOrders.filter(o => (o.orderNumber && o.orderNumber.toLowerCase().includes(q)) || (o.customerName && o.customerName.toLowerCase().includes(q))) : [];
  const matchingPurchase = q ? purchaseOrders.filter(o => (o.orderNumber && o.orderNumber.toLowerCase().includes(q)) || (o.vendorName && o.vendorName.toLowerCase().includes(q))) : [];

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md min-h-screen relative overflow-x-hidden flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop flex items-center justify-between gap-space-lg">
          <div className="flex items-center gap-space-xl">
            <div className="h-9 px-space-base bg-surface-container-low rounded-lg flex items-center justify-center">
              <span className="font-label-md text-label-md tracking-wider text-on-surface font-bold uppercase">
                URBANMART
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-space-lg h-16">
              <Link
                className="h-16 inline-flex items-center transition-colors text-on-surface font-semibold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-container"
                to="/sales-orders"
              >
                Sales
              </Link>
              <Link
                className="h-16 inline-flex items-center font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
                to="/purchase-orders"
              >
                Purchase
              </Link>
              <Link
                className="h-16 inline-flex items-center font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
                to="/chart-of-accounts"
              >
                Account
              </Link>
              <Link
                className="h-16 inline-flex items-center font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
                to="/profit-and-loss"
              >
                Report
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-space-base">
            <div className="flex items-center gap-space-xs">
              <span className="hidden sm:inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                {userRole === "Admin" ? <Shield className="text-[14px] w-3.5 h-3.5" /> : <Briefcase className="text-[14px] w-3.5 h-3.5" />}
                {userRole}
              </span>
              {userRole === "Admin" && (
                <button
                  className="inline-flex items-center gap-space-xs px-space-base py-space-sm rounded-full bg-primary text-on-primary font-body-md text-body-md font-semibold hover:bg-primary/90 transition-colors shadow-sm cursor-pointer"
                  type="button"
                  onClick={() => navigate("/create-user")}
                >
                  <Plus className="text-[18px]" />
                  <span>Create User</span>
                </button>
              )}
            </div>
            <div className="h-8 w-[1px] bg-surface-container hidden sm:block"></div>
            {/* Profile dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-space-sm p-space-xs rounded-full hover:bg-surface-container-low transition-colors text-left cursor-pointer"
                type="button"
                onClick={() => setProfileOpen((o) => !o)}
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <User className="text-on-primary text-[18px]" />
                </div>
                <div className="hidden xl:flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">{user?.name ?? "USER"}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">{userRole}</span>
                </div>
                <ChevronDown className="text-on-surface-variant text-[20px]" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-surface-container rounded-xl shadow-lg z-50 overflow-hidden py-1">
                  <div className="px-4 py-2 border-b border-surface-container">
                    <p className="font-semibold text-sm text-on-surface">{user?.name ?? "USER"}</p>
                    <p className="text-xs text-on-surface-variant">{user?.email ?? ""}</p>
                  </div>

                  <div className="h-px bg-surface-container"></div>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error-container/30 transition-colors cursor-pointer">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="w-full pt-16 bg-background max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="flex flex-col w-full py-space-xl">
          {/*  Top Workspace Context & Control Header  */}
          <section className="flex flex-col gap-space-lg mb-space-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
              <div className="flex flex-col gap-space-2xs">
                <div className="flex items-center gap-space-sm flex-wrap">
                  <span className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                    Enterprise Workspace Overview
                  </span>
                  <span className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    Fiscal Year 2026 • Q2 Active
                  </span>
                </div>
                <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">

                </div>
              </div>
              {/*  Quick Action Controls & View Mode  */}
              <div className="flex items-center gap-space-sm self-start lg:self-auto">
                {userRole === "ADMIN" && (
                  <Link
                    to="/create-user"
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-full hover:opacity-90 transition-opacity font-label-sm font-semibold shadow-sm mr-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create User</span>
                  </Link>
                )}
                <div
                  className="inline-flex p-space-2xs bg-surface-container rounded-full"
                  role="tablist"
                >
                  <button
                    className={`px-space-md py-space-xs rounded-full font-label-md text-label-md font-semibold transition-all inline-flex items-center gap-space-xs cursor-pointer ${viewMode === "list"
                      ? "bg-surface-container-lowest text-on-surface shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                      }`}
                    id="btn-list-view"
                    type="button"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="text-[16px]" />
                    <span>List Grid</span>
                  </button>
                  <button
                    className={`px-space-md py-space-xs rounded-full font-label-md text-label-md font-semibold transition-all inline-flex items-center gap-space-xs cursor-pointer ${viewMode === "kanban"
                      ? "bg-surface-container-lowest text-on-surface shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                      }`}
                    id="btn-kanban-view"
                    type="button"
                    onClick={() => setViewMode("kanban")}
                  >
                    <Kanban className="text-[16px]" />
                    <span>Kanban</span>
                  </button>
                </div>
                <button
                  className="h-10 w-10 rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-on-surface flex items-center justify-center shadow-sm transition-colors cursor-pointer"
                  title="Refresh Telemetry"
                  type="button"
                >
                  <RefreshCw className="text-[18px]" />
                </button>
              </div>
            </div>
            {/* Active Search Input */}
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-space-base pointer-events-none text-on-surface-variant">
                <Search className="text-[20px]" />
              </span>
              <input
                className="w-full h-12 pl-12 pr-10 rounded-full bg-surface-container-lowest font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container/30 transition-all"
                placeholder="Search orders, invoices, accounts, or modules..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-space-base text-on-surface-variant hover:text-on-surface cursor-pointer"
                  type="button"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Dynamic Live Search Results Overlay */}
              {q !== "" && (
                <div className="absolute top-14 left-0 right-0 z-50 bg-surface-container-lowest border border-surface-container rounded-2xl shadow-xl p-space-md max-h-96 overflow-y-auto flex flex-col gap-space-md">
                  {matchingModules.length === 0 &&
                  matchingSales.length === 0 &&
                  matchingPurchase.length === 0 &&
                  matchingInvoices.length === 0 &&
                  matchingBills.length === 0 &&
                  matchingAccounts.length === 0 ? (
                    <div className="py-4 text-center text-on-surface-variant font-body-md">
                      No matches found for "{searchQuery}"
                    </div>
                  ) : (
                    <>
                      {matchingModules.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold uppercase text-on-surface-variant tracking-wider mb-2">Modules</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {matchingModules.map((m) => (
                              <Link
                                key={m.path}
                                to={m.path}
                                onClick={() => setSearchQuery("")}
                                className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors text-sm font-semibold text-on-surface"
                              >
                                <span>{m.name}</span>
                                <span className="text-xs text-primary font-bold">{m.category}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {matchingSales.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold uppercase text-on-surface-variant tracking-wider mb-2">Sales Orders</h4>
                          <div className="flex flex-col gap-1.5">
                            {matchingSales.slice(0, 4).map((o) => (
                              <Link
                                key={o.id}
                                to="/sales-orders"
                                onClick={() => setSearchQuery("")}
                                className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors text-sm"
                              >
                                <span className="font-semibold text-on-surface">{o.orderNumber} • {o.customerName}</span>
                                <span className="text-primary font-bold">₹{Number(o.totalAmount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {matchingPurchase.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold uppercase text-on-surface-variant tracking-wider mb-2">Purchase Orders</h4>
                          <div className="flex flex-col gap-1.5">
                            {matchingPurchase.slice(0, 4).map((o) => (
                              <Link
                                key={o.id}
                                to="/purchase-orders"
                                onClick={() => setSearchQuery("")}
                                className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors text-sm"
                              >
                                <span className="font-semibold text-on-surface">{o.orderNumber} • {o.vendorName}</span>
                                <span className="text-secondary font-bold">₹{Number(o.totalAmount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {matchingInvoices.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold uppercase text-on-surface-variant tracking-wider mb-2">Sale Invoices</h4>
                          <div className="flex flex-col gap-1.5">
                            {matchingInvoices.slice(0, 4).map((i) => (
                              <Link
                                key={i.id}
                                to="/customer-invoices"
                                onClick={() => setSearchQuery("")}
                                className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors text-sm"
                              >
                                <span className="font-semibold text-on-surface">{i.invoiceNumber} • {i.customerName}</span>
                                <span className="text-primary font-bold">₹{Number(i.totalAmount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {matchingBills.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold uppercase text-on-surface-variant tracking-wider mb-2">Vendor Bills</h4>
                          <div className="flex flex-col gap-1.5">
                            {matchingBills.slice(0, 4).map((b) => (
                              <Link
                                key={b.id}
                                to="/vendor-bills"
                                onClick={() => setSearchQuery("")}
                                className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors text-sm"
                              >
                                <span className="font-semibold text-on-surface">{b.billNumber} • {b.vendorName}</span>
                                <span className="text-secondary font-bold">₹{Number(b.totalAmount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {matchingAccounts.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold uppercase text-on-surface-variant tracking-wider mb-2">Accounts</h4>
                          <div className="flex flex-col gap-1.5">
                            {matchingAccounts.slice(0, 4).map((a) => (
                              <Link
                                key={a.id}
                                to="/chart-of-accounts"
                                onClick={() => setSearchQuery("")}
                                className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors text-sm"
                              >
                                <span className="font-semibold text-on-surface">{a.code} - {a.accountName}</span>
                                <span className="text-on-surface-variant text-xs">{a.accountType}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </section>

          {/*  Two Column Layout  */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            {/*  LEFT MAIN COLUMN: ~70% (col-span-8 or 8.5)  */}
            <main className="lg:col-span-8 flex flex-col gap-space-xl w-full">
              {viewMode === "list" ? (
                <>
                  {/*  Operational Summary Cards (3-up Bento Grid)  */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-space-base">
                    {/*  CARD 1: Sales Summary  */}
                    <div className="bg-surface-container-lowest rounded-xl p-space-base flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                      <div>
                        <div className="flex items-center justify-between pb-space-sm">
                          <div className="flex items-center gap-space-xs">
                            <div className="w-7 h-7 rounded-lg bg-secondary-container/50 text-secondary flex items-center justify-center">
                              <Receipt className="text-[16px]" />
                            </div>
                            <span className="font-headline-sm text-headline-sm text-on-surface">
                              Sales
                            </span>
                          </div>
                          <button
                            className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary transition-colors cursor-pointer"
                            type="button"
                            onClick={() => navigate('/sales-orders/new')}
                          >
                            <Plus className="text-[14px]" />
                            <span>New</span>
                          </button>
                        </div>
                        <div className="mt-space-2xs">
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                            Pipeline Volume
                          </span>
                          <div className="font-numeric-lg text-numeric-lg text-on-surface font-bold mt-space-2xs">
                            ₹{salesTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>
                        {/*  Segmented Status Badges  */}
                        <div className="flex items-center gap-space-2xs mt-space-md pb-space-sm overflow-x-auto">
                          <button
                            className="px-space-sm py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold"
                            type="button"
                          >
                            All ({salesOrders.length})
                          </button>
                          <button
                            className="px-space-sm py-space-2xs rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-label-sm text-label-sm font-medium transition-colors"
                            type="button"
                          >
                            Confirmed ({salesConfirmedCount})
                          </button>
                          <button
                            className="px-space-sm py-space-2xs rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-label-sm text-label-sm font-medium transition-colors"
                            type="button"
                          >
                            Draft ({salesDraftCount})
                          </button>
                        </div>
                      </div>
                      {/*  Micro Record Rows  */}
                      <div className="flex flex-col gap-space-xs mt-space-sm pt-space-sm">
                        {loading ? (
                          <div className="text-center text-on-surface-variant text-sm">Loading...</div>
                        ) : filteredSalesOrders.slice(0, 3).map(order => (
                          <div key={order.id} className="flex items-center justify-between p-space-xs rounded-lg bg-surface-container-low/50 hover:bg-surface-container-low transition-colors text-left">
                            <div className="flex flex-col min-w-0">
                              <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                                {order.orderNumber} • {order.customerName}
                              </span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">
                                ₹{Number(order.totalAmount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </span>
                            </div>
                            <span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-medium">
                              {order.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/*  CARD 2: Purchase Summary  */}
                    <div className="bg-surface-container-lowest rounded-xl p-space-base flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                      <div>
                        <div className="flex items-center justify-between pb-space-sm">
                          <div className="flex items-center gap-space-xs">
                            <div className="w-7 h-7 rounded-lg bg-surface-container-high text-primary flex items-center justify-center">
                              <Truck className="text-[16px]" />
                            </div>
                            <span className="font-headline-sm text-headline-sm text-on-surface">
                              Purchase
                            </span>
                          </div>
                          <button
                            className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary transition-colors cursor-pointer"
                            type="button"
                            onClick={() => navigate('/purchase-orders/new')}
                          >
                            <Plus className="text-[14px]" />
                            <span>New</span>
                          </button>
                        </div>
                        <div className="mt-space-2xs">
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                            Payable Committed
                          </span>
                          <div className="font-numeric-lg text-numeric-lg text-on-surface font-bold mt-space-2xs">
                            ₹{purchaseTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>
                        {/*  Segmented Status Badges  */}
                        <div className="flex items-center gap-space-2xs mt-space-md pb-space-sm overflow-x-auto">
                          <button
                            className="px-space-sm py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold"
                            type="button"
                          >
                            All ({purchaseOrders.length})
                          </button>
                          <button
                            className="px-space-sm py-space-2xs rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-label-sm text-label-sm font-medium transition-colors"
                            type="button"
                          >
                            Confirmed ({purchaseConfirmedCount})
                          </button>
                          <button
                            className="px-space-sm py-space-2xs rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-label-sm text-label-sm font-medium transition-colors"
                            type="button"
                          >
                            Draft ({purchaseDraftCount})
                          </button>
                        </div>
                      </div>
                      {/*  Micro Record Rows  */}
                      <div className="flex flex-col gap-space-xs mt-space-sm pt-space-sm">
                        {loading ? (
                          <div className="text-center text-on-surface-variant text-sm">Loading...</div>
                        ) : filteredPurchaseOrders.slice(0, 3).map(order => (
                          <div key={order.id} className="flex items-center justify-between p-space-xs rounded-lg bg-surface-container-low/50 hover:bg-surface-container-low transition-colors text-left">
                            <div className="flex flex-col min-w-0">
                              <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                                {order.orderNumber} • {order.vendorName}
                              </span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">
                                ₹{Number(order.totalAmount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </span>
                            </div>
                            <span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-medium">
                              {order.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/*  CARD 3: Receivables & Payables  */}
                    <div className="bg-surface-container-lowest rounded-xl p-space-base flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                      <div>
                        <div className="flex items-center justify-between pb-space-sm">
                          <div className="flex items-center gap-space-xs">
                            <div className="w-7 h-7 rounded-lg bg-tertiary-fixed/60 text-tertiary flex items-center justify-center">
                              <Wallet className="text-[16px]" />
                            </div>
                            <span className="font-headline-sm text-headline-sm text-on-surface">
                              AR &amp; AP
                            </span>
                          </div>
                          <Link
                            to="/budget-report"
                            className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-surface-container-low text-secondary font-label-sm text-label-sm font-semibold hover:bg-secondary-container transition-colors"
                          >
                            <span>Budgets</span>
                            <ChevronRight className="text-[14px]" />
                          </Link>
                        </div>
                        <div className="mt-space-2xs">
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                            Net Position (AR - AP)
                          </span>
                          <div className="flex items-baseline gap-space-xs mt-space-2xs">
                            <span className={`font-numeric-lg text-numeric-lg font-bold ${(totalAR - totalAP) < 0 ? 'text-error' : 'text-primary'}`}>
                              ₹{Math.abs(totalAR - totalAP).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              {(totalAR - totalAP) < 0 ? ' (Net Payable)' : ''}
                            </span>
                          </div>
                        </div>
                        {/*  Segmented Status Badges  */}
                        <div className="flex items-center gap-space-2xs mt-space-md pb-space-sm overflow-x-auto">
                          <button
                            className="px-space-sm py-space-2xs rounded-full bg-secondary-container/80 text-on-secondary-container font-label-sm text-label-sm font-semibold"
                            type="button"
                          >
                            Overview
                          </button>
                        </div>
                      </div>
                      {/*  Micro Metric Progress Bars  */}
                      <div className="flex flex-col gap-space-sm mt-space-sm pt-space-sm">
                        <div className="flex flex-col gap-space-2xs">
                          <div className="flex justify-between font-label-sm text-label-sm">
                            <span className="text-on-surface font-medium truncate max-w-[150px]">
                              Accounts Receivable
                            </span>
                            <span className="font-semibold text-primary">
                              ₹{totalAR.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${totalAR > 0 ? 100 : 0}%` }}></div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-space-2xs mt-space-xs">
                          <div className="flex justify-between font-label-sm text-label-sm">
                            <span className="text-on-surface font-medium truncate max-w-[150px]">
                              Accounts Payable
                            </span>
                            <span className="font-semibold text-secondary">
                              ₹{totalAP.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-secondary" style={{ width: `${totalAP > 0 ? 100 : 0}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  Financial Health & Treasury Strip  */}
                  <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-space-xs">
                        <Landmark className="text-primary text-[20px]" />
                        <span className="font-headline-sm text-headline-sm text-on-surface">
                          Treasury &amp; Audit Control
                        </span>
                      </div>
                      <span className="px-space-sm py-space-2xs rounded-full bg-surface-container-low text-secondary font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                        Real-time Metrics
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-space-base pt-space-xs">
                      <div className="p-space-base rounded-lg bg-surface-container-low flex flex-col gap-space-2xs">
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                          Bank Balance
                        </span>
                        <span className="font-numeric-lg text-numeric-lg text-on-surface font-bold">
                          ₹{Number(bankAccount.balance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="p-space-base rounded-lg bg-surface-container-low flex flex-col gap-space-2xs">
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                          Cash Float
                        </span>
                        <span className="font-numeric-lg text-numeric-lg text-on-surface font-bold">
                          ₹{Number(cashAccount.balance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="p-space-base rounded-lg bg-surface-container-low flex flex-col gap-space-2xs">
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                          Draft Entries
                        </span>
                        <span className="font-numeric-lg text-numeric-lg text-on-surface font-bold">
                          {pendingEntries} Pending
                        </span>
                      </div>
                      <div className="p-space-base rounded-lg bg-surface-container-low flex flex-col gap-space-2xs">
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                          Ledger Balance Health
                        </span>
                        <span className={`font-numeric-lg text-numeric-lg font-bold ${isLedgerBalanced ? 'text-primary' : 'text-error'}`}>
                          {isLedgerBalanced ? 'Balanced' : 'Imbalanced'}
                        </span>
                        <span className={`font-body-sm text-body-sm font-medium inline-flex items-center gap-space-2xs ${isLedgerBalanced ? 'text-secondary' : 'text-error'}`}>
                          {isLedgerBalanced ? <CheckCircle className="text-[14px]" /> : <AlertTriangle className="text-[14px]" />}
                          <span>{isLedgerBalanced ? 'Debits = Credits' : `Variance: ₹${ledgerVariance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`}</span>
                        </span>
                      </div>
                    </div>
                  </section>
                </>
              ) : (
                /* KANBAN DASHBOARD VIEW */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-base w-full">
                  {/* Kanban Column 1: Sales Pipelines */}
                  <div className="bg-surface-container-lowest rounded-xl p-space-base shadow-sm flex flex-col gap-space-sm">
                    <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-low">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        Sales Orders
                      </span>
                      <span className="px-space-xs py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold">
                        {filteredSalesOrders.length} Cards
                      </span>
                    </div>
                    <div className="flex flex-col gap-space-sm">
                      {loading ? (
                        <div className="text-center text-sm py-4">Loading...</div>
                      ) : filteredSalesOrders.slice(0, 5).map(order => (
                        <div key={order.id} className="p-space-sm rounded-lg bg-surface-container-low border border-surface-container hover:shadow-md transition-all">
                          <div className="flex items-center justify-between">
                            <span className="font-label-md text-label-md font-bold text-on-surface">{order.orderNumber}</span>
                            <span className="px-space-xs py-0.5 rounded-full bg-yellow-100 text-yellow-800 font-label-sm text-label-sm">{order.status}</span>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{order.customerName}</p>
                          <div className="mt-space-xs font-numeric-md font-bold text-primary">₹{Number(order.totalAmount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Kanban Column 2: Purchase Orders */}
                  <div className="bg-surface-container-lowest rounded-xl p-space-base shadow-sm flex flex-col gap-space-sm">
                    <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-low">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        Purchase Orders
                      </span>
                      <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                        {filteredPurchaseOrders.length} Cards
                      </span>
                    </div>
                    <div className="flex flex-col gap-space-sm">
                      {loading ? (
                        <div className="text-center text-sm py-4">Loading...</div>
                      ) : filteredPurchaseOrders.slice(0, 5).map(order => (
                        <div key={order.id} className="p-space-sm rounded-lg bg-surface-container-low border border-surface-container hover:shadow-md transition-all">
                          <div className="flex items-center justify-between">
                            <span className="font-label-md text-label-md font-bold text-on-surface">{order.orderNumber}</span>
                            <span className="px-space-xs py-0.5 rounded-full bg-blue-100 text-blue-800 font-label-sm text-label-sm">{order.status}</span>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{order.vendorName}</p>
                          <div className="mt-space-xs font-numeric-md font-bold text-secondary">₹{Number(order.totalAmount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Kanban Column 3: Accounts Overview */}
                  <div className="bg-surface-container-lowest rounded-xl p-space-base shadow-sm flex flex-col gap-space-sm">
                    <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-low">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        Treasury Feeds
                      </span>
                      <span className="px-space-xs py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
                        2 Cards
                      </span>
                    </div>
                    <div className="flex flex-col gap-space-sm">
                      <div className="p-space-sm rounded-lg bg-surface-container-low border border-surface-container hover:shadow-md transition-all">
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md font-bold text-on-surface">{bankAccount.accountName}</span>
                          <span className="px-space-xs py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-label-sm">Synced</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Primary Operating Account</p>
                        <div className="mt-space-xs font-numeric-md font-bold text-on-surface">₹{Number(bankAccount.balance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</div>
                      </div>
                      <div className="p-space-sm rounded-lg bg-surface-container-low border border-surface-container hover:shadow-md transition-all">
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md font-bold text-on-surface">{cashAccount.accountName}</span>
                          <span className="px-space-xs py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-label-sm">Active</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Petty Cash / Vault</p>
                        <div className="mt-space-xs font-numeric-md font-bold text-on-surface">₹{Number(cashAccount.balance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </main>

            {/*  RIGHT COLUMN: ~30% (col-span-4) Quick Module Navigation Directory  */}
            <aside className="lg:col-span-4 w-full">
              <div className="bg-surface-container-lowest rounded-xl p-space-base shadow-sm sticky top-20 flex flex-col gap-space-md">
                {/*  Directory Header  */}
                <div className="flex items-center justify-between pb-space-2xs">
                  <div className="flex items-center gap-space-xs">
                    <LayoutGrid className="text-[18px] text-primary" />
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      System Directory
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    16 Modules
                  </span>
                </div>
                {/*  Quick filter in menu  */}
                <div className="relative w-full">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-space-sm pointer-events-none text-on-surface-variant">
                    <Filter className="text-[16px]" />
                  </span>
                  <input
                    className="w-full h-9 pl-8 pr-space-sm rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container transition-colors"
                    id="directory-filter"
                    placeholder="Filter modules..."
                    type="text"
                    value={directoryFilter}
                    onChange={(e) => {
                      const val = e.target.value;
                      setDirectoryFilter(val);
                      if (val) {
                        setOpenSections({ sales: true, purchase: true, account: true, report: true });
                      }
                    }}
                  />
                </div>
                {/*  Navigation Group Container  */}
                <div className="flex flex-col gap-space-md" id="directory-list">
                  {/*  Group 1: Sales  */}
                  <div className="flex flex-col gap-space-xs border border-surface-container/60 rounded-xl p-space-xs">
                    <button
                      className="w-full flex items-center justify-between px-space-xs py-space-2xs text-left cursor-pointer hover:bg-surface-container-low rounded-lg transition-colors"
                      type="button"
                      onClick={() => toggleSection("sales")}
                    >
                      <span className="flex items-center gap-space-xs font-label-md text-label-md uppercase tracking-wider font-bold text-on-surface-variant">
                        <ShoppingBag className="text-[16px] text-primary" />
                        <span>Sales</span>
                      </span>
                      <div className="flex items-center gap-space-xs">
                        <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-secondary-container/60 text-on-secondary-container font-semibold">
                          3 items
                        </span>
                        <ChevronDown
                          className={`text-[16px] text-on-surface-variant transition-transform duration-200 ${openSections.sales ? "rotate-180" : ""
                            }`}
                        />
                      </div>
                    </button>
                    {openSections.sales && (
                      <nav className="flex flex-col gap-space-2xs pt-space-xs border-t border-surface-container/40">
                        <Link
                          className="group flex items-center justify-between px-space-sm py-space-xs rounded-lg hover:bg-secondary-container/40 text-on-surface transition-colors"
                          to="/sales-orders"
                        >
                          <div className="flex items-center gap-space-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="font-body-md text-body-md group-hover:font-semibold transition-all">Sales Order</span>
                          </div>
                          <ChevronRight className="text-[16px] text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </Link>
                        <Link
                          className="group flex items-center justify-between px-space-sm py-space-xs rounded-lg hover:bg-secondary-container/40 text-on-surface transition-colors"
                          to="/customer-invoices"
                        >
                          <div className="flex items-center gap-space-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="font-body-md text-body-md group-hover:font-semibold transition-all">Sale Invoice</span>
                          </div>
                          <ChevronRight className="text-[16px] text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </Link>
                        <Link
                          className="group flex items-center justify-between px-space-sm py-space-xs rounded-lg hover:bg-secondary-container/40 text-on-surface transition-colors"
                          to="/receipts"
                        >
                          <div className="flex items-center gap-space-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="font-body-md text-body-md group-hover:font-semibold transition-all">Receipt</span>
                          </div>
                          <ChevronRight className="text-[16px] text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      </nav>
                    )}
                  </div>

                  {/*  Group 2: Purchase  */}
                  <div className="flex flex-col gap-space-xs border border-surface-container/60 rounded-xl p-space-xs">
                    <button
                      className="w-full flex items-center justify-between px-space-xs py-space-2xs text-left cursor-pointer hover:bg-surface-container-low rounded-lg transition-colors"
                      type="button"
                      onClick={() => toggleSection("purchase")}
                    >
                      <span className="flex items-center gap-space-xs font-label-md text-label-md uppercase tracking-wider font-bold text-on-surface-variant">
                        <Truck className="text-[16px] text-primary" />
                        <span>Purchase</span>
                      </span>
                      <div className="flex items-center gap-space-xs">
                        <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">
                          3 items
                        </span>
                        <ChevronDown
                          className={`text-[16px] text-on-surface-variant transition-transform duration-200 ${openSections.purchase ? "rotate-180" : ""
                            }`}
                        />
                      </div>
                    </button>
                    {openSections.purchase && (
                      <nav className="flex flex-col gap-space-2xs pt-space-xs border-t border-surface-container/40">
                        <Link
                          className="group flex items-center justify-between px-space-sm py-space-xs rounded-lg hover:bg-secondary-container/40 text-on-surface transition-colors"
                          to="/purchase-orders"
                        >
                          <div className="flex items-center gap-space-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="font-body-md text-body-md group-hover:font-semibold transition-all">Purchase Order</span>
                          </div>
                          <ChevronRight className="text-[16px] text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </Link>
                        <Link
                          className="group flex items-center justify-between px-space-sm py-space-xs rounded-lg hover:bg-secondary-container/40 text-on-surface transition-colors"
                          to="/vendor-bills"
                        >
                          <div className="flex items-center gap-space-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="font-body-md text-body-md group-hover:font-semibold transition-all">Purchase Bill</span>
                          </div>
                          <ChevronRight className="text-[16px] text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </Link>
                        <Link
                          className="group flex items-center justify-between px-space-sm py-space-xs rounded-lg hover:bg-secondary-container/40 text-on-surface transition-colors"
                          to="/payments"
                        >
                          <div className="flex items-center gap-space-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="font-body-md text-body-md group-hover:font-semibold transition-all">Payment</span>
                          </div>
                          <ChevronRight className="text-[16px] text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      </nav>
                    )}
                  </div>

                  {/*  Group 3: Account  */}
                  <div className="flex flex-col gap-space-xs border border-surface-container/60 rounded-xl p-space-xs">
                    <button
                      className="w-full flex items-center justify-between px-space-xs py-space-2xs text-left cursor-pointer hover:bg-surface-container-low rounded-lg transition-colors"
                      type="button"
                      onClick={() => toggleSection("account")}
                    >
                      <span className="flex items-center gap-space-xs font-label-md text-label-md uppercase tracking-wider font-bold text-on-surface-variant">
                        <Wallet className="text-[16px] text-primary" />
                        <span>Account</span>
                      </span>
                      <div className="flex items-center gap-space-xs">
                        <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">
                          7 items
                        </span>
                        <ChevronDown
                          className={`text-[16px] text-on-surface-variant transition-transform duration-200 ${openSections.account ? "rotate-180" : ""
                            }`}
                        />
                      </div>
                    </button>
                    {openSections.account && (
                      <nav className="flex flex-col gap-space-2xs pt-space-xs border-t border-surface-container/40">
                        <Link
                          className="group flex items-center justify-between px-space-sm py-space-xs rounded-lg hover:bg-secondary-container/40 text-on-surface transition-colors"
                          to="/contacts/list"
                        >
                          <div className="flex items-center gap-space-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="font-body-md text-body-md group-hover:font-semibold transition-all">
                              Contact
                            </span>
                          </div>
                          <ChevronRight className="text-[16px] text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </Link>
                        <Link
                          className="group flex items-center justify-between px-space-sm py-space-xs rounded-lg hover:bg-secondary-container/40 text-on-surface transition-colors"
                          to="/products/list"
                        >
                          <div className="flex items-center gap-space-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="font-body-md text-body-md group-hover:font-semibold transition-all">
                              Product Catalog
                            </span>
                          </div>
                          <ChevronRight className="text-[16px] text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </Link>
                        <Link
                          className="group flex items-center justify-between px-space-sm py-space-xs rounded-lg hover:bg-secondary-container/40 text-on-surface transition-colors"
                          to="#"
                        >
                          <div className="flex items-center gap-space-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="font-body-md text-body-md group-hover:font-semibold transition-all">
                              Analyticals
                            </span>
                          </div>
                          <ChevronRight className="text-[16px] text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </Link>
                        <Link
                          className="group flex items-center justify-between px-space-sm py-space-xs rounded-lg hover:bg-secondary-container/40 text-on-surface transition-colors"
                          to="/analytical-budget/new"
                        >
                          <div className="flex items-center gap-space-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="font-body-md text-body-md group-hover:font-semibold transition-all">
                              Analytical Budget
                            </span>
                          </div>
                          <ChevronRight className="text-[16px] text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </Link>
                        <Link
                          className="group flex items-center justify-between px-space-sm py-space-xs rounded-lg hover:bg-secondary-container/40 text-on-surface transition-colors"
                          to="/chart-of-accounts"
                        >
                          <div className="flex items-center gap-space-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="font-body-md text-body-md group-hover:font-semibold transition-all">
                              Chart of Account
                            </span>
                          </div>
                          <ChevronRight className="text-[16px] text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </Link>
                        <Link
                          className="group flex items-center justify-between px-space-sm py-space-xs rounded-lg hover:bg-secondary-container/40 text-on-surface transition-colors"
                          to="/journals"
                        >
                          <div className="flex items-center gap-space-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="font-body-md text-body-md group-hover:font-semibold transition-all">
                              Journals
                            </span>
                          </div>
                          <ChevronRight className="text-[16px] text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </Link>
                        <Link
                          className="group flex items-center justify-between px-space-sm py-space-xs rounded-lg hover:bg-secondary-container/40 text-on-surface transition-colors"
                          to="/journal-entries"
                        >
                          <div className="flex items-center gap-space-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="font-body-md text-body-md group-hover:font-semibold transition-all">
                              Journal Entries
                            </span>
                          </div>
                          <ChevronRight className="text-[16px] text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      </nav>
                    )}
                  </div>

                  {/*  Group 4: Report  */}
                  <div className="flex flex-col gap-space-xs border border-surface-container/60 rounded-xl p-space-xs">
                    <button
                      className="w-full flex items-center justify-between px-space-xs py-space-2xs text-left cursor-pointer hover:bg-surface-container-low rounded-lg transition-colors"
                      type="button"
                      onClick={() => toggleSection("report")}
                    >
                      <span className="flex items-center gap-space-xs font-label-md text-label-md uppercase tracking-wider font-bold text-on-surface-variant">
                        <BarChart3 className="text-[16px] text-primary" />
                        <span>Report</span>
                      </span>
                      <div className="flex items-center gap-space-xs">
                        <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-secondary-container/60 text-on-secondary-container font-semibold">
                          3 items
                        </span>
                        <ChevronDown
                          className={`text-[16px] text-on-surface-variant transition-transform duration-200 ${openSections.report ? "rotate-180" : ""
                            }`}
                        />
                      </div>
                    </button>
                    {openSections.report && (
                      <nav className="flex flex-col gap-space-2xs pt-space-xs border-t border-surface-container/40">
                        <Link
                          className="group flex items-center justify-between px-space-sm py-space-xs rounded-lg hover:bg-secondary-container/40 text-on-surface transition-colors"
                          to="/balance-sheet"
                        >
                          <div className="flex items-center gap-space-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="font-body-md text-body-md group-hover:font-semibold transition-all">Balance Sheet</span>
                          </div>
                          <ChevronRight className="text-[16px] text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </Link>
                        <Link
                          className="group flex items-center justify-between px-space-sm py-space-xs rounded-lg hover:bg-secondary-container/40 text-on-surface transition-colors"
                          to="/profit-and-loss"
                        >
                          <div className="flex items-center gap-space-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="font-body-md text-body-md group-hover:font-semibold transition-all">Profit and Loss</span>
                          </div>
                          <ChevronRight className="text-[16px] text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </Link>
                        <Link
                          className="group flex items-center justify-between px-space-sm py-space-xs rounded-lg hover:bg-secondary-container/40 text-on-surface transition-colors"
                          to="/budget-report"
                        >
                          <div className="flex items-center gap-space-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="font-body-md text-body-md group-hover:font-semibold transition-all">Budget Report</span>
                          </div>
                          <ChevronRight className="text-[16px] text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      </nav>
                    )}
                  </div>
                </div>
                {/*  Directory Footer Support  */}
                <div className="pt-space-sm border-t-0 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span className="inline-flex items-center gap-space-2xs">
                    <Shield className="text-[14px]" />
                    <span>PCI-DSS Tier 1 Certified</span>
                  </span>
                  <Link className="text-primary hover:underline" to="#">
                    Shortcuts (?)
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <footer className="w-full bg-surface-container-low/60 py-space-lg mt-space-3xl">
        <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop flex flex-col sm:flex-row items-center justify-between gap-space-base text-on-surface-variant font-body-sm text-body-sm">
          <span>
            © 2026 UrbanMart Enterprise Operations. All rights reserved.
          </span>
          <div className="flex items-center gap-space-lg">
            <span className="font-label-sm text-label-sm text-secondary font-semibold">
              Encrypted Ledger Active
            </span>
            <span className="font-body-sm text-body-sm">v2.4.0-prod</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
