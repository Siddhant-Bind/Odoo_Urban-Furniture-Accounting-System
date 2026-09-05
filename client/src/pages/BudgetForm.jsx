import React, { useState, useEffect } from "react";
import { ArrowLeft, Check, X, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchClient } from "../utils/api";

export default function BudgetForm() {
  const navigate = useNavigate();

  const [status, setStatus] = useState("Draft");
  const [budgetName, setBudgetName] = useState("");
  const [periodStart, setPeriodStart] = useState("");
  const [periodEnd, setPeriodEnd] = useState("");
  const [responsiblePersonId, setResponsiblePersonId] = useState("");
  const [items, setItems] = useState([
    {
      id: Date.now(),
      account: "",
      committed: 0,
      achieved: 0,
    }
  ]);
  
  const [users, setUsers] = useState([]);
  const [analyticAccounts, setAnalyticAccounts] = useState([]);

  useEffect(() => {
    // In a real app we would fetch users for 'Responsible Person'
    // But since we only have Contacts / Users, we'll fetch /contacts and map them.
    // We'll also fetch analytic accounts
    fetchClient('/budgets/analytic-accounts').then(setAnalyticAccounts).catch(console.error);
    // MOCK users for now as there is no GET /users route exposed
    setUsers([{ id: 1, name: "Admin User" }, { id: 2, name: "Test User" }]);
  }, []);

  const handleAddLine = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        account: "",
        committed: 0,
        achieved: 0,
      },
    ]);
  };

  const handleRemoveLine = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const handleSave = async () => {
    try {
      if (!budgetName || !periodStart || !periodEnd || !responsiblePersonId) {
        alert("Please fill all top-level budget details.");
        return;
      }
      
      const promises = items.filter(i => i.account).map(item => {
        return fetchClient('/budgets', {
          method: 'POST',
          body: JSON.stringify({
            budgetName,
            periodStart,
            periodEnd,
            responsiblePersonId: parseInt(responsiblePersonId, 10),
            analyticAccountId: parseInt(item.account, 10),
            committedAmount: parseFloat(item.committed) || 0
          })
        });
      });

      await Promise.all(promises);
      navigate("/budget-report");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen relative overflow-x-hidden flex flex-col">
      {/* Header Pattern */}
      <header className="sticky top-0 z-10 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-surface-container shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/budget-report")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-headline-sm font-bold text-on-surface">
              New Budget
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/analytical-budget/new")}
            className="px-4 py-2 rounded-full font-label-md font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-colors shadow-sm cursor-pointer"
          >
            New
          </button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded-full font-label-md font-semibold transition-colors shadow-sm cursor-pointer ${
              status === "Confirmed"
                ? "bg-emerald-600 text-white"
                : "bg-surface-container-high text-on-surface hover:bg-surface-container"
            }`}
          >
            Save
          </button>
          <button
            onClick={() => navigate("/analytical-budget/revised")}
            className="px-4 py-2 rounded-full font-label-md font-semibold bg-surface-container-high text-on-surface hover:bg-surface-container transition-colors shadow-sm cursor-pointer"
          >
            Revise
          </button>
          <button
            onClick={() => navigate("/budget-report")}
            className="px-4 py-2 rounded-full font-label-md font-semibold bg-error-container text-on-error-container hover:bg-error-container/80 transition-colors shadow-sm cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </header>

      <main className="w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8 flex-1 flex flex-col gap-6">
        {/* Status Stepper */}
        <div className="w-full bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-container flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-1/2 left-8 right-8 h-1 -translate-y-1/2 bg-surface-container-high z-0"></div>
          <div
            className={`absolute top-1/2 left-8 h-1 -translate-y-1/2 bg-primary z-0 transition-all duration-300 ${
              status === "Draft"
                ? "w-0"
                : status === "Confirmed"
                ? "w-1/3"
                : status === "Revised"
                ? "w-2/3"
                : "w-full"
            }`}
          ></div>

          {/* Stepper items */}
          <div className="flex flex-col items-center gap-2 z-10 bg-surface-container-lowest px-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-surface-container-lowest ${
                status === "Draft" || status === "Confirmed" || status === "Revised"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-high text-on-surface-variant"
              }`}
            >
              1
            </div>
            <span className={`font-label-sm font-semibold ${status === "Draft" ? "text-primary" : "text-on-surface-variant"}`}>Draft</span>
          </div>

          <div className="flex flex-col items-center gap-2 z-10 bg-surface-container-lowest px-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-surface-container-lowest ${
                status === "Confirmed" || status === "Revised"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-high text-on-surface-variant"
              }`}
            >
              2
            </div>
            <span className={`font-label-sm font-semibold ${status === "Confirmed" ? "text-primary" : "text-on-surface-variant"}`}>Confirmed</span>
          </div>

          <div className="flex flex-col items-center gap-2 z-10 bg-surface-container-lowest px-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-surface-container-lowest ${
                status === "Revised"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-high text-on-surface-variant"
              }`}
            >
              3
            </div>
            <span className={`font-label-sm font-semibold ${status === "Revised" ? "text-primary" : "text-on-surface-variant"}`}>Revised</span>
          </div>

          <div className="flex flex-col items-center gap-2 z-10 bg-surface-container-lowest px-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-surface-container-lowest ${
                status === "Cancelled"
                  ? "bg-error-container text-on-error-container"
                  : "bg-surface-container-high text-on-surface-variant"
              }`}
            >
              <X className="w-4 h-4" />
            </div>
            <span className={`font-label-sm font-semibold ${status === "Cancelled" ? "text-error" : "text-on-surface-variant"}`}>Cancelled</span>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-6 lg:p-8 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="flex flex-col gap-2">
              <label className="font-label-md font-bold text-on-surface">
                Budget Name
              </label>
              <input
                type="text"
                value={budgetName}
                onChange={e => setBudgetName(e.target.value)}
                placeholder="e.g. Q2 Marketing Budget"
                className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface border border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-md font-bold text-on-surface">
                Responsible
              </label>
              <select value={responsiblePersonId} onChange={e => setResponsiblePersonId(e.target.value)} className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface border border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all outline-none">
                <option value="">Select a User...</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="font-label-md font-bold text-on-surface">
                Budget Period
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="date"
                  value={periodStart}
                  onChange={e => setPeriodStart(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface border border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all outline-none"
                />
                <span className="text-on-surface-variant font-bold">to</span>
                <input
                  type="date"
                  value={periodEnd}
                  onChange={e => setPeriodEnd(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface border border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Line Items */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden">
          <div className="p-4 md:p-6 border-b border-surface-container flex items-center justify-between">
            <h2 className="text-title-md font-bold text-on-surface">
              Analytics Line Items
            </h2>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="px-6 py-4 font-label-md font-bold text-on-surface-variant border-b border-surface-container">
                    Analytic Account
                  </th>
                  <th className="px-6 py-4 font-label-md font-bold text-on-surface-variant border-b border-surface-container text-right">
                    Committed Amount
                  </th>
                  <th className="px-6 py-4 font-label-md font-bold text-on-surface-variant border-b border-surface-container text-right">
                    Achieved Amount
                  </th>
                  <th className="px-6 py-4 font-label-md font-bold text-on-surface-variant border-b border-surface-container text-right">
                    Achieved %
                  </th>
                  <th className="px-6 py-4 font-label-md font-bold text-on-surface-variant border-b border-surface-container text-right">
                    Amount to Achieve
                  </th>
                  <th className="px-4 py-4 border-b border-surface-container w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {items.map((item) => {
                  const committedNum = parseFloat(item.committed) || 0;
                  const achievedNum = parseFloat(item.achieved) || 0;
                  const pct = committedNum > 0 ? ((achievedNum / committedNum) * 100).toFixed(2) : "0.00";
                  const toAchieve = (committedNum - achievedNum).toFixed(2);

                  return (
                    <tr key={item.id} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="px-6 py-4 text-on-surface font-medium">
                        <select
                          value={item.account}
                          onChange={(e) => handleItemChange(item.id, "account", e.target.value)}
                          className="bg-transparent border-b border-transparent focus:border-primary outline-none w-full"
                        >
                          <option value="">Select Account...</option>
                          {analyticAccounts.map(a => <option key={a.id} value={a.id}>{a.name} ({a.type})</option>)}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-on-surface text-right">
                        <input
                          type="number"
                          value={item.committed}
                          onChange={(e) => handleItemChange(item.id, "committed", e.target.value)}
                          className="bg-transparent border-b border-transparent focus:border-primary outline-none w-full text-right font-medium"
                        />
                      </td>
                      <td className="px-6 py-4 text-on-surface text-right font-medium">
                        <input
                          type="number"
                          value={item.achieved}
                          onChange={(e) => handleItemChange(item.id, "achieved", e.target.value)}
                          className="bg-transparent border-b border-transparent focus:border-primary outline-none w-full text-right font-medium"
                        />
                      </td>
                      <td className="px-6 py-4 text-on-surface text-right">
                        <span className="text-secondary font-bold">{pct}%</span>
                      </td>
                      <td className="px-6 py-4 text-on-surface text-right font-medium">
                        {toAchieve}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => handleRemoveLine(item.id)}
                          className="p-1 hover:text-error text-on-surface-variant transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-surface-container bg-surface-container-lowest flex items-center justify-center">
            <button
              onClick={handleAddLine}
              className="font-label-md font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
            >
              + Add a line
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
