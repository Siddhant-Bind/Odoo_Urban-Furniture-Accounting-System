import React, { useState, useEffect } from "react";
import { Plus, Search, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchClient } from "../utils/api";

// Map DB status → display label
const STATUS_LABEL = {
  DRAFT: "Draft",
  POSTED: "Confirmed",
  PAID: "Paid",
  CANCELLED: "Cancelled",
};

const STATUS_COLORS = {
  Draft: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-blue-100 text-blue-800",
  Paid: "bg-emerald-100 text-emerald-800",
  Cancelled: "bg-red-100 text-red-800",
};

const TABS = ["All", "Draft", "Confirmed", "Paid"];

function mapInvoice(inv) {
  return {
    id: inv.invoiceNumber,
    originalId: inv.id,
    customer: inv.customer?.name || inv.customerName || "Unknown",
    date: inv.invoiceDate ? new Date(inv.invoiceDate).toLocaleDateString("en-IN") : "—",
    due: inv.dueDate ? new Date(inv.dueDate).toLocaleDateString("en-IN") : "—",
    total: parseFloat(inv.totalAmount) || 0,
    status: STATUS_LABEL[inv.status] || inv.status,
    rawStatus: inv.status,
  };
}

export default function InvoiceRegister() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const loadInvoices = () => {
    setLoading(true);
    fetchClient("/sales/invoices")
      .then((data) => {
        setInvoices(data.map(mapInvoice));
        setLoading(false);
      })
      .catch((e) => { console.error(e); setLoading(false); });
  };

  useEffect(() => { loadInvoices(); }, []);

  // Optimistic update: flip status pill to Paid immediately then reload
  const handlePayNow = (e, inv) => {
    e.stopPropagation();
    // Optimistic flip
    setInvoices((prev) =>
      prev.map((i) => (i.originalId === inv.originalId ? { ...i, status: "Paid", rawStatus: "PAID" } : i))
    );
    navigate(`/receipts?invoiceId=${inv.originalId}`);
  };

  const filtered = invoices.filter(
    (inv) =>
      (filter === "All" || inv.status === filter) &&
      (inv.customer.toLowerCase().includes(search.toLowerCase()) ||
        (inv.id || "").toLowerCase().includes(search.toLowerCase()))
  );

  const getCount = (tab) =>
    tab === "All" ? invoices.length : invoices.filter((i) => i.status === tab).length;

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-headline-md font-bold text-on-surface">Customer Invoices</h1>
          <p className="text-body-sm text-on-surface-variant">
            {invoices.length} invoice{invoices.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadInvoices}
            className="px-4 py-2 rounded-full font-label-md font-semibold bg-surface-container-high text-on-surface hover:bg-surface-container transition-colors shadow-sm text-sm"
          >
            Refresh
          </button>
          <button
            onClick={() => navigate("/customer-invoices/new")}
            className="px-5 py-2.5 rounded-full font-label-md font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-all shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Invoice
          </button>
        </div>
      </header>

      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        {/* Tabs */}
        <div className="flex bg-surface-container-low p-1 rounded-full shadow-sm border border-surface-container/50 w-full md:w-auto overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-full font-label-sm font-semibold transition-all whitespace-nowrap ${
                filter === tab
                  ? "bg-surface shadow-sm text-primary"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface/50"
              }`}
            >
              {tab}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${filter === tab ? "bg-primary-container text-on-primary-container" : "bg-surface-container-high text-on-surface"}`}>
                {getCount(tab)}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 w-full md:w-80">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-surface-container-lowest border border-surface-container-high focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-surface-container-low/50">
                {["Invoice No.", "Customer", "Invoice Date", "Due Date", "Total (₹)", "Status", ""].map((h) => (
                  <th key={h} className="px-6 py-4 font-label-sm font-bold text-on-surface-variant border-b border-surface-container tracking-wider uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-10 text-center text-on-surface-variant">Loading invoices...</td></tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-on-surface-variant">
                    <p className="font-semibold text-body-lg">No invoices found</p>
                    <p className="text-body-sm mt-1">Try adjusting your filters.</p>
                  </td>
                </tr>
              ) : filtered.map((inv) => (
                <tr
                  key={inv.originalId}
                  className="hover:bg-surface-container-low/40 transition-colors group cursor-pointer"
                  onClick={() => navigate(`/customer-invoices/${inv.originalId}`)}
                >
                  <td className="px-6 py-4 font-mono text-sm font-semibold text-primary">{inv.id}</td>
                  <td className="px-6 py-4 font-semibold text-on-surface">{inv.customer}</td>
                  <td className="px-6 py-4 text-on-surface-variant text-sm">{inv.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-on-surface-variant" />
                      <span className="text-on-surface-variant">{inv.due}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-on-surface">₹{inv.total.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${STATUS_COLORS[inv.status] || "bg-surface-container text-on-surface"}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    {inv.status === "Paid" ? (
                      <div className="flex items-center justify-end gap-1 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs font-semibold">Settled</span>
                      </div>
                    ) : inv.status !== "Cancelled" && inv.status !== "Draft" ? (
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
    </div>
  );
}
