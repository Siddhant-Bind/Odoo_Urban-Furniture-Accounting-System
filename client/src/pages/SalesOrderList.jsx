import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, ChevronDown, ArrowLeft, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchClient } from "../utils/api";

const STATUS_TABS = ["All", "DRAFT", "CONFIRMED", "BILLED", "CANCELLED"];
const STATUS_LABEL = { DRAFT: "Draft", CONFIRMED: "Confirmed", BILLED: "Billed", CANCELLED: "Cancelled" };
const STATUS_COLOR = {
  DRAFT: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-emerald-100 text-emerald-800",
  BILLED: "bg-blue-100 text-blue-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function SalesOrderList() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const load = () => {
    setLoading(true);
    fetchClient("/sales/orders")
      .then((data) => { setOrders(data); setLoading(false); })
      .catch((e) => { console.error(e); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const filtered = orders.filter((o) => {
    const matchStatus = filter === "All" || o.status === filter;
    const matchSearch =
      (o.soNumber || "").toLowerCase().includes(search.toLowerCase()) ||
      (o.customerName || o.customer?.name || "").toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getCount = (tab) =>
    tab === "All" ? orders.length : orders.filter((o) => o.status === tab).length;

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col gap-1">
            <h1 className="text-headline-md font-bold text-on-surface">Sales Orders</h1>
            <p className="text-body-sm text-on-surface-variant">
              {orders.length} order{orders.length !== 1 ? "s" : ""} total
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/sales-orders/new")}
          className="px-5 py-2.5 rounded-full font-label-md font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-all shadow-sm flex items-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          New Sales Order
        </button>
      </header>

      {/* Tabs + Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex bg-surface-container-low p-1 rounded-full shadow-sm border border-surface-container/50 w-full md:w-auto overflow-x-auto">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-full font-label-sm font-semibold transition-all whitespace-nowrap ${
                filter === tab
                  ? "bg-surface shadow-sm text-primary"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface/50"
              }`}
            >
              {tab === "All" ? "All" : STATUS_LABEL[tab]}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  filter === tab
                    ? "bg-primary-container text-on-primary-container"
                    : "bg-surface-container-high text-on-surface"
                }`}
              >
                {getCount(tab)}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-surface-container-lowest border border-surface-container-high focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm shadow-sm"
            />
          </div>
          <button className="w-10 h-10 rounded-full border border-surface-container-high bg-surface-container-lowest hover:bg-surface-container-low flex items-center justify-center text-on-surface-variant shadow-sm">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-surface-container-low/50">
                {["SO Number", "Customer", "Order Date", "Total (₹)", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 font-label-sm font-bold text-on-surface-variant border-b border-surface-container tracking-wider uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-on-surface-variant">
                    Loading orders...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">
                    <p className="font-semibold text-body-lg">No sales orders found</p>
                    <p className="text-body-sm mt-1">Try adjusting your filters or create a new order.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-surface-container-low/40 transition-colors group cursor-pointer"
                    onClick={() => navigate(`/sales-orders/${order.id}`)}
                  >
                    <td className="px-6 py-4 font-mono text-sm font-semibold text-primary">
                      {order.soNumber}
                    </td>
                    <td className="px-6 py-4 font-semibold text-on-surface">
                      {order.customerName || order.customer?.name || "—"}
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">
                      {order.orderDate
                        ? new Date(order.orderDate).toLocaleDateString("en-IN")
                        : "—"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-on-surface">
                      ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          STATUS_COLOR[order.status] || "bg-surface-container text-on-surface"
                        }`}
                      >
                        {STATUS_LABEL[order.status] || order.status}
                      </span>
                    </td>
                    <td
                      className="px-6 py-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => navigate(`/sales-orders/${order.id}`)}
                          className="px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-sm font-semibold hover:bg-surface-container-high transition-colors text-xs"
                        >
                          View
                        </button>
                        {order.status === "CONFIRMED" && (
                          <button
                            onClick={() =>
                              navigate(`/customer-invoices/new?soId=${order.id}`)
                            }
                            className="px-3 py-1.5 rounded-full bg-primary-container text-on-primary-container font-label-sm font-semibold hover:bg-primary hover:text-on-primary transition-colors text-xs flex items-center gap-1"
                          >
                            <Receipt className="w-3 h-3" />
                            Invoice
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
