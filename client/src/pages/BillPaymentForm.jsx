import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CONTACTS = ["Select Partner...", "Alex Morgan", "Sarah Jenkins", "TechSupply Co.", "FurniturePlus Ltd.", "GlobalParts Inc."];

export default function BillPaymentForm() {
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState("Paid");
  const [paymentVia, setPaymentVia] = useState("Cash");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleConfirm = () => {
    // In a real app this would POST to backend
    navigate("/vendor-bills");
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col items-center justify-center p-4">
      {/* Focused Panel / Modal */}
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
              <h1 className="text-title-lg font-bold text-on-surface">Bill Payment</h1>
              <p className="text-body-sm text-on-surface-variant">Register a new payment</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleConfirm}
              className="px-4 py-2 rounded-full font-label-md font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-colors shadow-sm"
            >
              Confirm
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-full font-label-md font-semibold bg-error-container text-on-error-container hover:bg-error-container/80 transition-colors shadow-sm"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Panel Body */}
        <div className="p-6 flex flex-col gap-5">
          {/* Payment Type */}
          <div className="flex flex-col gap-2">
            <label className="font-label-md font-bold text-on-surface">Payment Type</label>
            <div className="flex gap-4">
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
                      <div className="w-2 h-2 rounded-full bg-on-primary"></div>
                    )}
                  </div>
                  <span
                    onClick={() => setPaymentType(type)}
                    className={`font-label-md font-semibold cursor-pointer transition-colors ${
                      paymentType === type ? "text-primary" : "text-on-surface-variant group-hover:text-on-surface"
                    }`}
                  >
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Partner */}
          <div className="flex flex-col gap-2">
            <label className="font-label-md font-bold text-on-surface">Partner</label>
            <select className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none">
              {CONTACTS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Date & Amount */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-label-md font-bold text-on-surface">Date</label>
              <input
                type="date"
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
              {["Cash", "Bank"].map((via) => (
                <button
                  key={via}
                  onClick={() => setPaymentVia(via)}
                  className={`flex-1 h-11 rounded-lg font-label-md font-semibold transition-all border ${
                    paymentVia === via
                      ? "bg-primary text-on-primary border-primary shadow-sm"
                      : "bg-surface-container-low text-on-surface-variant border-surface-container-high hover:border-primary/50 hover:text-on-surface"
                  }`}
                >
                  {via}
                </button>
              ))}
            </div>
          </div>

          {/* Note */}
          <div className="flex flex-col gap-2">
            <label className="font-label-md font-bold text-on-surface">Note</label>
            <textarea
              rows={3}
              placeholder="Optional payment note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-surface-container-low text-on-surface border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none resize-none"
            />
          </div>

          {/* Summary */}
          {amount && (
            <div className="p-4 rounded-xl bg-primary-container/30 border border-primary/20 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-on-surface-variant">Paying {paymentType === "Paid" ? "out" : "in"} via {paymentVia}</span>
                <span className="font-body-sm text-on-surface-variant">to selected partner</span>
              </div>
              <span className="text-title-md font-bold text-primary">₹{parseFloat(amount).toLocaleString("en-IN")}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
