import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, X } from "lucide-react";

import { fetchClient } from "../utils/api";

export default function NewJournal() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", type: "", account: "" });
  const [acSearch, setAcSearch] = useState("");
  const [showAcDrop, setShowAcDrop] = useState(false);

  const [accounts, setAccounts] = useState([]);

  React.useEffect(() => {
    fetchClient('/accounts').then(setAccounts).catch(console.error);
  }, []);

  const filtered = accounts.filter(a => a.name.toLowerCase().includes(acSearch.toLowerCase()));
  const selectAc = (a) => { setForm(f => ({ ...f, account: a.id })); setAcSearch(a.name); setShowAcDrop(false); };

  const handleSave = async () => {
    if (form.name && form.type) {
      const typeMap = {
        "Sales": "SALE",
        "Purchase": "PURCHASE",
        "Bank": "BANK",
        "Cash": "CASH"
      };

      try {
        await fetchClient('/journals', {
          method: 'POST',
          body: JSON.stringify({
            name: form.name,
            code: form.name.substring(0, 3).toUpperCase(),
            type: typeMap[form.type] || "MISCELLANEOUS",
            defaultAccountId: form.account ? parseInt(form.account, 10) : null
          })
        });
        navigate("/journals");
      } catch (e) {
        alert(e.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <Link to="/journals" className="p-1.5 rounded-lg hover:bg-[#E2E8F0] text-[#64748B] transition-colors"><ArrowLeft size={16} /></Link>
            <div>
              <h2 className="text-sm font-bold text-[#0F172A]">New Journal</h2>
              <p className="text-xs text-[#94A3B8]">Journals</p>
            </div>
          </div>
          <button onClick={() => navigate("/journals")} className="p-1.5 rounded-lg hover:bg-[#E2E8F0] text-[#94A3B8] transition-colors"><X size={16} /></button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-5">
          <div>
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5 block">Journal Name <span className="text-red-500">*</span></label>
            <input
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full h-11 px-4 rounded-xl border border-[#E2E8F0] text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 transition-all"
              placeholder="e.g. Petty Cash Journal"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5 block">Journal Type <span className="text-red-500">*</span></label>
            <div className="relative">
              <select
                value={form.type}
                onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                className="w-full h-11 px-4 pr-10 rounded-xl border border-[#E2E8F0] text-sm text-[#0F172A] focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 transition-all appearance-none bg-white cursor-pointer"
              >
                <option value="">Select type...</option>
                <option>Sales</option>
                <option>Purchase</option>
                <option>Bank</option>
                <option>Cash</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5 block">Default Account</label>
            <div className="relative">
              <input
                value={acSearch}
                onChange={e => { setAcSearch(e.target.value); setShowAcDrop(true); setForm(f => ({ ...f, account: "" })); }}
                onFocus={() => setShowAcDrop(true)}
                onBlur={() => setTimeout(() => setShowAcDrop(false), 180)}
                className="w-full h-11 px-4 pr-10 rounded-xl border border-[#E2E8F0] text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 transition-all"
                placeholder="Search account..."
              />
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
              {showAcDrop && (
                <div className="absolute left-0 right-0 top-12 bg-white border border-[#E2E8F0] rounded-xl shadow-lg z-20 max-h-44 overflow-y-auto">
                  {filtered.length ? filtered.map(a => (
                    <button key={a.id} type="button" onMouseDown={() => selectAc(a)} className="w-full text-left px-4 py-2.5 text-sm text-[#0F172A] hover:bg-[#CCFBF1]/40 transition-colors">{a.name}</button>
                  )) : <p className="px-4 py-3 text-sm text-[#94A3B8]">No accounts found</p>}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC]">
          <button onClick={() => navigate("/journals")} className="px-5 py-2 rounded-full border border-[#E2E8F0] text-sm font-medium text-[#64748B] hover:bg-white transition-colors">Cancel</button>
          <button
            onClick={handleSave}
            disabled={!form.name || !form.type}
            className="px-5 py-2 rounded-full bg-[#14B8A6] text-white text-sm font-semibold hover:bg-[#0F766E] transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Save Journal
          </button>
        </div>
      </div>
    </div>
  );
}
