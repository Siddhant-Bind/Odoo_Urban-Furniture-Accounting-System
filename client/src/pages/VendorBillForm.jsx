import React, { useState, useEffect } from "react";
import { ArrowLeft, Trash2, Plus, ChevronRight, FileText, CheckCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchClient } from "../utils/api";

const initialItem = () => ({
  id: Date.now(),
  productId: "",
  accountId: "",
  analyticAccountId: "",
  qty: 1,
  unitPrice: 0,
});

const STATUS_COLOR = {
  DRAFT: "bg-yellow-100 text-yellow-800",
  POSTED: "bg-blue-100 text-blue-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function VendorBillForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const poId = searchParams.get("poId");

  const [status, setStatus] = useState("DRAFT");
  const [billNo, setBillNo] = useState("New Bill");
  const [billId, setBillId] = useState(null);
  const [poNumber, setPoNumber] = useState(null);
  const [journalOpen, setJournalOpen] = useState(false);
  const [items, setItems] = useState([initialItem()]);
  const [vendorId, setVendorId] = useState("");
  const [billDate, setBillDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState("");
  const [selectedJournalId, setSelectedJournalId] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [journals, setJournals] = useState([]);
  const [analytics, setAnalytics] = useState([]);

  // Load master data
  useEffect(() => {
    Promise.all([
      fetchClient("/contacts"),
      fetchClient("/products"),
      fetchClient("/accounts"),
      fetchClient("/journals"),
      fetchClient("/budgets/analytic-accounts").catch(() => []),
    ]).then(([cData, pData, aData, jData, analyticsData]) => {
      setVendors(cData.filter((c) => c.type === "VENDOR"));
      setProducts(pData);
      setAccounts(aData);
      setJournals(jData);
      setAnalytics(analyticsData);
      // Auto-select PURCHASE journal
      const purchaseJournal = jData.find((j) => j.journalType === "PURCHASE");
      if (purchaseJournal) setSelectedJournalId(purchaseJournal.id.toString());
    }).catch(console.error);
  }, []);

  // Prefill from PO if poId is present
  useEffect(() => {
    if (!poId) return;
    fetchClient(`/purchase/orders/${poId}`)
      .then((po) => {
        setVendorId(po.vendorId?.toString() || "");
        setPoNumber(po.poNumber);
        if (po.lines && po.lines.length > 0) {
          setItems(
            po.lines.map((l) => ({
              id: l.id,
              productId: l.productId?.toString() || "",
              accountId: l.accountId?.toString() || "",
              analyticAccountId: l.analyticAccountId?.toString() || "",
              qty: Number(l.quantity),
              unitPrice: Number(l.unitPrice),
            }))
          );
        }
      })
      .catch(console.error);
  }, [poId]);

  const handleAddLine = () => setItems((p) => [...p, initialItem()]);
  const handleRemoveLine = (rowId) => setItems((p) => p.filter((i) => i.id !== rowId));

  const handleChange = (rowId, field, value) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== rowId) return item;
        const updated = { ...item, [field]: value };
        if (field === "productId") {
          const found = products.find((p) => p.id.toString() === value);
          updated.unitPrice = found ? Number(found.cost) || Number(found.salesPrice) || 0 : 0;
        }
        return updated;
      })
    );
  };

  const grandTotal = items.reduce(
    (sum, i) => sum + (parseFloat(i.qty) || 0) * (parseFloat(i.unitPrice) || 0),
    0
  );

  const handleSave = async () => {
    if (!vendorId) { alert("Please select a vendor."); return; }
    if (!dueDate) { alert("Please enter a due date."); return; }
    if (items.filter((i) => i.productId).length === 0) { alert("Add at least one product line."); return; }

    setSaving(true);
    try {
      const payload = {
        purchaseOrderId: poId ? parseInt(poId, 10) : undefined,
        vendorId: parseInt(vendorId, 10),
        journalId: selectedJournalId ? parseInt(selectedJournalId, 10) : undefined,
        invoiceDate: billDate,
        dueDate,
        lines: items.filter((i) => i.productId).map((i) => ({
          productId: parseInt(i.productId, 10),
          accountId: i.accountId ? parseInt(i.accountId, 10) : null,
          analyticAccountId: i.analyticAccountId ? parseInt(i.analyticAccountId, 10) : null,
          quantity: parseFloat(i.qty) || 1,
          unitPrice: parseFloat(i.unitPrice) || 0,
        })),
      };
      const data = await fetchClient("/purchase/bills", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setBillNo(data.billNumber);
      setBillId(data.id);
      setStatus(data.status);
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleConfirm = async () => {
    if (!billId) { alert("Save the bill first."); return; }
    setConfirming(true);
    try {
      const data = await fetchClient(`/purchase/bills/${billId}/confirm`, { method: "POST" });
      setStatus(data.status);
    } catch (e) {
      alert(e.message);
    } finally {
      setConfirming(false);
    }
  };

  const handlePay = () => {
    if (billId) {
      navigate(`/payments/new?billId=${billId}`);
    } else {
      alert("Save and confirm the bill first.");
    }
  };

  const isReadOnly = status === "POSTED" || status === "CANCELLED";
  const expenseAccount = accounts.find(
    (a) => a.accountType === "EXPENSE"
  );
  const creditorAccount = accounts.find(
    (a) =>
      a.accountType === "LIABILITY" &&
      (a.accountName?.toLowerCase().includes("creditor") || a.accountName?.toLowerCase().includes("payable"))
  );

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-surface-container-lowest/95 backdrop-blur-xl border-b border-surface-container shadow-sm p-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/vendor-bills")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-headline-sm font-bold text-on-surface">Vendor Bill</h1>
            <span className="text-label-sm font-semibold text-on-surface-variant font-mono">
              {billNo}
            </span>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              STATUS_COLOR[status] || "bg-surface-container text-on-surface"
            }`}
          >
            {status}
          </span>
          {/* PO Reference chip */}
          {poNumber && (
            <button
              onClick={() => navigate(`/purchase-orders/${poId}`)}
              className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface text-label-sm font-semibold hover:bg-primary/10 hover:text-primary transition-colors inline-flex items-center gap-1"
            >
              <FileText className="w-3 h-3" />
              {poNumber}
            </button>
          )}
          <button
            onClick={() => navigate("/budget-report")}
            className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface text-label-sm font-semibold hover:bg-primary/10 hover:text-primary transition-colors inline-flex items-center gap-1"
          >
            <FileText className="w-3 h-3" />
            Budget
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Save (new bill) */}
          {!billId && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-full font-label-md font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Bill"}
            </button>
          )}

          {/* Confirm (draft) */}
          {billId && status === "DRAFT" && (
            <button
              onClick={handleConfirm}
              disabled={confirming}
              className="px-4 py-2 rounded-full font-label-md font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-60 flex items-center gap-1"
            >
              <CheckCircle className="w-4 h-4" />
              {confirming ? "Posting..." : "Confirm"}
            </button>
          )}

          {/* Pay (posted) */}
          {status === "POSTED" && (
            <button
              onClick={handlePay}
              className="px-4 py-2 rounded-full font-label-md font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-colors shadow-sm"
            >
              Pay
            </button>
          )}

          <button
            onClick={() => navigate("/vendor-bills")}
            className="px-4 py-2 rounded-full font-label-md font-semibold bg-error-container text-on-error-container hover:bg-error-container/80 transition-colors shadow-sm"
          >
            Cancel
          </button>
        </div>
      </header>

      <div className="flex flex-1 w-full max-w-6xl mx-auto gap-6 p-4 md:p-6 lg:p-8">
        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-6 min-w-0">
          {/* Form Fields */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-label-md font-bold text-on-surface">Bill No.</label>
              <input
                readOnly
                value={billNo}
                className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface-variant font-mono border border-transparent outline-none cursor-default"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-md font-bold text-on-surface">Bill Reference (PO)</label>
              <input
                readOnly
                value={poNumber || (poId ? `PO #${poId}` : "Direct Bill")}
                className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface-variant border border-transparent outline-none cursor-default"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-md font-bold text-on-surface">Vendor Name</label>
              <select
                value={vendorId}
                onChange={(e) => setVendorId(e.target.value)}
                disabled={isReadOnly}
                className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none disabled:opacity-60"
              >
                <option value="">Select Vendor...</option>
                {vendors.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-md font-bold text-on-surface">Status</label>
              <div className="flex items-center h-12">
                <span
                  className={`px-4 py-2 rounded-full font-label-md font-semibold ${
                    STATUS_COLOR[status] || "bg-surface-container text-on-surface"
                  }`}
                >
                  {status}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-md font-bold text-on-surface">Bill Date</label>
              <input
                type="date"
                value={billDate}
                onChange={(e) => setBillDate(e.target.value)}
                disabled={isReadOnly}
                className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none disabled:opacity-60"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-md font-bold text-on-surface">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                disabled={isReadOnly}
                className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none disabled:opacity-60"
              />
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
                    {["#", "Product", "Chart of Account", "Budget Analytics", "Qty", "Unit Price (₹)", "Total (₹)", ""].map((h, i) => (
                      <th key={i} className="px-5 py-4 font-label-md font-bold text-on-surface-variant border-b border-surface-container">
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
                            className="bg-transparent border-b border-surface-container-high focus:border-primary outline-none w-36 disabled:opacity-60"
                          >
                            <option value="">Select...</option>
                            {products.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.productName || p.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-5 py-3">
                          <select
                            value={item.accountId}
                            onChange={(e) => handleChange(item.id, "accountId", e.target.value)}
                            disabled={isReadOnly}
                            className="bg-transparent border-b border-surface-container-high focus:border-primary outline-none w-44 disabled:opacity-60"
                          >
                            <option value="">Purchase Expense (default)</option>
                            {accounts.map((a) => (
                              <option key={a.id} value={a.id}>
                                {a.accountName}
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
                            className="bg-transparent border-b border-surface-container-high focus:border-primary outline-none w-14 text-center disabled:opacity-60"
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
                        <td className="px-5 py-3 text-right font-semibold text-on-surface w-28">
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
              <div className="flex flex-col gap-1 items-end pr-2">
                <div className="flex items-center gap-6 mt-1 pt-2 border-t border-surface-container">
                  <span className="font-label-md font-bold text-on-surface-variant uppercase tracking-wider">
                    Amount Due
                  </span>
                  <span className="text-title-md font-bold text-primary">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </span>
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
              <ChevronRight
                className={`w-4 h-4 text-on-surface-variant transition-transform duration-200 ${
                  journalOpen ? "rotate-90" : ""
                }`}
              />
            </button>
            {journalOpen && (
              <div className="p-4 border-t border-surface-container flex flex-col gap-3">
                <p className="font-label-sm text-on-surface-variant uppercase tracking-wider mb-1">
                  Auto-generated on Confirm
                </p>
                <div className="flex flex-col gap-2 font-body-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-on-surface">
                        {expenseAccount?.accountName || "Purchase Expense A/c"}
                      </p>
                      <p className="text-on-surface-variant text-xs">Dr</p>
                    </div>
                    <span className="font-semibold text-on-surface">₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="h-px bg-surface-container my-1" />
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-on-surface">
                        {creditorAccount?.accountName || "Creditors A/c"}
                      </p>
                      <p className="text-on-surface-variant text-xs">Cr</p>
                    </div>
                    <span className="font-semibold text-on-surface">₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="h-px bg-surface-container my-1" />
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm font-bold text-on-surface-variant">Balance</span>
                    <span className="font-label-sm font-bold text-emerald-700">✓ Balanced</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-2">
                    Journal entry is posted when you click "Confirm".
                  </p>
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
