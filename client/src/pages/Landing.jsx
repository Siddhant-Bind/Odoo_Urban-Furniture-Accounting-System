import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Landmark, PlayCircle, Receipt, RefreshCw, Rocket, Send, Shield, Star, TrendingUp, Wallet } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <main className="flex-1 flex flex-col relative w-full bg-surface px-gutter-mobile font-body-md text-body-md text-on-surface min-h-screen antialiased">
      {/*  Desktop Global Header Navigation  */}
      <header className="w-full bg-surface/90 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/*  Logo & Left Nav Group  */}
          <div className="flex items-center gap-10">
            <div className="w-36 h-10 rounded-xl bg-surface-container-low border border-outline-variant/50 flex items-center justify-center shadow-xs">
              <span className="font-label-sm text-label-sm text-primary font-bold tracking-wider uppercase">
                URBANMART
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-on-surface-variant font-medium text-sm">
              <Link
                className="hover:text-primary transition-colors"
                to="#features"
              >
                Features
              </Link>
              <Link
                className="hover:text-primary transition-colors"
                to="#solutions"
              >
                Solutions
              </Link>
              <Link
                className="hover:text-primary transition-colors"
                to="#metrics"
              >
                Metrics
              </Link>
              <Link
                className="hover:text-primary transition-colors"
                to="#pricing"
              >
                Pricing
              </Link>
              <Link className="hover:text-primary transition-colors" to="#docs">
                Documentation
              </Link>
            </nav>
          </div>
          {/*  Header Actions  */}
          <div className="flex items-center gap-4">
            <button
              className="px-5 py-2.5 rounded-full border border-primary/40 text-primary font-semibold text-sm hover:bg-secondary-container/30 active:scale-[0.98] transition-all"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-2.5 rounded-full bg-primary-container text-on-primary font-semibold text-sm shadow-md shadow-primary-container/25 hover:bg-primary active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="text-base" />
            </button>
          </div>
        </div>
      </header>
      {/*  Desktop Hero Section  */}
      <section className="relative overflow-hidden pt-12 pb-20">
        {/*  Ambient Light Orbs  */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-secondary-container/40 blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-tertiary-fixed/30 blur-3xl pointer-events-none -z-10"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/*  Hero Left Column: Copy & Actions  */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/*  Trust Badge  */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container/60 border border-primary/20 shadow-xs mb-6">
              <BadgeCheck className="text-primary text-base" />
              <span className="font-label-sm text-label-sm text-on-secondary-container font-semibold tracking-wide">
                99.99% Uptime Guarantee
              </span>
            </div>
            {/*  Main Headline  */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface leading-[1.15] mb-6">
              Run your business <span className="text-primary">operations</span>{" "}
              in one place
            </h1>
            {/*  Supporting Subtitle  */}
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed mb-8">
              Intelligent double-entry accounting, automated merchant invoicing,
              and real-time cash flow synchronization built for modern
              multi-store commerce enterprises.
            </p>
            {/*  CTAs  */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={() => navigate("/signup")}
                className="px-8 py-3.5 rounded-full bg-primary-container text-on-primary font-semibold shadow-lg shadow-primary-container/25 hover:bg-primary active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>Start 14-Day Free Pilot</span>
                <ArrowRight className="text-lg" />
              </button>
              <button className="px-8 py-3.5 rounded-full bg-surface-container-lowest border border-outline-variant text-on-surface font-semibold hover:bg-surface-container-low active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <PlayCircle className="text-primary text-lg" />
                <span>Book a Demo</span>
              </button>
            </div>
          </div>
          {/*  Hero Right Column: High-Fidelity Desktop SaaS Dashboard Preview  */}
          <div className="lg:col-span-6">
            <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/40 shadow-xl p-7 relative overflow-hidden backdrop-blur-sm">
              {/*  Card Header & Navigation Bar inside preview  */}
              <div className="flex items-center justify-between pb-5 border-b border-surface-container">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-secondary-container/50 flex items-center justify-center text-primary">
                    <Wallet className="text-2xl" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-outline tracking-wider uppercase block">
                      Cash on Hand
                    </span>
                    <span className="text-base font-bold text-on-surface">
                      Main Operating Acct
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                    <TrendingUp className="text-sm" />
                    <span>+12.4% MoM</span>
                  </span>
                  <button
                    aria-label="Refresh financial metric"
                    className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-outline hover:text-primary transition-colors"
                    id="refreshMetricBtn"
                  >
                    <RefreshCw className="text-lg" />
                  </button>
                </div>
              </div>
              {/*  Metric Figures & Quick Sync Tag  */}
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <span className="text-4xl font-bold tracking-tight text-on-surface">
                    ₹14,89,205
                  </span>
                  <span className="text-xs text-outline flex items-center gap-1.5 mt-1">
                    <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                    Updated 4 mins ago • Real-time bank sync active
                  </span>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-xs text-outline block">
                    Available Overdraft
                  </span>
                  <span className="text-sm font-semibold text-on-surface">
                    ₹5,00,000.00
                  </span>
                </div>
              </div>
              {/*  Sparkline Chart Component  */}
              <div className="mt-6 pt-2">
                <div className="h-28 w-full relative">
                  <svg
                    className="w-full h-full overflow-visible"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 500 90"
                  >
                    <defs />
                    <linearGradient
                      id="desktopChartGradient"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#14B8A6"
                        stopOpacity="0.35"
                      ></stop>
                      <stop
                        offset="100%"
                        stopColor="#14B8A6"
                        stopOpacity="0.0"
                      ></stop>
                    </linearGradient>

                    <path
                      d="M0,65 Q60,60 120,40 T240,45 T360,25 T460,32 L500,14 L500,90 L0,90 Z"
                      fill="url(#desktopChartGradient)"
                    />
                    <path
                      d="M0,65 Q60,60 120,40 T240,45 T360,25 T460,32 L500,14"
                      fill="none"
                      stroke="#14B8A6"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                    <circle cx="500" cy="14" fill="#006B5E" r="5" />
                    <circle
                      cx="500"
                      cy="14"
                      fill="#71F8E4"
                      fillOpacity="0.4"
                      r="11"
                    />
                  </svg>
                </div>
                {/*  Timeline Legend  */}
                <div className="flex justify-between items-center text-outline text-xs mt-3 px-1">
                  <span>Oct 01</span>
                  <span>Oct 08</span>
                  <span>Oct 15</span>
                  <span>Oct 22</span>
                  <span className="text-primary font-bold">Today (Live)</span>
                </div>
              </div>
              {/*  Bottom Operational 3-Tile Mini Strip  */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="bg-surface-container-low/80 rounded-xl p-3 border border-outline-variant/30">
                  <span className="text-[11px] font-medium text-outline block">
                    Today's Invoices
                  </span>
                  <span className="text-sm font-bold text-on-surface mt-0.5 block">
                    32 Orders
                  </span>
                  <span className="text-[11px] text-primary font-semibold block mt-0.5">
                    +₹84,200.00
                  </span>
                </div>
                <div className="bg-surface-container-low/80 rounded-xl p-3 border border-outline-variant/30">
                  <span className="text-[11px] font-medium text-outline block">
                    Pending Feeds
                  </span>
                  <span className="text-sm font-bold text-on-surface mt-0.5 block">
                    0 Unmatched
                  </span>
                  <span className="text-[11px] text-secondary font-semibold block mt-0.5">
                    100% Synced
                  </span>
                </div>
                <div className="bg-surface-container-low/80 rounded-xl p-3 border border-outline-variant/30">
                  <span className="text-[11px] font-medium text-outline block">
                    Net Margin
                  </span>
                  <span className="text-sm font-bold text-on-surface mt-0.5 block">
                    31.8%
                  </span>
                  <span className="text-[11px] text-primary font-semibold block mt-0.5">
                    +2.4% vs target
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  Enterprise Metrics Bar  */}
      <section
        className="w-full bg-surface-container-low py-12 border-y border-outline-variant/30"
        id="metrics"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <span className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">
              ₹35,000 Cr+
            </span>
            <span className="text-sm text-on-surface-variant font-medium mt-1">
              Gross Volume Processed
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">
              99.99%
            </span>
            <span className="text-sm text-on-surface-variant font-medium mt-1">
              Platform Availability
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">
              15ms
            </span>
            <span className="text-sm text-on-surface-variant font-medium mt-1">
              Bank Ledger Sync Latency
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">
              0h
            </span>
            <span className="text-sm text-on-surface-variant font-medium mt-1">
              Manual Month-End Delays
            </span>
          </div>
        </div>
      </section>
      {/*  Capabilities & Features Section (4 Desktop Columns)  */}
      <section className="max-w-7xl mx-auto px-6 py-24" id="features">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Platform Core
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mt-2">
              Built for high-velocity merchant operations
            </h2>
          </div>
          <p className="text-on-surface-variant max-w-md text-base">
            Consolidate scattered point-of-sale registers, multi-bank feeds, and
            automated tax reporting into a single coordinated source of truth.
          </p>
        </div>
        {/*  Feature Grid: 4 Desktop Columns  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/*  Card 1  */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary-container/50 flex items-center justify-center text-primary mb-5">
                <Receipt className="text-2xl" />
              </div>
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mb-1">
                Ledger Engine
              </span>
              <h3 className="text-lg font-bold text-on-surface mb-2">
                Real-time Accounting
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Automated double-entry ledgers instantly matching incoming
                transactions with zero reconciliation backlog.
              </p>
            </div>
            <div className="pt-5 mt-6 border-t border-surface-container flex items-center justify-between text-xs text-primary font-semibold">
              <span>Explore ledgers</span>
              <ArrowRight className="text-base" />
            </div>
          </div>
          {/*  Card 2  */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary-container/50 flex items-center justify-center text-primary mb-5">
                <Send className="text-2xl" />
              </div>
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mb-1">
                Billing &amp; AR
              </span>
              <h3 className="text-lg font-bold text-on-surface mb-2">
                Smart Invoicing
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Generate branded recurring invoices with one-click payment
                links, credit terms, and automated SMS/email reminders.
              </p>
            </div>
            <div className="pt-5 mt-6 border-t border-surface-container flex items-center justify-between text-xs text-primary font-semibold">
              <span>Automate billing</span>
              <ArrowRight className="text-base" />
            </div>
          </div>
          {/*  Card 3  */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary-container/50 flex items-center justify-center text-primary mb-5">
                <Shield className="text-2xl" />
              </div>
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mb-1">
                Compliance
              </span>
              <h3 className="text-lg font-bold text-on-surface mb-2">
                Automated Tax Prep
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Auto-categorize sales tax by jurisdiction seamlessly, exporting
                CPA-ready balance sheets and audit trails anytime.
              </p>
            </div>
            <div className="pt-5 mt-6 border-t border-surface-container flex items-center justify-between text-xs text-primary font-semibold">
              <span>Tax compliance</span>
              <ArrowRight className="text-base" />
            </div>
          </div>
          {/*  Card 4  */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary-container/50 flex items-center justify-center text-primary mb-5">
                <Landmark className="text-2xl" />
              </div>
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mb-1">
                Connectivity
              </span>
              <h3 className="text-lg font-bold text-on-surface mb-2">
                Multi-Entity Feeds
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Direct API hookup with 12,000+ banks, Shopify, Square, Stripe,
                and physical store POS systems simultaneously.
              </p>
            </div>
            <div className="pt-5 mt-6 border-t border-surface-container flex items-center justify-between text-xs text-primary font-semibold">
              <span>Connect accounts</span>
              <ArrowRight className="text-base" />
            </div>
          </div>
        </div>
      </section>
      {/*  Full Width Desktop Call To Action Banner  */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-primary text-on-primary rounded-3xl p-12 lg:p-16 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          {/*  Background Decorative Turquoise Geometry  */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-primary-fixed/20 pointer-events-none blur-xl"></div>
          <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-secondary-container/20 pointer-events-none blur-lg"></div>
          <div className="relative z-10 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-on-primary/10 border border-white/20 text-xs font-semibold text-primary-fixed mb-4">
              <Rocket className="text-sm" />
              <span>Ready for launch</span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
              Start your 14-day free pilot
            </h3>
            <p className="text-tertiary-fixed text-base leading-relaxed">
              No credit card required. Connect your storefront and payment
              terminals in under 5 minutes to experience total operational
              clarity.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <button
              onClick={() => navigate("/signup")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-surface-container-lowest text-primary font-bold shadow-lg hover:bg-white active:scale-95 transition-all text-center"
            >
              Create Free Account
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary/40 border border-white/30 text-white font-semibold hover:bg-primary/60 active:scale-95 transition-all text-center">
              Contact Enterprise Sales
            </button>
          </div>
        </div>
      </section>
      {/*  Full Desktop Multi-Column Footer  */}
      <footer className="w-full bg-surface-container-low border-t border-outline-variant/30 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-10">
          {/*  Col 1: Brand & Bio  */}
          <div className="col-span-2">
            <div className="w-36 h-10 rounded-xl bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center mb-4">
              <span className="font-label-sm text-label-sm text-primary font-bold tracking-wider uppercase">
                URBANMART
              </span>
            </div>
            <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed mb-6">
              Next-generation commerce operations engine uniting accounting,
              multi-location point of sale, and instant merchant settlement.
            </p>
            <span className="text-xs text-outline block">
              © 2026 UrbanMart Technologies Inc. All rights reserved.
            </span>
          </div>
          {/*  Col 2: Product  */}
          <div>
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li>
                <Link className="hover:text-primary transition-colors" to="#">
                  Ledger Engine
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="#">
                  Smart Invoicing
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="#">
                  Automated Tax
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="#">
                  Bank Integrations
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="#">
                  POS Terminal Sync
                </Link>
              </li>
            </ul>
          </div>
          {/*  Col 3: Company  */}
          <div>
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li>
                <Link className="hover:text-primary transition-colors" to="#">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="#">
                  Careers
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="#">
                  Press Kit
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="#">
                  Partners
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="#">
                  Security Center
                </Link>
              </li>
            </ul>
          </div>
          {/*  Col 4: Resources & Legal  */}
          <div>
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li>
                <Link className="hover:text-primary transition-colors" to="#">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="#">
                  Developer Guides
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="#">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="#">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="#">
                  Support 24/7
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
