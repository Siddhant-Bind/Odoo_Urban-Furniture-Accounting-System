import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Check, ChevronDown, Image, Plus, Settings, X } from "lucide-react";

const CATEGORIES = ["Electronics", "Furniture", "Services", "Kitchen Appliances", "Office Supplies", "Outdoor"];

export default function CreateProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", type: "", category: "", salesPrice: "", cost: "" });
  const [imagePreview, setImagePreview] = useState(null);
  const [catSearch, setCatSearch] = useState("");
  const [showCatDrop, setShowCatDrop] = useState(false);
  const [customCats, setCustomCats] = useState([]);

  const allCats = [...CATEGORIES, ...customCats];
  const filteredCats = allCats.filter(c => c.toLowerCase().includes(catSearch.toLowerCase()));
  const canCreate = catSearch.trim() && !allCats.some(c => c.toLowerCase() === catSearch.toLowerCase());

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const selectCat = (cat) => { setForm(f => ({...f, category: cat})); setCatSearch(cat); setShowCatDrop(false); };
  const createCat = () => { const t = catSearch.trim(); setCustomCats(c => [...c, t]); selectCat(t); };

  return (
    <>
      <header className="bg-white border-b border-[#E2E8F0] shadow-sm z-50 fixed w-full top-0 h-16">
        <div className="flex items-center justify-between px-6 lg:px-10 w-full max-w-[120rem] mx-auto h-16">
          <div className="flex items-center gap-8">
            <div className="w-[120px] h-[36px] bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg flex items-center justify-center">
              <span className="font-bold text-[#14B8A6] text-sm tracking-wide uppercase">UrbanMart</span>
            </div>
            <nav className="hidden md:flex items-center h-16 gap-6">
              <Link className="text-[#64748B] font-medium hover:text-[#14B8A6] text-sm" to="/sales-orders">Sales</Link>
              <Link className="text-[#64748B] font-medium hover:text-[#14B8A6] text-sm" to="/purchase-orders">Purchase</Link>
              <Link className="text-[#14B8A6] font-semibold border-b-2 border-[#14B8A6] h-16 flex items-center text-sm" to="/products">Account</Link>
              <Link className="text-[#64748B] font-medium hover:text-[#14B8A6] text-sm" to="/balance-sheet">Report</Link>
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

      <main className="pt-24 pb-16 px-6 md:px-10 w-full max-w-[120rem] mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#64748B] mb-4">
          <Link className="hover:text-[#14B8A6] flex items-center gap-1" to="/dashboard"><ArrowLeft size={15} /> Back to Dashboard</Link>
          <span>/</span>
          <Link className="hover:text-[#14B8A6]" to="/products/list">Product Catalog</Link>
          <span>/</span>
          <span className="text-[#0F172A] font-medium">New Product</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A]">Create Product</h1>
            <p className="text-sm text-[#64748B] mt-1">Add a new product to your catalog with pricing and classification.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="rounded-full border-[1.5px] border-[#E2E8F0] text-[#64748B] bg-transparent px-5 py-2 text-sm font-medium hover:bg-[#F8FAFC] transition-colors flex items-center gap-2">
              <X size={15} /> Discard
            </button>
            <button onClick={async () => {
              try {
                const { fetchClient } = await import('../utils/api');
                await fetchClient('/products', {
                  method: 'POST',
                  body: JSON.stringify({
                    name: form.name,
                    type: form.type === 'Service' ? 'SERVICE' : 'GOODS',
                    salesPrice: form.salesPrice || "0",
                    cost: form.cost || "0",
                    // The backend might need categoryId, but for now we skip it if it's optional or not strict
                  })
                });
                navigate("/products/list");
              } catch (e) {
                alert(e.message);
              }
            }} className="rounded-full bg-[#14B8A6] text-white px-6 py-2 text-sm font-semibold hover:bg-[#0F766E] transition-all flex items-center gap-2 shadow-sm">
              <Check size={15} /> Confirm
            </button>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — Main Fields */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
              <h2 className="text-sm font-semibold text-[#0F172A] uppercase tracking-wider mb-5">Basic Information</h2>
              <div className="flex flex-col gap-5">

                {/* Product Name */}
                <div>
                  <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5 block">Product Name <span className="text-red-500">*</span></label>
                  <input
                    value={form.name}
                    onChange={e => setForm(f => ({...f, name: e.target.value}))}
                    className="w-full h-11 px-4 rounded-xl border border-[#E2E8F0] text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 transition-all"
                    placeholder="e.g. Air Conditioner 1.5 Ton"
                  />
                </div>

                {/* Product Type */}
                <div>
                  <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5 block">Product Type <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      value={form.type}
                      onChange={e => setForm(f => ({...f, type: e.target.value}))}
                      className="w-full h-11 px-4 pr-10 rounded-xl border border-[#E2E8F0] text-sm text-[#0F172A] focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 transition-all appearance-none bg-white cursor-pointer"
                    >
                      <option value="">Select type...</option>
                      <option value="Goods">Goods</option>
                      <option value="Service">Service</option>
                      <option value="Combo">Combo</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
                  </div>
                </div>

                {/* Category — searchable + inline create */}
                <div>
                  <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5 block">Category</label>
                  <div className="relative">
                    <input
                      value={catSearch}
                      onChange={e => { setCatSearch(e.target.value); setShowCatDrop(true); setForm(f => ({...f, category: ""})); }}
                      onFocus={() => setShowCatDrop(true)}
                      onBlur={() => setTimeout(() => setShowCatDrop(false), 180)}
                      className="w-full h-11 px-4 pr-10 rounded-xl border border-[#E2E8F0] text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 transition-all"
                      placeholder="Search or create category..."
                    />
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
                    {showCatDrop && (
                      <div className="absolute left-0 right-0 top-12 bg-white border border-[#E2E8F0] rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto">
                        {filteredCats.map(c => (
                          <button key={c} type="button" onMouseDown={() => selectCat(c)}
                            className="w-full text-left px-4 py-2.5 text-sm text-[#0F172A] hover:bg-[#CCFBF1]/40 transition-colors">
                            {c}
                          </button>
                        ))}
                        {canCreate && (
                          <button type="button" onMouseDown={createCat}
                            className="w-full text-left px-4 py-2.5 text-sm text-[#14B8A6] font-semibold hover:bg-[#CCFBF1]/40 flex items-center gap-2 border-t border-[#E2E8F0]">
                            <Plus size={14} /> Create "{catSearch.trim()}"
                          </button>
                        )}
                        {filteredCats.length === 0 && !canCreate && (
                          <p className="px-4 py-3 text-sm text-[#94A3B8]">No categories found</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
              <h2 className="text-sm font-semibold text-[#0F172A] uppercase tracking-wider mb-5">Pricing</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5 block">Sales Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#64748B] font-medium">₹</span>
                    <input
                      value={form.salesPrice}
                      onChange={e => setForm(f => ({...f, salesPrice: e.target.value}))}
                      className="w-full h-11 pl-8 pr-4 rounded-xl border border-[#E2E8F0] text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 transition-all"
                      placeholder="0.00"
                      type="number"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5 block">Cost</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#64748B] font-medium">₹</span>
                    <input
                      value={form.cost}
                      onChange={e => setForm(f => ({...f, cost: e.target.value}))}
                      className="w-full h-11 pl-8 pr-4 rounded-xl border border-[#E2E8F0] text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 transition-all"
                      placeholder="0.00"
                      type="number"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
              {form.salesPrice && form.cost && parseFloat(form.salesPrice) > parseFloat(form.cost) && (
                <div className="mt-4 p-3 bg-[#CCFBF1] rounded-xl text-xs text-[#0F766E] font-medium">
                  Margin: ₹{(parseFloat(form.salesPrice) - parseFloat(form.cost)).toLocaleString("en-IN")} ({((1 - parseFloat(form.cost)/parseFloat(form.salesPrice))*100).toFixed(1)}%)
                </div>
              )}
            </div>
          </div>

          {/* Right — Image Upload */}
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
              <h2 className="text-sm font-semibold text-[#0F172A] uppercase tracking-wider mb-5">Product Image</h2>
              <label className="block cursor-pointer group">
                <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
                {imagePreview ? (
                  <div className="relative rounded-xl overflow-hidden border border-[#E2E8F0] aspect-square">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs font-semibold">Click to change</p>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-[#CCFBF1] group-hover:border-[#14B8A6] rounded-xl aspect-square flex flex-col items-center justify-center gap-3 transition-colors p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-[#CCFBF1] flex items-center justify-center group-hover:bg-[#14B8A6] transition-colors">
                      <Image size={24} className="text-[#14B8A6] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">Upload Image</p>
                      <p className="text-xs text-[#94A3B8] mt-1">PNG, JPG up to 5MB</p>
                    </div>
                    <span className="mt-1 text-xs text-[#14B8A6] font-semibold border border-[#14B8A6] px-4 py-1.5 rounded-full group-hover:bg-[#14B8A6] group-hover:text-white transition-all">Browse Files</span>
                  </div>
                )}
              </label>
            </div>

            {/* Summary card */}
            <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-5">
              <h3 className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">Summary</h3>
              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between"><span className="text-[#94A3B8]">Name</span><span className="font-medium text-[#0F172A] truncate max-w-[140px]">{form.name || "—"}</span></div>
                <div className="flex justify-between"><span className="text-[#94A3B8]">Type</span><span className="font-medium text-[#0F172A]">{form.type || "—"}</span></div>
                <div className="flex justify-between"><span className="text-[#94A3B8]">Category</span><span className="font-medium text-[#0F172A]">{form.category || "—"}</span></div>
                <div className="flex justify-between"><span className="text-[#94A3B8]">Sales Price</span><span className="font-semibold text-[#14B8A6]">{form.salesPrice ? `₹${parseFloat(form.salesPrice).toLocaleString("en-IN")}` : "—"}</span></div>
                <div className="flex justify-between"><span className="text-[#94A3B8]">Cost</span><span className="font-medium text-[#0F172A]">{form.cost ? `₹${parseFloat(form.cost).toLocaleString("en-IN")}` : "—"}</span></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
