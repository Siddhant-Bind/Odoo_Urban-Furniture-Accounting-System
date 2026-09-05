import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Plus, Settings } from "lucide-react";

const ENTRIES = [
  { id: 1, date: "2025-06-15", number: "JE/2025/0042", partner: "Acme Corp", journal: "Sales", total: "₹1,24,500", status: "Posted" },
  { id: 2, date: "2025-06-18", number: "JE/2025/0043", partner: "TechLogix", journal: "Purchase", total: "₹38,200", status: "Draft" },
];

export default function JournalEntries() {
  const navigate = useNavigate();
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
          <span className="text-[#0F172A] font-medium">Journal Entries</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-bold text-[#0F172A]">Journal Entries</h1>
            <span className="bg-[#F1F5F9] text-[#64748B] px-3 py-1 rounded-full text-xs border border-[#E2E8F0]">{ENTRIES.length} Entries</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-full border border-[#E2E8F0] text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC] transition-colors">Back</button>
            <button onClick={() => navigate("/journal-entries/new")} className="px-5 py-2 rounded-full bg-[#14B8A6] text-white text-sm font-semibold hover:bg-[#0F766E] flex items-center gap-2 shadow-sm transition-all">
              <Plus size={16} /> New Entry
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                <th className="p-4 w-12 text-center"><input type="checkbox" className="w-[18px] h-[18px] rounded border-[#CBD5E1] cursor-pointer" /></th>
                <th className="p-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Number</th>
                <th className="p-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Partner</th>
                <th className="p-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Journal</th>
                <th className="p-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Total</th>
                <th className="p-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-[#E2E8F0]">
              {ENTRIES.map((e) => (
                <tr key={e.id} className="hover:bg-[#CCFBF1]/15 transition-colors cursor-pointer" onClick={() => navigate("/journal-entries/new")}>
                  <td className="p-4 text-center" onClick={ev => ev.stopPropagation()}>
                    <input type="checkbox" className="w-[18px] h-[18px] rounded border-[#CBD5E1] cursor-pointer" />
                  </td>
                  <td className="p-4 text-[#64748B]">{e.date}</td>
                  <td className="p-4 font-mono text-xs font-semibold text-[#14B8A6]">{e.number}</td>
                  <td className="p-4 font-medium text-[#0F172A]">{e.partner}</td>
                  <td className="p-4 text-[#64748B]">{e.journal}</td>
                  <td className="p-4 font-semibold text-[#0F172A]">{e.total}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${e.status === "Posted" ? "bg-[#CCFBF1] text-[#0F766E]" : "bg-[#F1F5F9] text-[#64748B]"}`}>
                      {e.status}
                    </span>
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
