import React, { useState } from "react";
import { ArrowLeft, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PRODUCTS = [
  { id: 1, name: "Air Conditioner", price: 35000 },
  { id: 2, name: "Refrigerator", price: 22000 },
  { id: 3, name: "Washing Machine", price: 18000 },
  { id: 4, name: "LED TV", price: 45000 },
  { id: 5, name: "Office Chair", price: 8000 },
];

const CUSTOMERS = ["Select Customer...", "Acme Corp", "TechNova", "Global Retail", "Home Furnishings Inc", "Jane Doe"];
const ANALYTICS = ["Select Analytics...", "Marketing - Online Ads", "Sales - Software Licenses", "Annual R&D Allocation", "Operations Budget"];

const initialItem = () => ({
  id: Date.now(),
  product: "",
  analytics: "",
  qty: 1,
  unitPrice: 0,
});

export default function SalesOrderForm() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Draft"); // Draft | Confirmed | Invoiced | Cancelled
  const [soNo] = useState("S00001");
  const [items, setItems] = useState([initialItem()]);

  const handleAddLine = () => setItems((p) => [...p, initialItem()]);
  const handleRemoveLine = (id) => setItems((p) => p.filter((i) => i.id !== id));

  const handleChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        if (field === "product") {
          const found = PRODUCTS.find((p) => p.name === value);
          updated.unitPrice = found ? found.price : 0;
        }
        return updated;
      })
    );
  };

  const grandTotal = items.reduce((sum, i) => sum + (parseFloat(i.qty) || 0) * (parseFloat(i.unitPrice) || 0), 0);

  const statusColors = {
    Draft: "bg-yellow-100 text-yellow-800",
    Confirmed: "bg-emerald-100 text-emerald-800",
    Invoiced: "bg-blue-100 text-blue-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-surface-container shadow-sm p-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/sales-orders")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-headline-sm font-bold text-on-surface">Sales Order</h1>
            <span className="text-label-sm font-semibold text-on-surface-variant font-mono">{soNo}</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[status]}`}>{status}</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => navigate("/sales-orders/new")} className="px-4 py-2 rounded-full font-label-md font-semibold bg-surface-container-high text-on-surface hover:bg-surface-container transition-colors shadow-sm">New</button>
          <button onClick={() => setStatus("Confirmed")} className="px-4 py-2 rounded-full font-label-md font-semibold bg-surface-container-high text-on-surface hover:bg-surface-container transition-colors shadow-sm">Confirm</button>
          <button onClick={() => navigate("/customer-invoices/new")} className="px-4 py-2 rounded-full font-label-md font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-colors shadow-sm">Create Invoice</button>
          <button onClick={() => setStatus("Cancelled")} className="px-4 py-2 rounded-full font-label-md font-semibold bg-error-container text-on-error-container hover:bg-error-container/80 transition-colors shadow-sm cursor-pointer">Cancel</button>
        </div>
      </header>

      <main className="w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8 flex-1 flex flex-col gap-6">
        {/* Form Fields */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-6 lg:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-label-md font-bold text-on-surface">SO Number</label>
            <input readOnly value={soNo} className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface-variant font-mono border border-transparent outline-none cursor-default" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-md font-bold text-on-surface">Customer Name</label>
            <select className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none">
              {CUSTOMERS.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-md font-bold text-on-surface">SO Date</label>
            <input type="date" className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" />
          </div>
        </div>

        {/* Line Items Table */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden">
          <div className="p-4 md:p-6 border-b border-surface-container">
            <h2 className="text-title-md font-bold text-on-surface">Order Lines</h2>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
              <thead>
                <tr className="bg-surface-container-low">
                  {["Product", "Budget Analytics", "Qty", "Unit Price (₹)", "Total (₹)", ""].map((h) => (
                    <th key={h} className="px-6 py-4 font-label-md font-bold text-on-surface-variant border-b border-surface-container">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {items.map((item) => {
                  const total = (parseFloat(item.qty) || 0) * (parseFloat(item.unitPrice) || 0);
                  return (
                    <tr key={item.id} className="hover:bg-surface-container-low/40 transition-colors">
                      <td className="px-6 py-3">
                        <select
                          value={item.product}
                          onChange={(e) => handleChange(item.id, "product", e.target.value)}
                          className="bg-transparent border-b border-surface-container-high focus:border-primary outline-none w-40"
                        >
                          <option value="">Select...</option>
                          {PRODUCTS.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                        </select>
                      </td>
                      <td className="px-6 py-3">
                        <select
                          value={item.analytics}
                          onChange={(e) => handleChange(item.id, "analytics", e.target.value)}
                          className="bg-transparent border-b border-surface-container-high focus:border-primary outline-none w-48"
                        >
                          {ANALYTICS.map((a) => <option key={a} value={a}>{a}</option>)}
                        </select>
                      </td>
                      <td className="px-6 py-3">
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => handleChange(item.id, "qty", e.target.value)}
                          className="bg-transparent border-b border-surface-container-high focus:border-primary outline-none w-16 text-center"
                        />
                      </td>
                      <td className="px-6 py-3">
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => handleChange(item.id, "unitPrice", e.target.value)}
                          className="bg-transparent border-b border-surface-container-high focus:border-primary outline-none w-28 text-right font-medium"
                        />
                      </td>
                      <td className="px-6 py-3 text-right font-semibold text-on-surface w-32">
                        ₹{total.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => handleRemoveLine(item.id)} className="p-1 text-on-surface-variant hover:text-error transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-surface-container flex items-center justify-between">
            <button onClick={handleAddLine} className="font-label-md font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1">
              <Plus className="w-4 h-4" /> Add a line
            </button>
            <div className="flex items-center gap-6 pr-4">
              <span className="font-label-md font-bold text-on-surface-variant uppercase tracking-wider">Grand Total</span>
              <span className="text-title-md font-bold text-primary">₹{grandTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
