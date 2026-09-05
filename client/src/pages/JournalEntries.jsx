import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Plus, Search, Settings } from "lucide-react";
import { fetchClient } from "../utils/api";
import useAuth from "../utils/useAuth";

const STATUS_COLORS = {
  POSTED: "bg-emerald-50 text-emerald-700",
  DRAFT: "bg-yellow-50 text-yellow-700",
  CANCELLED: "bg-red-50 text-red-700",
};
const SOURCE_COLORS = {
  BILL: "bg-rose-50 text-rose-600",
  INVOICE: "bg-blue-50 text-blue-600",
  MANUAL: "bg-purple-50 text-purple-600",
};

export default function JournalEntries() {
  const navigate = useNavigate();
  const { isAdmin, isAccountant } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    fetchClient("/journal-entries")
      .then((data) => { setEntries(data); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, []);

  const filtered = entries.filter((e) => {
    const matchStatus = statusFilter === "ALL" || e.status === statusFilter;
    const matchSearch =
      (e.reference || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.journal?.journalName || "").toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <>
      <header className="bg-surface-container-lowest border-b border-outline-variant shadow-sm z-50 fixed w-full top-0 h-16">
        <div className="flex items-center justify-between px-6 lg:px-10 w-full max-w-[120rem] mx-auto h-16">
          <div className="flex items-center gap-8">
            <div className="w-[120px] h-[36px] bg-surface-container-low border border-outline-variant rounded-lg flex items-center justify-center">
              <span className="font-bold text-primary text-sm tracking-wide uppercase">UrbanMart</span>
            </div>
            <nav className="hidden md:flex items-center h-16 gap-6">
              {(isAdmin || isAccountant) && <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm" to="/sales-orders">Sales</Link>}
              {(isAdmin || isAccountant) && <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm" to="/purchase-orders">Purchase</Link>}
              <Link className="text-primary font-semibold border-b-2 border-primary h-16 flex items-center text-sm" to="/journal-entries">Account</Link>
              {(isAdmin || isAccountant) && <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm" to="/balance-sheet">Report</Link>}
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
          <span className="text-on-surface font-medium">Journal Entries</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-bold text-on-surface">Journal Entries</h1>
            <span className="bg-surface-container-low text-on-surface-variant px-3 py-1 rounded-full text-xs border border-outline-variant">{filtered.length} of {entries.length}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={14} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-4 h-9 rounded-full border border-outline-variant bg-surface-container-lowest text-sm outline-none focus:border-primary transition-all w-48"
                placeholder="Search entries..."
              />
            </div>
            {/* Status filter */}
            <div className="flex bg-surface-container-low rounded-full p-0.5 border border-outline-variant gap-0.5">
              {["ALL", "DRAFT", "POSTED"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${statusFilter === s ? "bg-surface shadow-sm text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
                >
                  {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
            <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-full border border-outline-variant text-sm font-medium text-on-surface-variant hover:bg-surface-container transition-colors">Back</button>
            {(isAdmin || isAccountant) && (
              <button onClick={() => navigate("/journal-entries/new")} className="px-5 py-2 rounded-full bg-primary text-on-primary text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm transition-all">
                <Plus size={16} /> New Entry
              </button>
            )}
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low/50">
                  <th className="p-4 w-12 text-center"><input type="checkbox" className="w-[18px] h-[18px] rounded border-outline-variant cursor-pointer" /></th>
                  <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Reference</th>
                  <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Partner</th>
                  <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Journal</th>
                  <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Source</th>
                  <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Total (Dr)</th>
                  <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-outline-variant">
                {loading ? (
                  <tr><td colSpan="8" className="p-8 text-center text-on-surface-variant">Loading entries...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan="8" className="p-8 text-center text-on-surface-variant">No journal entries found</td></tr>
                ) : filtered.map((e) => {
                  const totalDebit = e.lines?.reduce((sum, l) => sum + (parseFloat(l.debit) || 0), 0) || 0;
                  // Derive partner from linked bill or invoice
                  const partner = e.vendorBill?.vendor?.name || e.customerInvoice?.customer?.name || "—";
                  const sourceType = e.vendorBillId ? "BILL" : e.customerInvoiceId ? "INVOICE" : "MANUAL";
                  return (
                    <tr
                      key={e.id}
                      className="hover:bg-primary/5 transition-colors cursor-pointer"
                      onClick={() => navigate(`/journal-entries/${e.id}`)}
                    >
                      <td className="p-4 text-center" onClick={(ev) => ev.stopPropagation()}>
                        <input type="checkbox" className="w-[18px] h-[18px] rounded border-outline-variant cursor-pointer" />
                      </td>
                      <td className="p-4 text-on-surface-variant">{new Date(e.createdAt).toLocaleDateString("en-IN")}</td>
                      <td className="p-4 font-mono text-xs font-semibold text-primary">{e.reference || `JE-${e.id}`}</td>
                      <td className="p-4 font-medium text-on-surface">{partner}</td>
                      <td className="p-4 text-on-surface-variant">{e.journal?.journalName || "—"}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${SOURCE_COLORS[sourceType] || "bg-surface-container text-on-surface"}`}>
                          {sourceType}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-on-surface">₹{totalDebit.toLocaleString("en-IN")}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[e.status] || "bg-surface-container text-on-surface"}`}>
                          {e.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
