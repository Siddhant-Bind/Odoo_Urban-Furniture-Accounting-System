import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, ChevronDown, LayoutDashboard, LayoutList, Plus, Search, Settings } from "lucide-react";
import { fetchClient } from "../utils/api";

export default function ProductKanban() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClient('/products')
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);
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
                <div className="text-xs font-semibold text-[#0F172A]">USER</div>
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
            <span className="bg-[#F1F5F9] text-[#64748B] px-3 py-1 rounded-full text-xs border border-[#E2E8F0]">{products.length} Products</span>
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
            <div className="flex items-center bg-[#F1F5F9] rounded-lg p-1 border border-[#E2E8F0] ml-auto md:ml-0">
              <button aria-label="List View" onClick={() => navigate("/products/list")} className="p-1.5 rounded text-[#94A3B8] hover:text-[#0F172A] transition-colors" title="List View"><LayoutList size={18} /></button>
              <button aria-label="Kanban View" onClick={() => navigate("/products/kanban")} className="p-1.5 rounded bg-white shadow-sm text-[#14B8A6]" title="Kanban View"><LayoutDashboard size={18} /></button>
            </div>
          </div>
        </div>

        {/* Kanban Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {loading ? (
            <p className="col-span-full text-center text-[#64748B] py-10">Loading products...</p>
          ) : products.map((p) => {
            const initials = p.name ? p.name.substring(0, 2).toUpperCase() : 'PR';
            const isService = p.type === 'SERVICE' || p.type === 'Service';
            const bg = isService ? "bg-purple-50" : "bg-teal-50";
            const text = isService ? "text-purple-600" : "text-teal-600";
            const border = isService ? "border-purple-100" : "border-teal-100";
            return (
            <div key={p.id} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group cursor-pointer" onClick={() => navigate("/products/new")}>
              {/* Image placeholder */}
              <div className={`h-40 ${bg} ${border} border-b flex items-center justify-center`}>
                <div className={`w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center ${text} font-bold text-xl`}>
                  {initials}
                </div>
              </div>
              {/* Card body */}
              <div className="p-4">
                <h3 className="font-semibold text-[#0F172A] text-sm mb-1 truncate">{p.name}</h3>
                <p className="text-xs text-[#94A3B8] mb-4">{p.categoryId || 'N/A'}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-[#94A3B8] uppercase tracking-wide font-medium">Sales Price</p>
                    <p className="text-sm font-bold text-[#0F172A]">₹{Number(p.salesPrice).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-[#94A3B8] uppercase tracking-wide font-medium">Cost</p>
                    <p className="text-sm font-semibold text-[#64748B]">₹{Number(p.cost).toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex justify-end">
                  <button className="text-xs text-[#14B8A6] font-semibold hover:text-[#0F766E] transition-colors opacity-0 group-hover:opacity-100">Edit →</button>
                </div>
              </div>
            </div>
            );
          })}

          {/* Add New Card */}
          <div
            className="bg-white rounded-2xl border-2 border-dashed border-[#CCFBF1] hover:border-[#14B8A6] flex flex-col items-center justify-center h-[260px] cursor-pointer transition-colors group"
            onClick={() => navigate("/products/new")}
          >
            <div className="w-12 h-12 rounded-full bg-[#CCFBF1] flex items-center justify-center mb-3 group-hover:bg-[#14B8A6] transition-colors">
              <Plus size={22} className="text-[#14B8A6] group-hover:text-white transition-colors" />
            </div>
            <p className="text-sm font-semibold text-[#64748B] group-hover:text-[#14B8A6] transition-colors">Add Product</p>
          </div>
        </div>
      </main>
    </>
  );
}
