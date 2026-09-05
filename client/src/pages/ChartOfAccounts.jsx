import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Lock, MoreVertical, Plus, Search, Settings } from "lucide-react";
import { fetchClient } from "../utils/api";
import useAuth from "../utils/useAuth";

const TYPE_COLORS = {
  ASSET: "bg-blue-50 text-blue-700",
  EXPENSE: "bg-rose-50 text-rose-700",
  LIABILITY: "bg-orange-50 text-orange-700",
  EQUITY: "bg-purple-50 text-purple-700",
  INCOME: "bg-green-50 text-green-700",
  REVENUE: "bg-green-50 text-green-700",
};

export default function ChartOfAccounts() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  useEffect(() => {
    fetchClient("/accounts")
      .then((data) => { setAccounts(data); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, []);

  const filtered = accounts.filter((acc) => {
    const matchType = typeFilter === "ALL" || acc.accountType === typeFilter;
    const matchSearch =
      (acc.accountName || "").toLowerCase().includes(search.toLowerCase()) ||
      (acc.accountCode || "").toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const accountTypes = [...new Set(accounts.map((a) => a.accountType).filter(Boolean))];

  return (
    <>
      <header className="bg-surface-container-lowest border-b border-outline-variant shadow-sm z-50 fixed w-full top-0 h-16">
        <div className="flex items-center justify-between px-6 lg:px-10 w-full max-w-[120rem] mx-auto h-16">
          <div className="flex items-center gap-8">
            <div className="w-[120px] h-[36px] bg-surface-container-low border border-outline-variant rounded-lg flex items-center justify-center">
              <span className="font-bold text-primary text-sm tracking-wide uppercase">UrbanMart</span>
            </div>
            <nav className="hidden md:flex items-center h-16 gap-6">
              <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm" to="/sales-orders">Sales</Link>
              <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm" to="/purchase-orders">Purchase</Link>
              <Link className="text-primary font-semibold border-b-2 border-primary h-16 flex items-center text-sm" to="/chart-of-accounts">Account</Link>
              <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm" to="/balance-sheet">Report</Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-on-surface-variant hover:text-primary p-2 rounded-full hover:bg-surface-container"><Bell size={18} /></button>
            <button className="text-on-surface-variant hover:text-primary p-2 rounded-full hover:bg-surface-container"><Settings size={18} /></button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6 md:px-10 w-full max-w-[120rem] mx-auto">
        <nav className="flex items-center gap-2 text-sm text-on-surface-variant mb-4">
          <Link className="hover:text-primary flex items-center gap-1" to="/dashboard"><ArrowLeft size={15} /> Dashboard</Link>
          <span>/</span>
          <span className="text-on-surface font-medium">Chart of Accounts</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-bold text-on-surface">Chart of Accounts</h1>
            <span className="bg-surface-container-low text-on-surface-variant px-3 py-1 rounded-full text-xs border border-outline-variant">{filtered.length} of {accounts.length}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={14} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-4 h-9 rounded-full border border-outline-variant bg-surface-container-lowest text-sm outline-none focus:border-primary transition-all"
                placeholder="Search accounts..."
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-9 px-3 rounded-full border border-outline-variant bg-surface-container-lowest text-sm outline-none focus:border-primary"
            >
              <option value="ALL">All Types</option>
              {accountTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-full border border-outline-variant text-sm font-medium text-on-surface-variant hover:bg-surface-container transition-colors">Back</button>
            {isAdmin && (
              <button onClick={() => navigate("/chart-of-accounts/new")} className="px-5 py-2 rounded-full bg-primary text-on-primary text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm transition-all">
                <Plus size={16} /> New Account
              </button>
            )}
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low/50">
                <th className="p-4 w-12 text-center"><input type="checkbox" className="w-[18px] h-[18px] rounded border-outline-variant cursor-pointer" /></th>
                <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Code</th>
                <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Account Name</th>
                <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Type</th>
                <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="p-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-outline-variant">
              {loading ? (
                <tr><td colSpan="6" className="p-8 text-center text-on-surface-variant">Loading accounts...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="6" className="p-8 text-center text-on-surface-variant">No accounts found</td></tr>
              ) : filtered.map((acc) => (
                <tr key={acc.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="p-4 text-center"><input type="checkbox" className="w-[18px] h-[18px] rounded border-outline-variant cursor-pointer" /></td>
                  <td className="p-4 font-mono text-xs text-on-surface-variant font-semibold">{acc.accountCode}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {/* System lock icon for seeded accounts */}
                      <Lock size={13} className="text-on-surface-variant/50 shrink-0" />
                      <span className="font-medium text-on-surface">{acc.accountName}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${TYPE_COLORS[acc.accountType] || "bg-surface-container text-on-surface"}`}>
                      {acc.accountType}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">Active</span>
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-1 rounded-full hover:bg-surface-container opacity-0 group-hover:opacity-100 transition-all"><MoreVertical size={15} className="text-on-surface-variant" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
