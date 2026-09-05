import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Bell, ChevronDown, ChevronRight, LayoutDashboard,
  LayoutList, MoreVertical, Plus, Search, Settings, Mail, Truck, Building2
} from "lucide-react";
import { fetchClient } from "../utils/api";
import useAuth from "../utils/useAuth";

const TYPE_LABEL = {
  CUSTOMER: "Customer",
  VENDOR: "Vendor",
};

export default function ContactKanban() {
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
    const matchType = typeFilter === "ALL" || c.type === typeFilter;
    const matchSearch =
      (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.mobile || "").toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const customers = filtered.filter(c => c.type === "CUSTOMER");
  const vendors = filtered.filter(c => c.type === "VENDOR");

  const ContactCard = ({ contact }) => {
    const initials = contact.name ? contact.name.substring(0, 2).toUpperCase() : "CO";
    return (
      <div 
        onClick={() => navigate(`/contacts/${contact.id}`)}
        className="group bg-surface-container-lowest p-4 rounded-xl shadow-sm hover:shadow-md border border-outline-variant hover:border-primary/30 transition-all cursor-pointer flex flex-col gap-3"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/20 shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
                {contact.name}
              </h3>
              <p className="text-xs text-on-surface-variant truncate">
                {contact.type === 'CUSTOMER' ? 'Customer' : 'Vendor'}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); }}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical size={16} />
          </button>
        </div>

        <div className="flex flex-col gap-1.5 text-sm text-on-surface-variant">
          <div className="flex items-center gap-2 truncate">
            <Mail size={14} className="shrink-0" />
            <span className="truncate">{contact.email || "—"}</span>
          </div>
          <div className="flex items-center gap-2 truncate">
            <span className="material-symbols-outlined text-[14px] shrink-0">call</span>
            <span className="truncate">{contact.mobile || "—"}</span>
          </div>
          {contact.addressCity && (
            <div className="flex items-center gap-2 truncate">
              <Building2 size={14} className="shrink-0" />
              <span className="truncate">{contact.addressCity}{contact.addressState ? `, ${contact.addressState}` : ''}</span>
            </div>
          )}
        </div>

        <div className="mt-1 pt-3 flex items-center justify-between border-t border-outline-variant">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Active
            </span>
          </div>
        </div>
      </div>
    );
  };

  const handleExport = () => {
    alert("Export feature coming soon!");
  };

  const handleImport = () => {
    alert("Import feature coming soon!");
  };

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

      <main className="flex-grow pt-24 pb-12 px-6 md:px-10 w-full max-w-[120rem] mx-auto min-h-screen flex flex-col">
        <nav className="flex items-center gap-2 text-sm text-on-surface-variant mb-4">
          <Link className="hover:text-primary flex items-center gap-1" to="/dashboard"><ArrowLeft size={15} /> Back to Dashboard</Link>
          <span>/</span>
          <span className="text-on-surface font-medium">Contacts</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-bold text-on-surface">Contacts Kanban</h1>
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
              placeholder="Search contacts by name, email, phone..."
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Action buttons */}
            <button onClick={handleExport} className="px-4 py-2 rounded-full border border-outline-variant text-sm font-medium hover:bg-surface-container text-on-surface-variant transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              Export
            </button>
            <button onClick={handleImport} className="px-4 py-2 rounded-full border border-outline-variant text-sm font-medium hover:bg-surface-container text-on-surface-variant transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">upload</span>
              Import
            </button>

            {/* Type filter */}
            <div className="flex bg-surface-container-low rounded-full p-1 border border-outline-variant gap-1 ml-2">
              {["ALL", "CUSTOMER", "VENDOR"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${typeFilter === t ? "bg-surface shadow-sm text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
                >
                  {t === "ALL" ? "All" : t.charAt(0) + t.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
            
            {/* View Switcher */}
            <div className="flex items-center bg-surface-container-low rounded-lg p-1 border border-outline-variant ml-2">
              <button onClick={() => navigate("/contacts/list")} className="p-1.5 rounded text-on-surface-variant hover:text-on-surface"><LayoutList size={18} /></button>
              <button onClick={() => navigate("/contacts/kanban")} className="p-1.5 rounded bg-surface shadow-sm text-primary"><LayoutDashboard size={18} /></button>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0">
          
          {/* Customers Column */}
          {["ALL", "CUSTOMER"].includes(typeFilter) && (
            <div className="flex flex-col bg-surface-container-low rounded-2xl p-4 border border-outline-variant/50 max-h-full overflow-hidden">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  <h2 className="font-bold text-on-surface">Customers</h2>
                  <span className="px-2 py-0.5 rounded-full bg-surface border border-outline-variant text-xs font-semibold text-on-surface-variant">
                    {customers.length}
                  </span>
                </div>
                {(isAdmin || isAccountant) && (
                  <button onClick={() => navigate("/contacts/new")} className="w-6 h-6 rounded-full bg-surface-container-lowest hover:bg-surface-container border border-outline-variant flex items-center justify-center text-on-surface-variant transition-colors">
                    <Plus size={14} />
                  </button>
                )}
              </div>
              <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3 custom-scrollbar">
                {loading ? (
                  <div className="text-center p-4 text-on-surface-variant text-sm">Loading...</div>
                ) : customers.length === 0 ? (
                  <div className="text-center p-8 text-on-surface-variant text-sm border-2 border-dashed border-outline-variant rounded-xl">No customers found</div>
                ) : (
                  customers.map(c => <ContactCard key={c.id} contact={c} />)
                )}
              </div>
            </div>
          )}

          {/* Vendors Column */}
          {["ALL", "VENDOR"].includes(typeFilter) && (
            <div className="flex flex-col bg-surface-container-low rounded-2xl p-4 border border-outline-variant/50 max-h-full overflow-hidden">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <h2 className="font-bold text-on-surface">Vendors</h2>
                  <span className="px-2 py-0.5 rounded-full bg-surface border border-outline-variant text-xs font-semibold text-on-surface-variant">
                    {vendors.length}
                  </span>
                </div>
                {(isAdmin || isAccountant) && (
                  <button onClick={() => navigate("/contacts/new")} className="w-6 h-6 rounded-full bg-surface-container-lowest hover:bg-surface-container border border-outline-variant flex items-center justify-center text-on-surface-variant transition-colors">
                    <Plus size={14} />
                  </button>
                )}
              </div>
              <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3 custom-scrollbar">
                {loading ? (
                  <div className="text-center p-4 text-on-surface-variant text-sm">Loading...</div>
                ) : vendors.length === 0 ? (
                  <div className="text-center p-8 text-on-surface-variant text-sm border-2 border-dashed border-outline-variant rounded-xl">No vendors found</div>
                ) : (
                  vendors.map(c => <ContactCard key={c.id} contact={c} />)
                )}
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
