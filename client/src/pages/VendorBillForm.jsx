import React, { useState } from "react";
import { ArrowLeft, Trash2, Plus, ChevronDown, ChevronRight, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PRODUCTS = [
  { id: 1, name: "Air Conditioner", price: 35000 },
  { id: 2, name: "Refrigerator", price: 22000 },
  { id: 3, name: "Washing Machine", price: 18000 },
  { id: 4, name: "LED TV", price: 45000 },
  { id: 5, name: "Office Chair", price: 8000 },
];

const VENDORS = ["Select Vendor...", "Alex Morgan", "Sarah Jenkins", "TechSupply Co.", "FurniturePlus Ltd.", "GlobalParts Inc."];
const ANALYTICS = ["Select Analytics...", "Marketing - Online Ads", "Sales - Software Licenses", "Annual R&D Allocation", "Operations Budget"];
const COA = ["Purchase Expense A/c", "Bank A/c", "Cash A/c", "Other Expense A/c"];

const initialItem = () => ({
  id: Date.now(),
  product: "",
  coa: "Purchase Expense A/c",
  analytics: "",
  qty: 1,
  unitPrice: 0,
});

export default function VendorBillForm() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Draft");
  const [billNo] = useState("VB-2025-0001");
  const [journalOpen, setJournalOpen] = useState(false);
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

  const statusOptions = ["Draft", "Posted", "Paid", "Cancelled"];
  const statusColors = {
    Draft: "bg-yellow-100 text-yellow-800",
    Posted: "bg-blue-100 text-blue-800",
    Paid: "bg-emerald-100 text-emerald-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-surface-container shadow-sm p-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/vendor-bills")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-headline-sm font-bold text-on-surface">Vendor Bill</h1>
            <span className="text-label-sm font-semibold text-on-surface-variant font-mono">{billNo}</span>
          </div>
          {/* Reference chips */}
          <button onClick={() => navigate("/purchase-orders/new")} className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface text-label-sm font-semibold hover:bg-primary/10 hover:text-primary transition-colors inline-flex items-center gap-1">
            <FileText className="w-3 h-3" /> PO
          </button>
          <button onClick={() => navigate("/budget-report")} className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface text-label-sm font-semibold hover:bg-primary/10 hover:text-primary transition-colors inline-flex items-center gap-1">
            <FileText className="w-3 h-3" /> Budget
          </button>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => navigate("/vendor-bills/new")} className="px-4 py-2 rounded-full font-label-md font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-colors shadow-sm">New</button>
          <button onClick={() => setStatus("Posted")} className="px-4 py-2 rounded-full font-label-md font-semibold bg-surface-container-high text-on-surface hover:bg-surface-container transition-colors shadow-sm">Confirm</button>
          <button onClick={() => navigate("/payments/new")} className="px-4 py-2 rounded-full font-label-md font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-colors shadow-sm">Pay</button>
          <button onClick={() => setStatus("Cancelled")} className="px-4 py-2 rounded-full font-label-md font-semibold bg-error-container text-on-error-container hover:bg-error-container/80 transition-colors shadow-sm cursor-pointer">Cancel</button>
        </div>
      </header>

      <div className="flex flex-1 w-full max-w-6xl mx-auto gap-6 p-4 md:p-6 lg:p-8">
        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-6 min-w-0">
          {/* Form Fields */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-label-md font-bold text-on-surface">Bill No.</label>
              <input readOnly value={billNo} className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface-variant font-mono border border-transparent outline-none cursor-default" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-md font-bold text-on-surface">Bill Reference</label>
              <input type="text" placeholder="e.g. INV/2025/0001" className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-md font-bold text-on-surface">Vendor Name</label>
              <select className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none">
                {VENDORS.map((v) => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-md font-bold text-on-surface">Status</label>
              <div className="flex gap-2 flex-wrap">
                {statusOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`px-4 py-2 rounded-full font-label-md font-semibold transition-colors ${status === s ? statusColors[s] : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-md font-bold text-on-surface">Bill Date</label>
              <input type="date" className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-md font-bold text-on-surface">Due Date</label>
              <input type="date" className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" />
            </div>
          </div>

          {/* Line Items Table */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden">
            <div className="p-4 md:p-6 border-b border-surface-container">
              <h2 className="text-title-md font-bold text-on-surface">Bill Lines</h2>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
                <thead>
                  <tr className="bg-surface-container-low">
                    {["Product", "Chart of Account", "Budget Analytics", "Qty", "Unit Price (₹)", "Total (₹)", ""].map((h) => (
                      <th key={h} className="px-5 py-4 font-label-md font-bold text-on-surface-variant border-b border-surface-container">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {items.map((item) => {
                    const total = (parseFloat(item.qty) || 0) * (parseFloat(item.unitPrice) || 0);
                    return (
                      <tr key={item.id} className="hover:bg-surface-container-low/40 transition-colors">
                        <td className="px-5 py-3">
                          <select
                            value={item.product}
                            onChange={(e) => handleChange(item.id, "product", e.target.value)}
                            className="bg-transparent border-b border-surface-container-high focus:border-primary outline-none w-36"
                          >
                            <option value="">Select...</option>
                            {PRODUCTS.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                          </select>
                        </td>
                        <td className="px-5 py-3">
                          <select
                            value={item.coa}
                            onChange={(e) => handleChange(item.id, "coa", e.target.value)}
                            className="bg-transparent border-b border-surface-container-high focus:border-primary outline-none w-44"
                          >
                            {COA.map((c) => <option key={c}>{c}</option>)}
                          </select>
                        </td>
                        <td className="px-5 py-3">
                          <select
                            value={item.analytics}
                            onChange={(e) => handleChange(item.id, "analytics", e.target.value)}
                            className="bg-transparent border-b border-surface-container-high focus:border-primary outline-none w-44"
                          >
                            {ANALYTICS.map((a) => <option key={a}>{a}</option>)}
                          </select>
                        </td>
                        <td className="px-5 py-3">
                          <input
                            type="number"
                            min="1"
                            value={item.qty}
                            onChange={(e) => handleChange(item.id, "qty", e.target.value)}
                            className="bg-transparent border-b border-surface-container-high focus:border-primary outline-none w-14 text-center"
                          />
                        </td>
                        <td className="px-5 py-3">
                          <input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => handleChange(item.id, "unitPrice", e.target.value)}
                            className="bg-transparent border-b border-surface-container-high focus:border-primary outline-none w-28 text-right font-medium"
                          />
                        </td>
                        <td className="px-5 py-3 text-right font-semibold text-on-surface w-28">
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
              <div className="flex flex-col gap-1 items-end pr-2">
                <div className="flex items-center gap-8 text-on-surface-variant font-body-sm">
                  <span>Paid via Cash</span>
                  <span className="font-semibold text-on-surface">₹0</span>
                </div>
                <div className="flex items-center gap-8 text-on-surface-variant font-body-sm">
                  <span>Paid via Bank</span>
                  <span className="font-semibold text-on-surface">₹0</span>
                </div>
                <div className="flex items-center gap-6 mt-1 pt-2 border-t border-surface-container">
                  <span className="font-label-md font-bold text-on-surface-variant uppercase tracking-wider">Amount Due</span>
                  <span className="text-title-md font-bold text-primary">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Journal Entry Side Panel */}
        <aside className="w-72 shrink-0 hidden lg:flex flex-col">
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden sticky top-24">
            <button
              onClick={() => setJournalOpen((o) => !o)}
              className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors"
            >
              <span className="font-label-md font-bold text-on-surface">Journal Entry Preview</span>
              <ChevronRight className={`w-4 h-4 text-on-surface-variant transition-transform duration-200 ${journalOpen ? "rotate-90" : ""}`} />
            </button>
            {journalOpen && (
              <div className="p-4 border-t border-surface-container flex flex-col gap-3">
                <p className="font-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Auto-generated (read-only)</p>
                <div className="flex flex-col gap-2 font-body-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-on-surface">Purchase Expense A/c</p>
                      <p className="text-on-surface-variant text-xs">Dr</p>
                    </div>
                    <span className="font-semibold text-on-surface">₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="h-px bg-surface-container my-1"></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-on-surface">Creditors A/c</p>
                      <p className="text-on-surface-variant text-xs">Cr</p>
                    </div>
                    <span className="font-semibold text-on-surface">₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="h-px bg-surface-container my-1"></div>
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm font-bold text-on-surface-variant">Balance</span>
                    <span className="font-label-sm font-bold text-emerald-700">✓ Balanced</span>
                  </div>
                </div>
              </div>
            )}
            {!journalOpen && (
              <p className="px-4 pb-4 text-body-sm text-on-surface-variant">
                Click to preview the auto-generated journal entry for this bill.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
