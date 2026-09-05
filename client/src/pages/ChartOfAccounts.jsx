import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Lock, MoreVertical, Plus, Settings } from "lucide-react";

const DEFAULT_ACCOUNTS = [
  { id: 1, name: "Bank A/c", type: "Assets", system: true },
  { id: 2, name: "Cash A/c", type: "Assets", system: true },
  { id: 3, name: "Debtors A/c", type: "Assets", system: true },
  { id: 4, name: "Purchase Expense A/c", type: "Expenses", system: true },
  { id: 5, name: "Other Expense A/c", type: "Expenses", system: true },
  { id: 6, name: "Creditors A/c", type: "Liability", system: true },
  { id: 7, name: "Sales Income A/c", type: "Income", system: true },
  { id: 8, name: "Capital A/c", type: "Capital", system: true },
];

const TYPE_COLORS = {
  Assets: "bg-blue-50 text-blue-700",
  Expenses: "bg-rose-50 text-rose-700",
  Liability: "bg-orange-50 text-orange-700",
  Income: "bg-green-50 text-green-700",
  Capital: "bg-purple-50 text-purple-700",
  Bank: "bg-sky-50 text-sky-700",
  Cash: "bg-teal-50 text-teal-700",
};

export default function ChartOfAccounts() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState(DEFAULT_ACCOUNTS);
  const [showArchived, setShowArchived] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-[#E2E8F0] shadow-sm z-50 fixed w-full top-0 h-16">
        <div className="flex items-center justify-between px-6 lg:px-10 w-full max-w-[120rem] mx-auto h-16">
          <div className="flex items-center gap-8">
            <div className="w-[120px] h-[36px] bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg flex items-center justify-center">
              <span className="font-bold text-[#14B8A6] text-sm tracking-wide uppercase">UrbanMart</span>
            </div>
            <nav className="hidden md:flex items-center h-16 gap-6">
              <Link className="text-[#64748B] font-medium hover:text-[#14B8A6] transition-colors text-sm" to="/sales-orders">Sales</Link>
              <Link className="text-[#64748B] font-medium hover:text-[#14B8A6] transition-colors text-sm" to="/purchase-orders">Purchase</Link>
              <Link className="text-[#14B8A6] font-semibold border-b-2 border-[#14B8A6] h-16 flex items-center text-sm" to="/dashboard">Account</Link>
              <Link className="text-[#64748B] font-medium hover:text-[#14B8A6] transition-colors text-sm" to="/balance-sheet">Report</Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-[#64748B] hover:text-[#14B8A6] p-2 rounded-full hover:bg-[#F1F5F9]"><Bell size={18} /></button>
            <button className="text-[#64748B] hover:text-[#14B8A6] p-2 rounded-full hover:bg-[#F1F5F9]"><Settings size={18} /></button>
            <div className="flex items-center gap-2 pl-3 border-l border-[#E2E8F0]">
              <div className="w-8 h-8 rounded-full bg-[#14B8A6] flex items-center justify-center text-white text-sm font-bold">A</div>
              <div className="hidden sm:block">
                <div className="text-xs font-semibold text-[#0F172A]">Alex Morgan</div>
                <div className="text-[11px] text-[#64748B]">Administrator</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6 md:px-10 w-full max-w-[120rem] mx-auto">
        <nav className="flex items-center gap-2 text-sm text-[#64748B] mb-4">
          <Link className="hover:text-[#14B8A6] flex items-center gap-1" to="/dashboard"><ArrowLeft size={15} /> Dashboard</Link>
          <span>/</span>
          <span className="text-[#0F172A] font-medium">Chart of Accounts</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-bold text-[#0F172A]">Chart of Accounts</h1>
            <span className="bg-[#F1F5F9] text-[#64748B] px-3 py-1 rounded-full text-xs border border-[#E2E8F0]">{accounts.length} Accounts</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowArchived(a => !a)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${showArchived ? "border-[#14B8A6] bg-[#CCFBF1] text-[#0F766E]" : "border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]"}`}
            >
              {showArchived ? "Hide Archived" : "Archived"}
            </button>
            <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-full border border-[#E2E8F0] text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC] transition-colors">Back</button>
            <button
              onClick={() => navigate("/chart-of-accounts/new")}
              className="px-5 py-2 rounded-full bg-[#14B8A6] text-white text-sm font-semibold hover:bg-[#0F766E] flex items-center gap-2 shadow-sm transition-all"
            >
              <Plus size={16} /> New Account
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                <th className="p-4 w-12 text-center"><input type="checkbox" className="w-[18px] h-[18px] rounded border-[#CBD5E1] cursor-pointer" /></th>
                <th className="p-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Account Name</th>
                <th className="p-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Type</th>
                <th className="p-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Status</th>
                <th className="p-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-[#E2E8F0]">
              {accounts.map((acc) => (
                <tr key={acc.id} className="hover:bg-[#CCFBF1]/15 transition-colors group">
                  <td className="p-4 text-center"><input type="checkbox" className="w-[18px] h-[18px] rounded border-[#CBD5E1] cursor-pointer" /></td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {acc.system && <Lock size={13} className="text-[#94A3B8] flex-shrink-0" />}
                      <span className="font-medium text-[#0F172A]">{acc.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${TYPE_COLORS[acc.type] || "bg-gray-100 text-gray-600"}`}>{acc.type}</span>
                  </td>
                  <td className="p-4">
                    {acc.system
                      ? <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">System Default</span>
                      : <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#CCFBF1] text-[#0F766E]">Custom</span>
                    }
                  </td>
                  <td className="p-4 text-center">
                    {!acc.system && (
                      <button className="p-1 rounded-full hover:bg-[#E2E8F0] opacity-0 group-hover:opacity-100 transition-all"><MoreVertical size={15} className="text-[#64748B]" /></button>
                    )}
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
