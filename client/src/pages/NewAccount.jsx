import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, X } from "lucide-react";

const TYPE_GROUPS = {
  "Balance Sheet": ["Asset", "Liability", "Bank", "Capital", "Cash"],
  "Profit & Loss": ["Income", "Expenses", "Other Expenses"],
};

export default function NewAccount() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", type: "" });

  const handleSave = () => {
    if (form.name && form.type) navigate("/chart-of-accounts");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <Link to="/chart-of-accounts" className="p-1.5 rounded-lg hover:bg-[#E2E8F0] text-[#64748B] transition-colors">
              <ArrowLeft size={16} />
            </Link>
            <div>
              <h2 className="text-sm font-bold text-[#0F172A]">New Account</h2>
              <p className="text-xs text-[#94A3B8]">Chart of Accounts</p>
            </div>
          </div>
          <button onClick={() => navigate("/chart-of-accounts")} className="p-1.5 rounded-lg hover:bg-[#E2E8F0] text-[#94A3B8] transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <div className="px-6 py-6 flex flex-col gap-5">
          {/* Account Name */}
          <div>
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5 block">Account Name <span className="text-red-500">*</span></label>
            <input
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full h-11 px-4 rounded-xl border border-[#E2E8F0] text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 transition-all"
              placeholder="e.g. Petty Cash A/c"
            />
          </div>

          {/* Account Type */}
          <div>
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5 block">Account Type <span className="text-red-500">*</span></label>
            <div className="relative">
              <select
                value={form.type}
                onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                className="w-full h-11 px-4 pr-10 rounded-xl border border-[#E2E8F0] text-sm text-[#0F172A] focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 transition-all appearance-none bg-white cursor-pointer"
              >
                <option value="">Select type...</option>
                {Object.entries(TYPE_GROUPS).map(([group, types]) => (
                  <optgroup key={group} label={group}>
                    {types.map(t => <option key={t} value={t}>{t}</option>)}
                  </optgroup>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
            </div>
          </div>

          {form.type && (
            <div className="p-3 bg-[#CCFBF1]/40 border border-[#CCFBF1] rounded-xl text-xs text-[#0F766E] font-medium">
              This account will appear under <span className="font-bold">{form.type}</span> in your financial reports.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC]">
          <button onClick={() => navigate("/chart-of-accounts")} className="px-5 py-2 rounded-full border border-[#E2E8F0] text-sm font-medium text-[#64748B] hover:bg-white transition-colors">Cancel</button>
          <button
            onClick={handleSave}
            disabled={!form.name || !form.type}
            className="px-5 py-2 rounded-full bg-[#14B8A6] text-white text-sm font-semibold hover:bg-[#0F766E] transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Save Account
          </button>
        </div>
      </div>
    </div>
  );
}
