import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, ChevronDown, ChevronRight, LayoutDashboard, LayoutList, MoreVertical, Plus, Search, Settings } from "lucide-react";
import { fetchClient } from "../utils/api";
import useAuth from "../utils/useAuth";

export default function ProductList() {
  const navigate = useNavigate();
  const { isAdmin, isAccountant } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchClient("/products")
      .then((data) => {
        setProducts(data);
        // Build unique category list
        const cats = [...new Set(data.map((p) => p.category).filter(Boolean))];
        setCategories(cats);
        setLoading(false);
      })
      .catch((err) => { console.error(err); setLoading(false); });
  }, []);

  const filtered = products.filter((p) => {
    const matchCat = categoryFilter === "ALL" || p.category === categoryFilter;
    const matchSearch =
      (p.productName || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.category || "").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <header className="bg-surface-container-lowest border-b border-outline-variant shadow-sm z-50 fixed w-full top-0 h-16">
        <div className="flex items-center justify-between px-6 lg:px-10 w-full max-w-[120rem] mx-auto h-16">
          <div className="flex items-center gap-8">
            <div className="w-[120px] h-[36px] bg-surface-container-low border border-outline-variant rounded-lg flex items-center justify-center">
              <span className="font-bold text-primary text-sm tracking-wide uppercase">UrbanMart</span>
            </div>
            <nav className="hidden md:flex items-center h-16 gap-6">
              {(isAdmin || isAccountant) && <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm" to="/sales-orders">Sales</Link>}
              {(isAdmin || isAccountant) && <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm" to="/purchase-orders">Purchase</Link>}
              <Link className="text-primary font-semibold border-b-2 border-primary h-16 flex items-center text-sm" to="/products">Account</Link>
              {(isAdmin || isAccountant) && <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm" to="/balance-sheet">Report</Link>}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-on-surface-variant hover:text-primary p-2 rounded-full hover:bg-surface-container"><Bell size={18} /></button>
            <button className="text-on-surface-variant hover:text-primary p-2 rounded-full hover:bg-surface-container"><Settings size={18} /></button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6 md:px-10 w-full max-w-[120rem] mx-auto">
        <nav className="flex items-center gap-2 text-sm text-on-surface-variant mb-4">
          <Link className="hover:text-primary flex items-center gap-1" to="/dashboard"><ArrowLeft size={15} /> Back to Dashboard</Link>
          <span>/</span>
          <span className="text-on-surface font-medium">Product Catalog</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-bold text-on-surface">Products</h1>
            <span className="bg-surface-container-low text-on-surface-variant px-3 py-1 rounded-full text-xs border border-outline-variant">{filtered.length} of {products.length}</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="rounded-full border-[1.5px] border-primary text-primary bg-transparent px-5 py-2 text-sm font-medium hover:bg-primary/10 transition-colors">Back</button>
            {(isAdmin || isAccountant) && (
              <button onClick={() => navigate("/products/new")} className="rounded-full bg-primary text-on-primary px-5 py-2 text-sm font-semibold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-sm">
                <Plus size={16} /> New Product
              </button>
            )}
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-full bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:border-primary outline-none transition-all"
              placeholder="Search products..."
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-10 px-3 rounded-lg bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:border-primary outline-none"
            >
              <option value="ALL">All Categories</option>
              {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <div className="flex items-center bg-surface-container-low rounded-lg p-1 border border-outline-variant ml-auto md:ml-0">
              <button onClick={() => navigate("/products")} className="p-1.5 rounded bg-surface shadow-sm text-primary"><LayoutList size={18} /></button>
              <button onClick={() => navigate("/products/kanban")} className="p-1.5 rounded text-on-surface-variant hover:text-on-surface transition-colors"><LayoutDashboard size={18} /></button>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low/50">
                  <th className="p-4 w-12 text-center"><input type="checkbox" className="w-[18px] h-[18px] rounded border-outline-variant cursor-pointer" /></th>
                  <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Product Name</th>
                  <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Category</th>
                  <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Type</th>
                  <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Sales Price</th>
                  <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Cost</th>
                  <th className="p-4 w-12"></th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-outline-variant">
                {loading ? (
                  <tr><td colSpan="7" className="p-8 text-center text-on-surface-variant">Loading products...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan="7" className="p-8 text-center text-on-surface-variant">No products found</td></tr>
                ) : filtered.map((p) => {
                  const initials = (p.productName || "PR").substring(0, 2).toUpperCase();
                  const isService = p.type === "SERVICE";
                  const typeColor = isService ? "bg-purple-50 text-purple-700" : "bg-emerald-50 text-emerald-700";
                  const avatarColor = isService ? "bg-purple-100 text-purple-700" : "bg-emerald-100 text-emerald-700";
                  return (
                    <tr key={p.id} className="hover:bg-primary/5 transition-colors group cursor-pointer" onClick={() => navigate(`/products/${p.id}`)}>
                      <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}><input type="checkbox" className="w-[18px] h-[18px] rounded border-outline-variant cursor-pointer" /></td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg ${avatarColor} flex items-center justify-center font-bold text-xs flex-shrink-0`}>{initials}</div>
                          <span className="font-semibold text-on-surface">{p.productName}</span>
                        </div>
                      </td>
                      <td className="p-4 text-on-surface-variant">{p.category || "—"}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${typeColor}`}>{p.type}</span>
                      </td>
                      <td className="p-4 font-semibold text-on-surface">₹{Number(p.salesPrice || 0).toLocaleString("en-IN")}</td>
                      <td className="p-4 text-on-surface-variant">₹{Number(p.cost || 0).toLocaleString("en-IN")}</td>
                      <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <button className="p-1 rounded-full hover:bg-surface-container opacity-0 group-hover:opacity-100 transition-all"><MoreVertical size={15} className="text-on-surface-variant" /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="border-t border-outline-variant p-4 flex items-center justify-between text-sm text-on-surface-variant">
            <span>Showing {filtered.length} of {products.length} products</span>
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
