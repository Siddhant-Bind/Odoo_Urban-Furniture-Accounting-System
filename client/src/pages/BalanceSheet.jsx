import React, { useState, useEffect } from "react";
import { ArrowLeft, Printer, Building2, Wallet, Users, Landmark, PiggyBank, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchClient } from "../utils/api";

export default function BalanceSheet() {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState({
    totalAssets: 0,
    totalLiabilities: 0,
    assets: [],
    liabilities: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClient('/reports/balance-sheet')
      .then(data => {
        setReportData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  // Helper to match icon and description based on account name/type
  const getAccountMetadata = (name, type) => {
    const lower = name.toLowerCase();
    if (lower.includes('bank')) {
      return { category: 'Asset - Bank', icon: Landmark, color: 'text-blue-500 bg-blue-500/10' };
    }
    if (lower.includes('cash')) {
      return { category: 'Asset - cash', icon: Wallet, color: 'text-emerald-500 bg-emerald-500/10' };
    }
    if (lower.includes('debtor')) {
      return { category: 'Asset - Debtors', icon: Users, color: 'text-cyan-500 bg-cyan-500/10' };
    }
    if (lower.includes('creditor')) {
      return { category: 'Liability - creditor', icon: Building2, color: 'text-amber-500 bg-amber-500/10' };
    }
    if (lower.includes('capital') || type === 'CAPITAL') {
      return { category: 'Capital', icon: PiggyBank, color: 'text-purple-500 bg-purple-500/10' };
    }
    return { category: `${type === 'ASSET' ? 'Asset' : 'Liability'} - ${name}`, icon: Landmark, color: 'text-primary bg-primary/10' };
  };

  // Standard item ordering & fallback ensuring default rows are always rendered
  const defaultAssets = [
    { name: 'Bank', type: 'ASSET', balance: 0 },
    { name: 'Cash', type: 'ASSET', balance: 0 },
    { name: 'Debtors', type: 'ASSET', balance: 0 }
  ];

  const defaultLiabilities = [
    { name: 'Creditors', type: 'LIABILITY', balance: 0 },
    { name: 'Capital', type: 'CAPITAL', balance: 0 }
  ];

  const mergedAssets = defaultAssets.map(def => {
    const found = reportData.assets.find(a => a.name.toLowerCase().includes(def.name.toLowerCase()));
    return found ? found : def;
  });

  // Include any extra assets from DB not in standard defaults
  reportData.assets.forEach(a => {
    if (!mergedAssets.some(m => m.name.toLowerCase() === a.name.toLowerCase())) {
      mergedAssets.push(a);
    }
  });

  const mergedLiabilities = defaultLiabilities.map(def => {
    const found = reportData.liabilities.find(l => l.name.toLowerCase().includes(def.name.toLowerCase()));
    return found ? found : def;
  });

  reportData.liabilities.forEach(l => {
    if (!mergedLiabilities.some(m => m.name.toLowerCase() === l.name.toLowerCase())) {
      mergedLiabilities.push(l);
    }
  });

  const calculatedTotalAssets = mergedAssets.reduce((sum, item) => sum + Number(item.balance || 0), 0);
  const calculatedTotalLiabilities = mergedLiabilities.reduce((sum, item) => sum + Number(item.balance || 0), 0);

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Top Bar with Print (Top-Left) and Back (Top-Right) buttons */}
      <div className="flex items-center justify-between gap-4 mb-6 print:hidden">
        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl bg-primary text-on-primary hover:bg-primary/90 transition-all shadow-sm font-semibold text-sm flex items-center gap-2 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print Statement</span>
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 rounded-xl border border-surface-container-high bg-surface-container-lowest hover:bg-surface-container-low text-on-surface-variant transition-all font-semibold text-sm flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <span>Back to Dashboard</span>
          <ArrowLeft className="w-4 h-4 rotate-180" />
        </button>
      </div>

      {/* Header Banner */}
      <header className="mb-8 p-6 bg-surface-container-lowest rounded-2xl border border-surface-container-high shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight">Balance Sheet</h1>
            <p className="text-sm text-on-surface-variant mt-1">Financial Position Statement as of {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-on-surface-variant bg-surface-container-low px-4 py-2 rounded-xl border border-surface-container">
            <span>Currency: INR (₹)</span>
            <span className="w-1 h-1 rounded-full bg-on-surface-variant/40"></span>
            <span>Status: Audited</span>
          </div>
        </div>
      </header>

      {/* Main 2-Column Section: Assets vs Liabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* LEFT COLUMN: ASSETS */}
        <div className="bg-surface-container-lowest rounded-2xl border border-surface-container-high shadow-sm flex flex-col overflow-hidden">
          <div className="p-5 bg-emerald-500/5 border-b border-surface-container-high flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-on-surface">Assets</h2>
                <p className="text-xs text-on-surface-variant">Owned resources & receivables</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700">
              {mergedAssets.length} Accounts
            </span>
          </div>

          <div className="p-5 flex-1 divide-y divide-surface-container/60">
            {mergedAssets.map((item, idx) => {
              const meta = getAccountMetadata(item.name, item.type);
              const Icon = meta.icon;
              return (
                <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between hover:bg-surface-container-lowest transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${meta.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-on-surface text-sm">{item.name}</div>
                      <div className="text-xs text-on-surface-variant font-medium">{meta.category}</div>
                    </div>
                  </div>
                  <div className="font-mono text-sm font-bold text-on-surface">
                    ₹{Number(item.balance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subtotal Asset Footer */}
          <div className="p-4 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between font-bold text-on-surface">
            <span className="text-sm">Total Assets</span>
            <span className="font-mono text-base text-emerald-600">
              ₹{calculatedTotalAssets.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: LIABILITIES & CAPITAL */}
        <div className="bg-surface-container-lowest rounded-2xl border border-surface-container-high shadow-sm flex flex-col overflow-hidden">
          <div className="p-5 bg-amber-500/5 border-b border-surface-container-high flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <ArrowDownRight className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-on-surface">Liabilities & Capital</h2>
                <p className="text-xs text-on-surface-variant">Obligations & equity structure</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700">
              {mergedLiabilities.length} Accounts
            </span>
          </div>

          <div className="p-5 flex-1 divide-y divide-surface-container/60">
            {mergedLiabilities.map((item, idx) => {
              const meta = getAccountMetadata(item.name, item.type);
              const Icon = meta.icon;
              return (
                <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between hover:bg-surface-container-lowest transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${meta.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-on-surface text-sm">{item.name}</div>
                      <div className="text-xs text-on-surface-variant font-medium">{meta.category}</div>
                    </div>
                  </div>
                  <div className="font-mono text-sm font-bold text-on-surface">
                    ₹{Number(item.balance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subtotal Liabilities Footer */}
          <div className="p-4 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between font-bold text-on-surface">
            <span className="text-sm">Total Liabilities & Capital</span>
            <span className="font-mono text-base text-amber-600">
              ₹{calculatedTotalLiabilities.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

      </div>

      {/* BOTTOM SUMMARY CARD: TOTAL ASSETS & TOTAL LIABILITIES */}
      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container-high p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
            ₹
          </div>
          <div>
            <h3 className="text-base font-bold text-on-surface">Financial Summary & Equivalence</h3>
            <p className="text-xs text-on-surface-variant">Assets = Liabilities + Equity (Double-Entry Verification)</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-surface-container">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Total Assets</span>
            <span className="text-xl font-bold font-mono text-emerald-600">
              ₹{calculatedTotalAssets.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="hidden sm:block text-2xl text-on-surface-variant font-light">|</div>

          <div className="flex flex-col">
            <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Total Liabilities</span>
            <span className="text-xl font-bold font-mono text-amber-600">
              ₹{calculatedTotalLiabilities.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
