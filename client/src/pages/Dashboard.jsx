import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { BarChart3, CheckCircle, ChevronDown, ChevronRight, Clock, Filter, Kanban, Landmark, LayoutGrid, List, Lock, PieChart, Plus, Receipt, RefreshCw, Search, Shield, ShoppingBag, Truck, User, Wallet } from "lucide-react";


export default function Dashboard() {
  const navigate = useNavigate();
  // TODO: Add role context here later. For now, mocking as Admin.
  const userRole = "Admin";

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
            <nav
              className="hidden md:flex items-center gap-space-lg h-16"
              data-active-classes="text-on-surface font-semibold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-container"
            >
              <Link
                aria-current="page"
                className="h-16 inline-flex items-center transition-colors text-on-surface font-semibold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-container"
                data-path="sales"
                to="#"
              >
                Sales
              </Link>
              <Link
                className="h-16 inline-flex items-center font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
                data-path="purchase"
                to="#"
              >
                Purchase
              </Link>
              <Link
                className="h-16 inline-flex items-center font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
                data-path="account"
                to="#"
              >
                Account
              </Link>
              <Link
                className="h-16 inline-flex items-center font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
                data-path="report"
                to="#"
              >
                Report
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-space-base">
            <div className="flex items-center gap-space-xs">
              <span className="hidden sm:inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                <Lock className="text-[14px]" />
                Admin
              </span>
              {userRole === "Admin" && (
                <button
                  className="inline-flex items-center gap-space-xs px-space-base py-space-sm rounded-full bg-primary-container text-on-primary font-body-md text-body-md font-semibold hover:bg-primary transition-colors"
                  type="button"
                  onClick={() => navigate("/create-user")}
                >
                  <Plus className="text-[18px]" />
                  <span>Create User</span>
                </button>
              )}
            </div>
            <div className="h-8 w-[1px] bg-surface-container hidden sm:block"></div>
            <button
              className="flex items-center gap-space-sm p-space-xs rounded-full hover:bg-surface-container-low transition-colors text-left"
              type="button"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <User className="text-on-primary text-[18px]" />
              </div>
              <div className="hidden xl:flex flex-col">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Alex Morgan
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Admin
                </span>
              </div>
              <ChevronDown className="text-on-surface-variant text-[20px]" />
            </button>
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
                    Fiscal Year 2025 • Q2 Active
                  </span>
                </div>
                <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                  <RefreshCw className="text-[16px] text-primary" />
                  <span>
                    Ledger snapshot synchronized 2 minutes ago • Single-tenant
                    node us-east-4
                  </span>
                </div>
              </div>
              {/*  Quick Action Controls & View Mode  */}
              <div className="flex items-center gap-space-sm self-start lg:self-auto">
                <div
                  className="inline-flex p-space-2xs bg-surface-container rounded-full"
                  role="tablist"
                >
                  <button
                    className="px-space-md py-space-xs rounded-full font-label-md text-label-md font-semibold bg-surface-container-lowest text-on-surface shadow-sm transition-all inline-flex items-center gap-space-xs"
                    id="btn-list-view"
                    type="button"
                  >
                    <List className="text-[16px]" />
                    <span>List Grid</span>
                  </button>
                  <button
                    className="px-space-md py-space-xs rounded-full font-label-md text-label-md font-semibold text-on-surface-variant hover:text-on-surface transition-all inline-flex items-center gap-space-xs"
                    id="btn-kanban-view"
                    type="button"
                  >
                    <Kanban className="text-[16px]" />
                    <span>Kanban</span>
                  </button>
                </div>
                <button
                  className="h-10 w-10 rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-on-surface flex items-center justify-center shadow-sm transition-colors"
                  title="Refresh Telemetry"
                  type="button"
                >
                  <RefreshCw className="text-[18px]" />
                </button>
              </div>
            </div>
            {/*  Search / Filter Unified Input  */}
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-space-base pointer-events-none text-on-surface-variant">
                <Search className="text-[20px]" />
              </span>
              <input
                className="w-full h-12 pl-12 pr-32 rounded-full bg-surface-container-lowest font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container/30 transition-all"
                placeholder="Search orders, invoices, accounts, or journal ledger entries (Type '/' to focus)..."
                type="text"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-space-base gap-space-xs">
                <kbd className="hidden sm:inline-block px-space-xs py-space-2xs text-[10px] font-label-sm font-semibold text-on-surface-variant bg-surface-container rounded-lg">
                  ⌘K
                </kbd>
                <span className="h-4 w-[1px] bg-surface-container"></span>
                <button
                  className="font-label-sm text-label-sm font-semibold text-primary hover:text-on-primary-container transition-colors"
                  type="button"
                >
                  Filters
                </button>
              </div>
            </div>
          </section>
          {/*  Two Column Layout  */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            {/*  LEFT MAIN COLUMN: ~70% (col-span-8 or 8.5)  */}
            <main className="lg:col-span-8 flex flex-col gap-space-xl w-full">
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
                        className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary transition-colors"
                        type="button"
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
                        $42,850.00
                      </div>
                    </div>
                    {/*  Segmented Status Badges  */}
                    <div className="flex items-center gap-space-2xs mt-space-md pb-space-sm overflow-x-auto">
                      <button
                        className="px-space-sm py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold"
                        type="button"
                      >
                        All (3)
                      </button>
                      <button
                        className="px-space-sm py-space-2xs rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-label-sm text-label-sm font-medium transition-colors"
                        type="button"
                      >
                        Confirmed (0)
                      </button>
                      <button
                        className="px-space-sm py-space-2xs rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-label-sm text-label-sm font-medium transition-colors"
                        type="button"
                      >
                        Draft (3)
                      </button>
                    </div>
                  </div>
                  {/*  Micro Record Rows  */}
                  <div className="flex flex-col gap-space-xs mt-space-sm pt-space-sm">
                    <div className="flex items-center justify-between p-space-xs rounded-lg bg-surface-container-low/50 hover:bg-surface-container-low transition-colors text-left">
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                          SO-1004 • Acme Retail
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          $14,200.00
                        </span>
                      </div>
                      <span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-medium">
                        Draft
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-space-xs rounded-lg bg-surface-container-low/50 hover:bg-surface-container-low transition-colors text-left">
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                          SO-1003 • Horizon Goods
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          $18,450.00
                        </span>
                      </div>
                      <span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-medium">
                        Draft
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-space-xs rounded-lg bg-surface-container-low/50 hover:bg-surface-container-low transition-colors text-left">
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                          SO-1002 • Pacific Mart Ltd
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          $10,200.00
                        </span>
                      </div>
                      <span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-medium">
                        Draft
                      </span>
                    </div>
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
                        className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary transition-colors"
                        type="button"
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
                        $28,400.00
                      </div>
                    </div>
                    {/*  Segmented Status Badges  */}
                    <div className="flex items-center gap-space-2xs mt-space-md pb-space-sm overflow-x-auto">
                      <button
                        className="px-space-sm py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold"
                        type="button"
                      >
                        All (3)
                      </button>
                      <button
                        className="px-space-sm py-space-2xs rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-label-sm text-label-sm font-medium transition-colors"
                        type="button"
                      >
                        Confirmed (0)
                      </button>
                      <button
                        className="px-space-sm py-space-2xs rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-label-sm text-label-sm font-medium transition-colors"
                        type="button"
                      >
                        Draft (2)
                      </button>
                    </div>
                  </div>
                  {/*  Micro Record Rows  */}
                  <div className="flex flex-col gap-space-xs mt-space-sm pt-space-sm">
                    <div className="flex items-center justify-between p-space-xs rounded-lg bg-surface-container-low/50 hover:bg-surface-container-low transition-colors text-left">
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                          PO-2009 • Global Logistics
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          $12,500.00
                        </span>
                      </div>
                      <span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-medium">
                        Draft
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-space-xs rounded-lg bg-surface-container-low/50 hover:bg-surface-container-low transition-colors text-left">
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                          PO-2008 • Apex Supply
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          $8,900.00
                        </span>
                      </div>
                      <span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-medium">
                        Draft
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-space-xs rounded-lg bg-surface-container-low/50 hover:bg-surface-container-low transition-colors text-left">
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                          PO-2007 • Delta Mfg
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          $7,000.00
                        </span>
                      </div>
                      <span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-medium">
                        Draft
                      </span>
                    </div>
                  </div>
                </div>
                {/*  CARD 3: Budget Reports  */}
                <div className="bg-surface-container-lowest rounded-xl p-space-base flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center justify-between pb-space-sm">
                      <div className="flex items-center gap-space-xs">
                        <div className="w-7 h-7 rounded-lg bg-tertiary-fixed/60 text-tertiary flex items-center justify-center">
                          <PieChart className="text-[16px]" />
                        </div>
                        <span className="font-headline-sm text-headline-sm text-on-surface">
                          Budget Reports
                        </span>
                      </div>
                      <button
                        className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-surface-container-low text-secondary font-label-sm text-label-sm font-semibold hover:bg-secondary-container transition-colors"
                        type="button"
                      >
                        <span>Report</span>
                        <ChevronRight className="text-[14px]" />
                      </button>
                    </div>
                    <div className="mt-space-2xs">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                        Fiscal Utilization
                      </span>
                      <div className="flex items-baseline gap-space-xs mt-space-2xs">
                        <span className="font-numeric-lg text-numeric-lg text-on-surface font-bold">
                          78.4%
                        </span>
                        <span className="font-body-sm text-body-sm text-secondary font-semibold">
                          +3.2% vs Q1
                        </span>
                      </div>
                    </div>
                    {/*  Segmented Status Badges  */}
                    <div className="flex items-center gap-space-2xs mt-space-md pb-space-sm overflow-x-auto">
                      <button
                        className="px-space-sm py-space-2xs rounded-full bg-secondary-container/80 text-on-secondary-container font-label-sm text-label-sm font-semibold"
                        type="button"
                      >
                        Achieved (3)
                      </button>
                      <button
                        className="px-space-sm py-space-2xs rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-label-sm text-label-sm font-medium transition-colors"
                        type="button"
                      >
                        Budget (2)
                      </button>
                      <button
                        className="px-space-sm py-space-2xs rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-label-sm text-label-sm font-medium transition-colors"
                        type="button"
                      >
                        Commit (4)
                      </button>
                    </div>
                  </div>
                  {/*  Micro Metric Progress Bars  */}
                  <div className="flex flex-col gap-space-sm mt-space-sm pt-space-sm">
                    <div className="flex flex-col gap-space-2xs">
                      <div className="flex justify-between font-label-sm text-label-sm">
                        <span className="text-on-surface font-medium">
                          Q2 Operations
                        </span>
                        <span className="text-on-surface-variant font-semibold">
                          84%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-container rounded-full"
                          style={{}}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-space-2xs">
                      <div className="flex justify-between font-label-sm text-label-sm">
                        <span className="text-on-surface font-medium">
                          Store Equipment
                        </span>
                        <span className="text-on-surface-variant font-semibold">
                          62%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-container rounded-full"
                          style={{}}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-space-2xs">
                      <div className="flex justify-between font-label-sm text-label-sm">
                        <span className="text-on-surface font-medium">
                          Tech Infrastructure
                        </span>
                        <span className="text-on-surface-variant font-semibold">
                          91%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div
                          className="h-full bg-error rounded-full"
                          style={{}}
                        ></div>
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
                      Treasury &amp; Ledger Integrity
                    </span>
                  </div>
                  <span className="px-space-sm py-space-2xs rounded-full bg-surface-container-low text-secondary font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                    All Feeds Verified
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-base pt-space-xs">
                  <div className="p-space-base rounded-lg bg-surface-container-low flex flex-col gap-space-2xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Available Cash Float
                    </span>
                    <span className="font-numeric-lg text-numeric-lg text-on-surface font-bold">
                      $184,920.45
                    </span>
                    <span className="font-body-sm text-body-sm text-secondary font-medium inline-flex items-center gap-space-2xs">
                      <CheckCircle className="text-[14px]" />
                      <span>Reconciled through 08:00 EST</span>
                    </span>
                  </div>
                  <div className="p-space-base rounded-lg bg-surface-container-low flex flex-col gap-space-2xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Pending Reconciliations
                    </span>
                    <span className="font-numeric-lg text-numeric-lg text-on-surface font-bold">
                      14 Entries
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant inline-flex items-center gap-space-2xs">
                      <Clock className="text-[14px]" />
                      <span>5 require management sign-off</span>
                    </span>
                  </div>
                  <div className="p-space-base rounded-lg bg-surface-container-low flex flex-col gap-space-2xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Ledger Cryptographic Status
                    </span>
                    <span className="font-numeric-lg text-numeric-lg text-primary font-bold">
                      Consensus 100%
                    </span>
                    <span className="font-body-sm text-body-sm text-secondary font-medium inline-flex items-center gap-space-2xs">
                      <Lock className="text-[14px]" />
                      <span>Immutable dual-entry log synced</span>
                    </span>
                  </div>
                </div>
              </section>
              {/*  Visual Analytics & Recent Transaction Activity  */}
              <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-headline-sm text-headline-sm text-on-surface">
                      Weekly Cashflow Ingress vs Egress
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Comparative rolling 7-day volume across primary
                      operational accounts
                    </p>
                  </div>
                  <div className="flex items-center gap-space-base text-body-sm font-body-sm">
                    <div className="flex items-center gap-space-xs">
                      <span className="w-3 h-3 rounded-full bg-primary-container"></span>
                      <span className="text-on-surface-variant">
                        Sales Inflow
                      </span>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <span className="w-3 h-3 rounded-full bg-outline-variant"></span>
                      <span className="text-on-surface-variant">
                        Procurement Outflow
                      </span>
                    </div>
                  </div>
                </div>
                {/*  Inline SVG Visualization Chart (Clean, Under 2KB)  */}
                <div className="w-full h-44 flex items-end pt-space-base">
                  <svg
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="none"
                    viewBox="0 0 700 140"
                  >
                    {/*  Grid lines  */}
                    <line
                      stroke="#E2E8F0"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                      x1="0"
                      x2="700"
                      y1="20"
                      y2="20"
                    ></line>
                    <line
                      stroke="#E2E8F0"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                      x1="0"
                      x2="700"
                      y1="60"
                      y2="60"
                    ></line>
                    <line
                      stroke="#E2E8F0"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                      x1="0"
                      x2="700"
                      y1="100"
                      y2="100"
                    ></line>
                    <line
                      stroke="#E2E8F0"
                      strokeWidth="1"
                      x1="0"
                      x2="700"
                      y1="140"
                      y2="140"
                    ></line>
                    {/*  Outflow Area / Line  */}
                    <path
                      d="M0,110 Q116,95 233,105 T466,70 T700,90 L700,140 L0,140 Z"
                      fill="rgba(187, 202, 198, 0.2)"
                    />
                    <path
                      d="M0,110 Q116,95 233,105 T466,70 T700,90"
                      fill="none"
                      stroke="#6C7A77"
                      strokeWidth="2.5"
                    />
                    {/*  Inflow Area / Line (Teal)  */}
                    <path
                      d="M0,90 Q116,40 233,65 T466,30 T700,45 L700,140 L0,140 Z"
                      fill="rgba(20, 184, 166, 0.12)"
                    />
                    <path
                      d="M0,90 Q116,40 233,65 T466,30 T700,45"
                      fill="none"
                      stroke="#14B8A6"
                      strokeWidth="2.5"
                    />
                    {/*  Data point callouts  */}
                    <circle
                      cx="233"
                      cy="65"
                      fill="#FFFFFF"
                      r="4.5"
                      stroke="#14B8A6"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="466"
                      cy="30"
                      fill="#FFFFFF"
                      r="4.5"
                      stroke="#14B8A6"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="700"
                      cy="45"
                      fill="#FFFFFF"
                      r="4.5"
                      stroke="#14B8A6"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
                <div className="grid grid-cols-7 text-center font-label-sm text-label-sm text-on-surface-variant pt-space-xs border-none">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span className="font-semibold text-primary">Today</span>
                </div>
              </section>
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
                  />
                </div>
                {/*  Navigation Group Container  */}
                <div className="flex flex-col gap-space-md" id="directory-list">
                  {/*  Group 1: Sales  */}
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between px-space-xs py-space-2xs">
                      <span className="flex items-center gap-space-xs font-label-md text-label-md uppercase tracking-wider font-bold text-on-surface-variant">
                        <ShoppingBag className="text-[16px] text-primary" />
                        <span>Sales</span>
                      </span>
                      <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-secondary-container/60 text-on-secondary-container font-semibold">
                        3 items
                      </span>
                    </div>
                    <nav className="flex flex-col gap-space-2xs">
                      <Link
                        className="group flex items-center justify-between px-space-sm py-space-xs rounded-lg hover:bg-secondary-container/40 text-on-surface transition-colors"
                        to="#"
                      >
                        <div className="flex items-center gap-space-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          <span className="font-body-md text-body-md group-hover:font-semibold transition-all">
                            Sales Order
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
                            Sale Invoice
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
                            Receipt
                          </span>
                        </div>
                        <ChevronRight className="text-[16px] text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    </nav>
                  </div>
                  {/*  Group 2: Purchase  */}
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between px-space-xs py-space-2xs">
                      <span className="flex items-center gap-space-xs font-label-md text-label-md uppercase tracking-wider font-bold text-on-surface-variant">
                        <Truck className="text-[16px] text-primary" />
                        <span>Purchase</span>
                      </span>
                      <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">
                        3 items
                      </span>
                    </div>
                    <nav className="flex flex-col gap-space-2xs">
                      <Link
                        className="group flex items-center justify-between px-space-sm py-space-xs rounded-lg hover:bg-secondary-container/40 text-on-surface transition-colors"
                        to="#"
                      >
                        <div className="flex items-center gap-space-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          <span className="font-body-md text-body-md group-hover:font-semibold transition-all">
                            Purchase Order
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
                            Purchase Bill
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
                            Payment
                          </span>
                        </div>
                        <ChevronRight className="text-[16px] text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    </nav>
                  </div>
                  {/*  Group 3: Account  */}
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between px-space-xs py-space-2xs">
                      <span className="flex items-center gap-space-xs font-label-md text-label-md uppercase tracking-wider font-bold text-on-surface-variant">
                        <Wallet className="text-[16px] text-primary" />
                        <span>Account</span>
                      </span>
                      <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">
                        7 items
                      </span>
                    </div>
                    <nav className="flex flex-col gap-space-2xs">
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
                        to="#"
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
                  </div>
                  {/*  Group 4: Report  */}
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between px-space-xs py-space-2xs">
                      <span className="flex items-center gap-space-xs font-label-md text-label-md uppercase tracking-wider font-bold text-on-surface-variant">
                        <BarChart3 className="text-[16px] text-primary" />
                        <span>Report</span>
                      </span>
                      <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-secondary-container/60 text-on-secondary-container font-semibold">
                        3 items
                      </span>
                    </div>
                    <nav className="flex flex-col gap-space-2xs">
                      <Link
                        className="group flex items-center justify-between px-space-sm py-space-xs rounded-lg hover:bg-secondary-container/40 text-on-surface transition-colors"
                        to="#"
                      >
                        <div className="flex items-center gap-space-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          <span className="font-body-md text-body-md group-hover:font-semibold transition-all">
                            Balance Sheet
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
                            Profit and Loss
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
                            Budget Report
                          </span>
                        </div>
                        <ChevronRight className="text-[16px] text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    </nav>
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
            © 2025 UrbanMart Enterprise Operations. All rights reserved.
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
