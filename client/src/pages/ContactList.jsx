import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Bell, ChevronDown, ChevronRight, LayoutDashboard,
  LayoutList, MoreVertical, Plus, Search, Settings,
} from "lucide-react";
import { fetchClient } from "../utils/api";
import useAuth from "../utils/useAuth";

const TYPE_LABEL = {
  CUSTOMER: "Customer",
  VENDOR: "Vendor",
  BOTH: "Vendor & Customer",
};
const TYPE_COLOR = {
  CUSTOMER: "bg-blue-50 text-blue-700",
  VENDOR: "bg-amber-50 text-amber-700",
  BOTH: "bg-purple-50 text-purple-700",
};

export default function ContactList() {
  const navigate = useNavigate();
  const { isAdmin, isAccountant } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  useEffect(() => {
    fetchClient("/contacts")
      .then((data) => { setContacts(data); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, []);

  const filtered = contacts.filter((c) => {
    const matchType =
      typeFilter === "ALL" ||
      c.type === typeFilter ||
      (typeFilter === "CUSTOMER" && c.type === "BOTH") ||
      (typeFilter === "VENDOR" && c.type === "BOTH");
    const matchSearch =
      (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.companyName || "").toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <>
      {/* TopNavBar */}
      <header className="bg-surface-container-lowest border-b border-outline-variant shadow-sm z-50 fixed w-full top-0 h-16">
        <div className="flex items-center justify-between px-6 lg:px-10 w-full max-w-[120rem] mx-auto h-16">
          <div className="flex items-center gap-8">
            <div className="w-[120px] h-[36px] bg-surface-container-low rounded-lg flex items-center justify-center border border-outline-variant">
              <span className="font-bold text-primary text-sm tracking-wide uppercase">UrbanMart</span>
            </div>
            <nav className="hidden md:flex items-center h-full pt-5 gap-6">
              {(isAdmin || isAccountant) && (
                <Link className="text-on-surface-variant font-medium pb-5 hover:text-primary transition-colors text-sm" to="/sales-orders">Sales</Link>
              )}
              {(isAdmin || isAccountant) && (
                <Link className="text-on-surface-variant font-medium pb-5 hover:text-primary transition-colors text-sm" to="/purchase-orders">Purchase</Link>
              )}
              <Link aria-current="page" className="text-primary font-semibold border-b-2 border-primary pb-5 text-sm" to="/contacts">Account</Link>
              {(isAdmin || isAccountant) && (
                <Link className="text-on-surface-variant font-medium pb-5 hover:text-primary transition-colors text-sm" to="/balance-sheet">Report</Link>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-on-surface-variant hover:text-primary p-2 rounded-full hover:bg-surface-container transition-colors"><Bell size={18} /></button>
            <button className="text-on-surface-variant hover:text-primary p-2 rounded-full hover:bg-surface-container transition-colors"><Settings size={18} /></button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-24 pb-12 px-6 md:px-10 w-full max-w-[120rem] mx-auto">
        <nav className="flex items-center gap-2 text-sm text-on-surface-variant mb-4">
          <Link className="hover:text-primary flex items-center gap-1" to="/dashboard"><ArrowLeft size={15} /> Back to Dashboard</Link>
          <span>/</span>
          <span className="text-on-surface font-medium">Contacts</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-bold text-on-surface">Contacts</h1>
            <span className="bg-surface-container-low text-on-surface-variant px-3 py-1 rounded-full text-xs border border-outline-variant">
              {filtered.length} of {contacts.length}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="rounded-full border-[1.5px] border-primary text-primary bg-transparent px-5 py-2 text-sm font-medium hover:bg-primary/10 transition-colors">
              Back
            </button>
            {(isAdmin || isAccountant) && (
              <button onClick={() => navigate("/contacts/new")} className="rounded-full bg-primary text-on-primary px-5 py-2 text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm transition-all">
                <Plus size={16} /> New Contact
              </button>
            )}
          </div>
        </div>

        {/* Control Bar */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-full bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:border-primary focus:ring-0 outline-none transition-all"
              placeholder="Search contacts by name, email, company..."
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Type filter */}
            <div className="flex bg-surface-container-low rounded-full p-1 border border-outline-variant gap-1">
              {["ALL", "CUSTOMER", "VENDOR", "BOTH"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${typeFilter === t ? "bg-surface shadow-sm text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
                >
                  {t === "ALL" ? "All" : t === "BOTH" ? "Both" : t.charAt(0) + t.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
            <div className="flex items-center bg-surface-container-low rounded-lg p-1 border border-outline-variant ml-auto">
              <button onClick={() => navigate("/contacts")} className="p-1.5 rounded bg-surface shadow-sm text-primary"><LayoutList size={18} /></button>
              <button onClick={() => navigate("/contacts/kanban")} className="p-1.5 rounded text-on-surface-variant hover:text-on-surface"><LayoutDashboard size={18} /></button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low/50">
                  <th className="p-4 w-12 text-center"><input className="w-[18px] h-[18px] rounded border-outline-variant cursor-pointer" type="checkbox" /></th>
                  <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Contact</th>
                  <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Email</th>
                  <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Phone</th>
                  <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Company</th>
                  <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Type</th>
                  <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Status</th>
                  <th className="p-4 w-12"></th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-outline-variant">
                {loading ? (
                  <tr><td colSpan="8" className="p-8 text-center text-on-surface-variant">Loading contacts...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan="8" className="p-8 text-center text-on-surface-variant">No contacts found</td></tr>
                ) : filtered.map((c) => {
                  const initials = c.name ? c.name.substring(0, 2).toUpperCase() : "CO";
                  return (
                    <tr key={c.id} className="hover:bg-primary/5 transition-colors group cursor-pointer" onClick={() => navigate(`/contacts/${c.id}`)}>
                      <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}><input className="w-[18px] h-[18px] rounded border-outline-variant cursor-pointer" type="checkbox" /></td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20">
                            {initials}
                          </div>
                          <span className="font-semibold text-on-surface">{c.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-on-surface-variant">{c.email || "—"}</td>
                      <td className="p-4 text-on-surface-variant">{c.phone || "—"}</td>
                      <td className="p-4 text-on-surface">{c.companyName || "—"}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${TYPE_COLOR[c.type] || "bg-surface-container text-on-surface"}`}>
                          {TYPE_LABEL[c.type] || c.type || "—"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-semibold">Active</span>
                      </td>
                      <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <button className="p-1 rounded-full hover:bg-surface-container transition-colors opacity-0 group-hover:opacity-100"><MoreVertical size={16} className="text-on-surface-variant" /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="border-t border-outline-variant bg-surface-container-lowest p-4 flex items-center justify-between text-sm text-on-surface-variant">
            <span>Showing {filtered.length} of {contacts.length} contacts</span>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container disabled:opacity-40" disabled><ArrowLeft size={14} /></button>
              <button className="w-8 h-8 rounded-full bg-primary text-on-primary font-semibold text-xs flex items-center justify-center">1</button>
              <button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container"><ChevronRight size={14} /></button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
