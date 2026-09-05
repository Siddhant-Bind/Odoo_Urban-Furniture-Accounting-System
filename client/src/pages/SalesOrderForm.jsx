import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Trash2, Plus, CheckCircle, XCircle, FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchClient } from "../utils/api";

const initialItem = () => ({
  id: Date.now(),
  productId: "",
  analyticAccountId: "",
  qty: 1,
  unitPrice: 0,
});

const STATUS_COLOR = {
  DRAFT: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-emerald-100 text-emerald-800",
  BILLED: "bg-blue-100 text-blue-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function SalesOrderForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // undefined = new, number = existing
  const isNew = !id;

  const [soNumber, setSoNumber] = useState("New SO");
  const [status, setStatus] = useState("DRAFT");
  const [customerId, setCustomerId] = useState("");
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split("T")[0]);
  const [items, setItems] = useState([initialItem()]);
  const [saving, setSaving] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [savedId, setSavedId] = useState(null);

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load master data
  useEffect(() => {
    Promise.all([
      fetchClient("/contacts"),
      fetchClient("/products"),
      fetchClient("/budgets/analytic-accounts").catch(() => []),
    ]).then(([cData, pData, aData]) => {
      setCustomers(cData.filter((c) => c.type === "CUSTOMER"));
      setProducts(pData);
      setAnalytics(aData);
      setLoading(false);
    }).catch((e) => { console.error(e); setLoading(false); });
  }, []);

  // Load existing SO if editing
  useEffect(() => {
    if (!id) return;
    fetchClient(`/sales/orders/${id}`)
      .then((so) => {
        setSoNumber(so.soNumber);
        setStatus(so.status);
        setCustomerId(so.customerId?.toString() || "");
        setOrderDate(so.orderDate ? new Date(so.orderDate).toISOString().split("T")[0] : "");
        setSavedId(so.id);
        if (so.lines && so.lines.length > 0) {
          setItems(
            so.lines.map((l) => ({
              id: l.id,
              productId: l.productId?.toString() || "",
              analyticAccountId: l.analyticAccountId?.toString() || "",
              qty: Number(l.quantity),
              unitPrice: Number(l.unitPrice),
            }))
          );
        }
      })
      .catch(console.error);
  }, [id]);

  const handleAddLine = () => setItems((p) => [...p, initialItem()]);
  const handleRemoveLine = (rowId) => setItems((p) => p.filter((i) => i.id !== rowId));

  const handleChange = (rowId, field, value) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== rowId) return item;
        const updated = { ...item, [field]: value };
        if (field === "productId") {
          const found = products.find((p) => p.id.toString() === value);
          updated.unitPrice = found ? Number(found.salesPrice) || Number(found.cost) || 0 : 0;
        }
        return updated;
      })
    );
  };

  const grandTotal = items.reduce(
    (sum, i) => sum + (parseFloat(i.qty) || 0) * (parseFloat(i.unitPrice) || 0),
    0
  );

  const buildPayload = () => ({
    customerId: parseInt(customerId, 10),
    orderDate,
    lines: items
      .filter((i) => i.productId)
      .map((i) => ({
        productId: parseInt(i.productId, 10),
        analyticAccountId: i.analyticAccountId ? parseInt(i.analyticAccountId, 10) : null,
        quantity: parseFloat(i.qty) || 1,
        unitPrice: parseFloat(i.unitPrice) || 0,
      })),
  });

  const handleSave = async () => {
    if (!customerId) { alert("Please select a customer."); return; }
    if (items.filter((i) => i.productId).length === 0) { alert("Add at least one product line."); return; }
    setSaving(true);
    try {
      const data = await fetchClient("/sales/orders", {
        method: "POST",
        body: JSON.stringify(buildPayload()),
      });
      setSoNumber(data.soNumber);
      setSavedId(data.id);
      setStatus(data.status);
      navigate(`/sales-orders/${data.id}`, { replace: true });
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleConfirm = async () => {
    const currentId = savedId || parseInt(id, 10);
    if (!currentId) { alert("Save the order first."); return; }
    setConfirming(true);
    try {
      const data = await fetchClient(`/sales/orders/${currentId}/confirm`, { method: "POST" });
      setStatus(data.status);
    } catch (e) {
      alert(e.message);
    } finally {
      setConfirming(false);
    }
  };

  const handleCreateInvoice = () => {
    const currentId = savedId || parseInt(id, 10);
    navigate(`/customer-invoices/new?soId=${currentId}`);
  };

  const isReadOnly = status !== "DRAFT";

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-surface-container-lowest/95 backdrop-blur-xl border-b border-surface-container shadow-sm p-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/sales-orders")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-headline-sm font-bold text-on-surface">Sales Order</h1>
            <span className="text-label-sm font-semibold text-on-surface-variant font-mono">
              {soNumber}
            </span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${STATUS_COLOR[status] || "bg-surface-container text-on-surface"}`}>
            {status}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* New SO: Save button */}
          {isNew && !savedId && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-full font-label-md font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Order"}
            </button>
          )}

          {/* Draft SO: Confirm button */}
          {status === "DRAFT" && (savedId || !isNew) && (
            <button
              onClick={handleConfirm}
              disabled={confirming}
              className="px-4 py-2 rounded-full font-label-md font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-60 flex items-center gap-1"
            >
              <CheckCircle className="w-4 h-4" />
              {confirming ? "Confirming..." : "Confirm"}
            </button>
          )}

          {/* Confirmed SO: Create Invoice button */}
          {status === "CONFIRMED" && (
            <button
              onClick={handleCreateInvoice}
              className="px-4 py-2 rounded-full font-label-md font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-1"
            >
              <FileText className="w-4 h-4" />
              Create Invoice
            </button>
          )}

          <button
            onClick={() => navigate("/sales-orders")}
            className="px-4 py-2 rounded-full font-label-md font-semibold bg-surface-container-high text-on-surface hover:bg-surface-container transition-colors shadow-sm"
          >
            Back
          </button>
        </div>
      </header>

      <main className="w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8 flex-1 flex flex-col gap-6">
        {/* Form Fields */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-6 lg:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-label-md font-bold text-on-surface">SO Number</label>
            <input
              readOnly
              value={soNumber}
              className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface-variant font-mono border border-transparent outline-none cursor-default"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-md font-bold text-on-surface">Customer Name</label>
            <select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              disabled={isReadOnly}
              className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none disabled:opacity-60"
            >
              <option value="">Select Customer...</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-md font-bold text-on-surface">SO Date</label>
            <input
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              disabled={isReadOnly}
              className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none disabled:opacity-60"
            />
          </div>
        </div>

        {/* Line Items Table */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden">
          <div className="p-4 md:p-6 border-b border-surface-container flex items-center justify-between">
            <h2 className="text-title-md font-bold text-on-surface">Order Lines</h2>
            <span className="text-body-sm text-on-surface-variant">{items.length} item{items.length !== 1 ? "s" : ""}</span>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
              <thead>
                <tr className="bg-surface-container-low">
                  {["#", "Product", "Budget Analytics", "Qty", "Unit Price (₹)", "Total (₹)", ""].map((h, i) => (
                    <th
                      key={i}
                      className="px-5 py-4 font-label-md font-bold text-on-surface-variant border-b border-surface-container"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {items.map((item, idx) => {
                  const total = (parseFloat(item.qty) || 0) * (parseFloat(item.unitPrice) || 0);
                  return (
                    <tr key={item.id} className="hover:bg-surface-container-low/40 transition-colors">
                      <td className="px-5 py-3 text-on-surface-variant text-sm font-mono">{idx + 1}.</td>
                      <td className="px-5 py-3">
                        <select
                          value={item.productId}
                          onChange={(e) => handleChange(item.id, "productId", e.target.value)}
                          disabled={isReadOnly}
                          className="bg-transparent border-b border-surface-container-high focus:border-primary outline-none w-44 disabled:opacity-60"
                        >
                          <option value="">Select product...</option>
                          {products.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.productName || p.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-3">
                        <select
                          value={item.analyticAccountId}
                          onChange={(e) => handleChange(item.id, "analyticAccountId", e.target.value)}
                          disabled={isReadOnly}
                          className="bg-transparent border-b border-surface-container-high focus:border-primary outline-none w-44 disabled:opacity-60"
                        >
                          <option value="">None</option>
                          {analytics.map((a) => (
                            <option key={a.id} value={a.id}>
                              {a.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-3">
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => handleChange(item.id, "qty", e.target.value)}
                          disabled={isReadOnly}
                          className="bg-transparent border-b border-surface-container-high focus:border-primary outline-none w-16 text-center disabled:opacity-60"
                        />
                      </td>
                      <td className="px-5 py-3">
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => handleChange(item.id, "unitPrice", e.target.value)}
                          disabled={isReadOnly}
                          className="bg-transparent border-b border-surface-container-high focus:border-primary outline-none w-28 text-right font-medium disabled:opacity-60"
                        />
                      </td>
                      <td className="px-5 py-3 text-right font-semibold text-on-surface w-32">
                        ₹{total.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3">
                        {!isReadOnly && (
                          <button
                            onClick={() => handleRemoveLine(item.id)}
                            className="p-1 text-on-surface-variant hover:text-error transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-surface-container flex items-center justify-between">
            {!isReadOnly && (
              <button
                onClick={handleAddLine}
                className="font-label-md font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add a line
              </button>
            )}
            {isReadOnly && <div />}
            <div className="flex items-center gap-6 pr-4">
              <span className="font-label-md font-bold text-on-surface-variant uppercase tracking-wider">Grand Total</span>
              <span className="text-title-md font-bold text-primary">₹{grandTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* Status hint */}
        {isReadOnly && status !== "DRAFT" && (
          <div className="bg-surface-container-low rounded-xl p-4 border border-surface-container text-body-sm text-on-surface-variant">
            This Sales Order is <span className="font-bold text-on-surface">{status}</span> and cannot be edited.
            {status === "CONFIRMED" && (
              <button
                onClick={handleCreateInvoice}
                className="ml-2 text-primary font-semibold hover:underline"
              >
                Create Invoice →
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
