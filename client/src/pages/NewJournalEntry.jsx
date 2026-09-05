import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Bell, ChevronDown, Plus, Settings, Trash2, X } from "lucide-react";

const ACCOUNTS = ["Bank A/c", "Cash A/c", "Sales Income A/c", "Purchase Expense A/c", "Debtors A/c", "Creditors A/c", "Capital A/c", "Other Expense A/c"];
const PARTNERS = ["Acme Corp", "TechLogix", "Global Partners", "Wright Logistics", "Sarah Jenkins", "Marcus Vance"];
const JOURNALS = ["Sales", "Purchase", "Bank", "Cash"];

const emptyLine = () => ({ id: Date.now() + Math.random(), account: "", partner: "", debit: "", credit: "" });

export default function NewJournalEntry() {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [journal, setJournal] = useState("");
  const [lines, setLines] = useState([emptyLine(), emptyLine()]);

  const addLine = () => setLines(l => [...l, emptyLine()]);
  const removeLine = (id) => setLines(l => l.filter(r => r.id !== id));
  const updateLine = (id, field, value) => setLines(l => l.map(r => r.id === id ? { ...r, [field]: value } : r));

  const totalDebit = lines.reduce((s, r) => s + (parseFloat(r.debit) || 0), 0);
  const totalCredit = lines.reduce((s, r) => s + (parseFloat(r.credit) || 0), 0);
  const balanced = totalDebit > 0 && totalDebit === totalCredit;
  const hasValues = totalDebit > 0 || totalCredit > 0;

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

      <main className="pt-24 pb-16 px-6 md:px-10 w-full max-w-[120rem] mx-auto">
        <nav className="flex items-center gap-2 text-sm text-[#64748B] mb-4">
          <Link className="hover:text-[#14B8A6] flex items-center gap-1" to="/journal-entries"><ArrowLeft size={15} /> Journal Entries</Link>
          <span>/</span>
          <span className="text-[#0F172A] font-medium">New Entry</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A]">New Journal Entry</h1>
            <p className="text-sm text-[#64748B] mt-0.5">Record a double-entry accounting transaction</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/journal-entries")} className="px-4 py-2 rounded-full border border-[#E2E8F0] text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC] flex items-center gap-1.5 transition-colors">
              <X size={14} /> Cancel
            </button>
            <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-full border border-[#E2E8F0] text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC] transition-colors">Back</button>
            <button
              disabled={!balanced || !date || !journal}
              onClick={() => navigate("/journal-entries")}
              className="px-5 py-2 rounded-full bg-[#14B8A6] text-white text-sm font-semibold hover:bg-[#0F766E] transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Post Entry
            </button>
          </div>
        </div>

        {/* Header fields */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5 block">Accounting Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-[#E2E8F0] text-sm text-[#0F172A] focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5 block">Journal <span className="text-red-500">*</span></label>
              <div className="relative">
                <select
                  value={journal}
                  onChange={e => setJournal(e.target.value)}
                  className="w-full h-11 px-4 pr-10 rounded-xl border border-[#E2E8F0] text-sm text-[#0F172A] focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 appearance-none bg-white cursor-pointer transition-all"
                >
                  <option value="">Select journal...</option>
                  {JOURNALS.map(j => <option key={j}>{j}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Validation banner */}
        {hasValues && !balanced && (
          <div className="flex items-center gap-3 p-4 mb-5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            <AlertTriangle size={18} className="text-red-500 flex-shrink-0" />
            <div>
              <span className="font-semibold">Debit and Credit totals don&apos;t match.</span>
              <span className="ml-1 text-red-600">The entry can only be posted when debits equal credits.</span>
            </div>
          </div>
        )}
        {balanced && (
          <div className="flex items-center gap-3 p-4 mb-5 bg-[#CCFBF1]/60 border border-[#CCFBF1] rounded-xl text-sm text-[#0F766E]">
            <span className="font-semibold">Balanced ✓</span> Debit and Credit totals match — ready to post.
          </div>
        )}

        {/* Journal Lines Table */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <th className="p-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider w-[28%]">Account</th>
                  <th className="p-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider w-[24%]">Partner</th>
                  <th className="p-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider w-[18%]">Debit (₹)</th>
                  <th className="p-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider w-[18%]">Credit (₹)</th>
                  <th className="p-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {lines.map((line, idx) => (
                  <tr key={line.id} className="group">
                    <td className="p-2">
                      <div className="relative">
                        <select
                          value={line.account}
                          onChange={e => updateLine(line.id, "account", e.target.value)}
                          className="w-full h-9 px-3 pr-8 rounded-lg border border-[#E2E8F0] text-sm text-[#0F172A] focus:border-[#14B8A6] focus:outline-none appearance-none bg-white cursor-pointer"
                        >
                          <option value="">Select account...</option>
                          {ACCOUNTS.map(a => <option key={a}>{a}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="relative">
                        <select
                          value={line.partner}
                          onChange={e => updateLine(line.id, "partner", e.target.value)}
                          className="w-full h-9 px-3 pr-8 rounded-lg border border-[#E2E8F0] text-sm text-[#0F172A] focus:border-[#14B8A6] focus:outline-none appearance-none bg-white cursor-pointer"
                        >
                          <option value="">Select partner...</option>
                          {PARTNERS.map(p => <option key={p}>{p}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
                      </div>
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={line.debit}
                        onChange={e => updateLine(line.id, "debit", e.target.value)}
                        className="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-sm text-right font-mono text-[#0F172A] focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={line.credit}
                        onChange={e => updateLine(line.id, "credit", e.target.value)}
                        className="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-sm text-right font-mono text-[#0F172A] focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="p-2 text-center">
                      {lines.length > 2 && (
                        <button onClick={() => removeLine(line.id)} className="p-1 rounded-full hover:bg-red-50 text-[#94A3B8] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-[#E2E8F0] bg-[#F8FAFC]">
                  <td className="p-3 text-xs font-bold text-[#64748B] uppercase tracking-wider" colSpan={2}>Totals</td>
                  <td className={`p-3 text-right font-mono font-bold text-sm ${!balanced && hasValues ? "text-red-600" : "text-[#0F172A]"}`}>
                    ₹{totalDebit.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                  <td className={`p-3 text-right font-mono font-bold text-sm ${!balanced && hasValues ? "text-red-600" : "text-[#0F172A]"}`}>
                    ₹{totalCredit.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="p-3 border-t border-[#E2E8F0]">
            <button onClick={addLine} className="flex items-center gap-1.5 text-sm text-[#14B8A6] font-semibold hover:text-[#0F766E] transition-colors px-2 py-1 rounded-lg hover:bg-[#CCFBF1]/40">
              <Plus size={15} /> Add Line
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
