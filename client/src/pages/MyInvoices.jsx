import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Settings, LogOut, CheckCircle, Search, Filter } from "lucide-react";
import { fetchClient } from "../utils/api";
import useAuth from "../utils/useAuth";

const STATUS_COLORS = {
  DRAFT: "bg-yellow-100 text-yellow-800",
  POSTED: "bg-blue-100 text-blue-800",
  PAID: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function MyInvoices() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    fetchClient("/contacts/me/invoices")
      .then((data) => {
        setInvoices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handlePayNow = (e, inv) => {
    e.stopPropagation();
    // Optimistic update
    setInvoices(prev => prev.map(i => i.id === inv.id ? { ...i, status: "PAID" } : i));
    navigate(`/receipts?invoiceId=${inv.id}`);
  };

  const filtered = invoices.filter(
    (inv) =>
      (inv.invoiceNumber || "").toLowerCase().includes(search.toLowerCase()) ||
      (inv.status || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("um_session");
    navigate("/login");
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-surface-container-lowest border-b border-outline-variant shadow-sm z-50 fixed w-full top-0 h-16">
        <div className="flex items-center justify-between px-6 lg:px-10 w-full max-w-[120rem] mx-auto h-16">
          <div className="flex items-center gap-8">
            <div className="w-[120px] h-[36px] bg-surface-container-low border border-outline-variant rounded-lg flex items-center justify-center">
              <span className="font-bold text-primary text-sm tracking-wide uppercase">UrbanMart</span>
            </div>
            <nav className="hidden md:flex items-center h-16 gap-6">
              <Link className="text-primary font-semibold border-b-2 border-primary h-16 flex items-center text-sm" to="/my-invoices">My Invoices</Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 relative">
            <button 
              onClick={() => setProfileOpen(!profileOpen)} 
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary text-sm font-bold cursor-pointer hover:opacity-90 transition-opacity"
            >
              {user?.userId ? "U" : "C"}
            </button>
            {profileOpen && (
              <div className="absolute top-10 right-0 mt-2 w-48 bg-surface-container-lowest border border-surface-container rounded-xl shadow-lg z-50 overflow-hidden py-1">
                <div className="px-4 py-2 border-b border-surface-container">
                  <p className="font-semibold text-sm text-on-surface truncate">{user?.loginId ?? "Contact User"}</p>
                  <p className="text-xs text-on-surface-variant truncate">{user?.email ?? ""}</p>
                </div>
                <div className="h-px bg-surface-container"></div>
                <button 
                  onClick={handleLogout} 
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error-container/30 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6 md:px-10 w-full max-w-[120rem] mx-auto flex-1">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-headline-md font-bold text-on-surface">My Invoices</h1>
            <p className="text-body-sm text-on-surface-variant">View and pay your outstanding invoices.</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto mb-6">
          <div className="relative flex-1 md:w-64 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-surface-container-lowest border border-surface-container-high focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm shadow-sm"
            />
          </div>
          <button className="w-10 h-10 rounded-full border border-surface-container-high bg-surface-container-lowest hover:bg-surface-container-low flex items-center justify-center text-on-surface-variant shadow-sm">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Table */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-surface-container-low/50">
                  {["Invoice No.", "Invoice Date", "Due Date", "Total (₹)", "Status", ""].map((h) => (
                    <th key={h} className="px-6 py-4 font-label-sm font-bold text-on-surface-variant border-b border-surface-container tracking-wider uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {loading ? (
                  <tr><td colSpan={6} className="px-6 py-10 text-center text-on-surface-variant">Loading your invoices...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">
                      <p className="font-semibold text-body-lg">No invoices found</p>
                    </td>
                  </tr>
                ) : filtered.map((inv) => (
                  <tr key={inv.id} className="hover:bg-surface-container-low/40 transition-colors group cursor-default">
                    <td className="px-6 py-4 font-mono text-sm font-semibold text-primary">{inv.invoiceNumber}</td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">
                      {inv.invoiceDate ? new Date(inv.invoiceDate).toLocaleDateString("en-IN") : "—"}
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">
                      {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString("en-IN") : "—"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-on-surface">₹{Number(inv.totalAmount || 0).toLocaleString("en-IN")}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${STATUS_COLORS[inv.status] || "bg-surface-container text-on-surface"}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {inv.status === "PAID" ? (
                        <div className="flex items-center justify-end gap-1 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-xs font-semibold">Settled</span>
                        </div>
                      ) : inv.status === "POSTED" ? (
                        <button
                          onClick={(e) => handlePayNow(e, inv)}
                          className="px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container font-label-sm font-semibold hover:bg-primary hover:text-on-primary transition-colors opacity-0 group-hover:opacity-100"
                        >
                          Pay Now
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
