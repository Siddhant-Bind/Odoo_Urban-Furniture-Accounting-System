import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Bell, ChevronDown, ChevronRight, LayoutDashboard,
  LayoutList, MoreVertical, Plus, Search, Settings,
} from "lucide-react";

const SAMPLE_PRODUCTS = [
  { id: 1, name: "Air Conditioner", category: "Electronics", type: "Goods", salesPrice: "₹42,500", cost: "₹31,000", initials: "AC", color: "bg-teal-100 text-teal-700" },
  { id: 2, name: "Refrigerator", category: "Electronics", type: "Goods", salesPrice: "₹28,000", cost: "₹19,500", initials: "RF", color: "bg-blue-100 text-blue-700" },
  { id: 3, name: "Oak Dining Table", category: "Furniture", type: "Goods", salesPrice: "₹18,999", cost: "₹11,000", initials: "OT", color: "bg-amber-100 text-amber-700" },
  { id: 4, name: "Annual Maintenance", category: "Services", type: "Service", salesPrice: "₹5,000", cost: "₹1,200", initials: "AM", color: "bg-purple-100 text-purple-700" },
];

export default function ProductList() {
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
              <Link className="text-[#14B8A6] font-semibold border-b-2 border-[#14B8A6] h-16 flex items-center text-sm" to="/products">Account</Link>
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
          <Link className="hover:text-[#14B8A6] flex items-center gap-1" to="/dashboard"><ArrowLeft size={15} /> Back to Dashboard</Link>
          <span>/</span>
          <Link className="hover:text-[#14B8A6]" to="/products">Account</Link>
          <span>/</span>
          <span className="text-[#0F172A] font-medium">Product Catalog</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-bold text-[#0F172A]">Products</h1>
            <span className="bg-[#F1F5F9] text-[#64748B] px-3 py-1 rounded-full text-xs border border-[#E2E8F0]">{SAMPLE_PRODUCTS.length} Products</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="rounded-full border-[1.5px] border-[#14B8A6] text-[#0F766E] bg-transparent px-5 py-2 text-sm font-medium hover:bg-[#CCFBF1]/50 transition-colors">Back</button>
            <button onClick={() => navigate("/products/new")} className="rounded-full bg-[#14B8A6] text-white px-5 py-2 text-sm font-semibold hover:bg-[#0F766E] transition-all flex items-center gap-2 shadow-sm">
              <Plus size={16} /> New Product
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
            <input className="w-full h-10 pl-10 pr-4 rounded-full bg-white border border-[#E2E8F0] text-sm placeholder:text-[#94A3B8] focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20" placeholder="Search products..." type="text" />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="h-10 px-4 rounded-lg bg-white border border-[#E2E8F0] text-sm text-[#0F172A] flex items-center gap-2 hover:bg-[#F8FAFC] whitespace-nowrap">All Categories <ChevronDown size={15} className="text-[#94A3B8]" /></button>
            <button className="h-10 px-4 rounded-lg bg-white border border-[#E2E8F0] text-sm text-[#0F172A] flex items-center gap-2 hover:bg-[#F8FAFC] whitespace-nowrap">All Types <ChevronDown size={15} className="text-[#94A3B8]" /></button>
            <div className="flex items-center bg-[#F1F5F9] rounded-lg p-1 border border-[#E2E8F0] ml-auto md:ml-0">
              <button aria-label="List View" onClick={() => navigate("/products/list")} className="p-1.5 rounded bg-white shadow-sm text-[#14B8A6]" title="List View"><LayoutList size={18} /></button>
              <button aria-label="Kanban View" onClick={() => navigate("/products/kanban")} className="p-1.5 rounded text-[#94A3B8] hover:text-[#0F172A] transition-colors" title="Kanban View"><LayoutDashboard size={18} /></button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <th className="p-4 w-12 text-center"><input type="checkbox" className="w-[18px] h-[18px] rounded border-[#CBD5E1] cursor-pointer" /></th>
                  <th className="p-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Product Name</th>
                  <th className="p-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Category</th>
                  <th className="p-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Type</th>
                  <th className="p-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Sales Price</th>
                  <th className="p-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Cost</th>
                  <th className="p-4 w-12"></th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-[#E2E8F0]">
                {SAMPLE_PRODUCTS.map((p) => (
                  <tr key={p.id} className="hover:bg-[#CCFBF1]/20 transition-colors group">
                    <td className="p-4 text-center"><input type="checkbox" className="w-[18px] h-[18px] rounded border-[#CBD5E1] cursor-pointer" /></td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg ${p.color} flex items-center justify-center font-bold text-xs flex-shrink-0`}>{p.initials}</div>
                        <span className="font-semibold text-[#0F172A]">{p.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-[#64748B]">{p.category}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${p.type === "Service" ? "bg-purple-100 text-purple-700" : "bg-[#CCFBF1] text-[#0F766E]"}`}>{p.type}</span>
                    </td>
                    <td className="p-4 font-semibold text-[#0F172A]">{p.salesPrice}</td>
                    <td className="p-4 text-[#64748B]">{p.cost}</td>
                    <td className="p-4 text-center">
                      <button className="p-1 rounded-full hover:bg-[#E2E8F0] opacity-0 group-hover:opacity-100 transition-all"><MoreVertical size={15} className="text-[#64748B]" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-[#E2E8F0] p-4 flex items-center justify-between text-sm text-[#64748B]">
            <span>Showing 1–{SAMPLE_PRODUCTS.length} of {SAMPLE_PRODUCTS.length} products</span>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F1F5F9] disabled:opacity-40" disabled><ArrowLeft size={14} /></button>
              <button className="w-8 h-8 rounded-full bg-[#14B8A6] text-white font-semibold text-xs flex items-center justify-center">1</button>
              <button className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F1F5F9]"><ChevronRight size={14} /></button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
