import React, { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchClient } from "../utils/api";

export default function InvoicePaymentForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedInvoiceId = searchParams.get("invoiceId");

  const [paymentType, setPaymentType] = useState("Received");
  const [paymentVia, setPaymentVia] = useState("BANK");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState("");
  const [invoiceId, setInvoiceId] = useState(preselectedInvoiceId || "");
  const [invoices, setInvoices] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchClient("/sales/invoices")
      .then((data) => {
        // Show only POSTED (confirmed) invoices that are not yet fully paid
        const posted = data.filter((inv) => inv.status === "POSTED");
        setInvoices(posted);
        // If preselected, auto-fill amount
        if (preselectedInvoiceId) {
          const found = posted.find(
            (inv) => inv.id.toString() === preselectedInvoiceId.toString()
          );
          if (found) setAmount(found.totalAmount?.toString() || "");
        }
      })
      .catch(console.error);
  }, [preselectedInvoiceId]);

  // When invoice changes, auto-fill amount
  const handleInvoiceChange = (val) => {
    setInvoiceId(val);
    const found = invoices.find((inv) => inv.id.toString() === val);
    if (found) setAmount(found.totalAmount?.toString() || "");
  };

  const selectedInvoice = invoices.find((inv) => inv.id.toString() === invoiceId.toString());

  const handleConfirm = async () => {
    if (!invoiceId) { alert("Please select an invoice."); return; }
    if (!amount || parseFloat(amount) <= 0) { alert("Please enter a valid amount."); return; }

    setSubmitting(true);
    try {
      await fetchClient(`/sales/invoices/${invoiceId}/pay`, {
        method: "POST",
        body: JSON.stringify({
          amount: parseFloat(amount),
          paymentVia,
          paymentDate: new Date(paymentDate).toISOString(),
        }),
      });
      setSuccess(true);
    } catch (e) {
      alert(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-xl border border-surface-container p-8 flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-title-lg font-bold text-on-surface">Payment Recorded!</h2>
          <p className="text-body-md text-on-surface-variant">
            ₹{parseFloat(amount).toLocaleString("en-IN")} payment has been registered against{" "}
            <span className="font-semibold text-on-surface">{selectedInvoice?.invoiceNumber}</span>.
          </p>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => navigate("/customer-invoices")}
              className="px-5 py-2.5 rounded-full font-label-md font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-colors"
            >
              Back to Invoices
            </button>
            <button
              onClick={() => {
                setSuccess(false);
                setInvoiceId("");
                setAmount("");
              }}
              className="px-5 py-2.5 rounded-full font-label-md font-semibold bg-surface-container-high text-on-surface hover:bg-surface-container transition-colors"
            >
              New Payment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col items-center justify-center p-4">
      {/* Focused Panel */}
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-xl border border-surface-container overflow-hidden">
        {/* Panel Header */}
        <div className="bg-surface-container-low border-b border-surface-container p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-title-lg font-bold text-on-surface">Invoice Payment</h1>
              <p className="text-body-sm text-on-surface-variant">Register receipt from customer</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Status pills (read-only display) */}
            <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold">
              Draft
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold">
              Confirm
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              Cancelled
            </span>
          </div>
        </div>

        {/* Panel Body */}
        <div className="p-6 flex flex-col gap-5">
          {/* Payment Type */}
          <div className="flex flex-col gap-2">
            <label className="font-label-md font-bold text-on-surface">Payment Type</label>
            <div className="flex gap-6">
              {["Paid", "Received"].map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer group">
                  <div
                    onClick={() => setPaymentType(type)}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                      paymentType === type
                        ? "border-primary bg-primary"
                        : "border-surface-container-high bg-surface-container-low group-hover:border-primary/50"
                    }`}
                  >
                    {paymentType === type && (
                      <div className="w-2 h-2 rounded-full bg-on-primary" />
                    )}
                  </div>
                  <span
                    onClick={() => setPaymentType(type)}
                    className={`font-label-md font-semibold cursor-pointer transition-colors ${
                      paymentType === type
                        ? "text-primary"
                        : "text-on-surface-variant group-hover:text-on-surface"
                    }`}
                  >
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Invoice selection */}
          <div className="flex flex-col gap-2">
            <label className="font-label-md font-bold text-on-surface">Customer Invoice</label>
            <select
              value={invoiceId}
              onChange={(e) => handleInvoiceChange(e.target.value)}
              className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
            >
              <option value="">Select an invoice...</option>
              {invoices.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.invoiceNumber} — ₹{inv.totalAmount} ({inv.customer?.name || "—"})
                </option>
              ))}
            </select>
            {invoices.length === 0 && (
              <p className="text-xs text-on-surface-variant mt-1">
                No confirmed (posted) invoices found. Confirm an invoice first.
              </p>
            )}
          </div>

          {/* Date & Amount */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-label-md font-bold text-on-surface">Payment Date</label>
              <input
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-md font-bold text-on-surface">Amount (₹)</label>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none text-right font-semibold"
              />
            </div>
          </div>

          {/* Payment Via */}
          <div className="flex flex-col gap-2">
            <label className="font-label-md font-bold text-on-surface">Payment Via</label>
            <div className="flex gap-2">
              {[{ label: "Cash", val: "CASH" }, { label: "Bank", val: "BANK" }].map(({ label, val }) => (
                <button
                  key={val}
                  onClick={() => setPaymentVia(val)}
                  className={`flex-1 h-11 rounded-lg font-label-md font-semibold transition-all border ${
                    paymentVia === val
                      ? "bg-primary text-on-primary border-primary shadow-sm"
                      : "bg-surface-container-low text-on-surface-variant border-surface-container-high hover:border-primary/50 hover:text-on-surface"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Note */}
          <div className="flex flex-col gap-2">
            <label className="font-label-md font-bold text-on-surface">Note</label>
            <textarea
              rows={2}
              placeholder="Optional payment note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-surface-container-low text-on-surface border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none resize-none"
            />
          </div>

          {/* Summary */}
          {amount && parseFloat(amount) > 0 && (
            <div className="p-4 rounded-xl bg-primary-container/30 border border-primary/20 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-on-surface-variant">
                  Receiving via {paymentVia === "CASH" ? "Cash" : "Bank"}
                </span>
                <span className="font-body-sm text-on-surface-variant">
                  from {selectedInvoice?.customer?.name || "customer"}
                </span>
              </div>
              <span className="text-title-md font-bold text-primary">
                ₹{parseFloat(amount).toLocaleString("en-IN")}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleConfirm}
              disabled={submitting}
              className="flex-1 h-12 rounded-xl font-label-md font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-60"
            >
              {submitting ? "Processing..." : "Confirm Payment"}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex-1 h-12 rounded-xl font-label-md font-semibold bg-surface-container-high text-on-surface hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
