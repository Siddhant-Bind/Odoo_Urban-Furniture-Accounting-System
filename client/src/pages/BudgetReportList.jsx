import React, { useState, useEffect } from "react";
import { ArrowLeft, ChevronDown, Kanban, List, Printer, Plus, Search, Filter, PieChart, TrendingUp, DollarSign, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchClient } from "../utils/api";

// Helper component for inline donut chart
const MiniDonut = ({ percent, color = "#14B8A6" }) => {
  const radius = 11;
  const circumference = 2 * Math.PI * radius;
  const clampedPercent = Math.min(Math.max(percent, 0), 100);
  const strokeDashoffset = circumference - (clampedPercent / 100) * circumference;

  return (
    <div className="flex items-center gap-2.5">
      <svg className="w-7 h-7 transform -rotate-90 shrink-0" viewBox="0 0 28 28">
        {/* Background Circle */}
        <circle
          cx="14"
          cy="14"
          r={radius}
          stroke="#E2E8F0"
          strokeWidth="3.5"
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx="14"
          cy="14"
          r={radius}
          stroke={color}
          strokeWidth="3.5"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <span className={`font-label-sm font-bold ${percent > 100 ? "text-error" : "text-on-surface"}`}>
        {percent}%
      </span>
    </div>
  );
};

export default function BudgetReportList() {
  const navigate = useNavigate();
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    setLoading(true);
    fetchClient('/budgets')
      .then(data => {
        setBudgets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const totalCommitted = budgets.reduce((sum, b) => sum + (parseFloat(b.committedAmount) || 0), 0);
  const totalAchieved = budgets.reduce((sum, b) => sum + (parseFloat(b.achievedAmount) || 0), 0);
  const overallUtilization = totalCommitted > 0 ? ((totalAchieved / totalCommitted) * 100).toFixed(1) : "0.0";

  const filteredBudgets = budgets.filter((b) => {
    const matchStatus = statusFilter === "ALL" || b.status === statusFilter;
    const matchSearch =
      (b.budgetName || "").toLowerCase().includes(search.toLowerCase()) ||
      (b.analyticAccount?.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (b.responsiblePerson?.name || b.responsiblePerson?.loginId || "").toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen relative overflow-x-hidden flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-surface-container shadow-sm p-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-headline-sm font-bold text-on-surface flex items-center gap-2">
              <PieChart className="w-6 h-6 text-primary" />
              Budget Report
            </h1>
            <p className="text-body-sm text-on-surface-variant">Analytical performance and fiscal utilization metrics</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/analytical-budget/new")}
            className="px-5 py-2 rounded-full font-label-md font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-colors shadow-sm cursor-pointer inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Budget</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-full font-label-md font-semibold bg-surface-container-high text-on-surface hover:bg-surface-container transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>

          {/* View Toggle */}
          <div className="flex items-center bg-surface-container-low p-1 rounded-lg ml-2">
            <button className="p-1.5 rounded bg-surface-container-lowest shadow-sm text-primary cursor-default" title="List View">
              <List className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate("/budget-report/kanban")}
              className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer"
              title="Kanban View"
            >
              <Kanban className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 flex-1 flex flex-col gap-6">
        
        {/* KPI Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-surface-container-lowest border border-surface-container rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant">Total Committed</span>
              <p className="text-headline-sm font-bold text-on-surface mt-1">₹{totalCommitted.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-primary-container/40 text-primary flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-surface-container rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant">Total Achieved</span>
              <p className="text-headline-sm font-bold text-secondary mt-1">₹{totalAchieved.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-secondary-container/50 text-secondary flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-surface-container rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant">Fiscal Utilization</span>
              <p className={`text-headline-sm font-bold mt-1 ${parseFloat(overallUtilization) > 100 ? "text-error" : "text-primary"}`}>
                {overallUtilization}%
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-tertiary-fixed/60 text-tertiary flex items-center justify-center">
              <PieChart className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-surface-container rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant">Total Budgets</span>
              <p className="text-headline-sm font-bold text-on-surface mt-1">{budgets.length} Plans</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex bg-surface-container-low p-1 rounded-full shadow-sm border border-surface-container/50 w-full md:w-auto overflow-x-auto">
            {["ALL", "CONFIRMED", "REVISED", "DRAFT"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-full font-label-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  statusFilter === status
                    ? "bg-surface shadow-sm text-primary"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface/50"
                }`}
              >
                {status === "ALL" ? "All Budgets" : status.charAt(0) + status.slice(1).toLowerCase()}
                <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-surface-container-high">
                  {status === "ALL" ? budgets.length : budgets.filter(b => b.status === status).length}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
            <input
              type="text"
              placeholder="Search budgets, accounts, managers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-surface-container-lowest border border-surface-container focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm shadow-sm"
            />
          </div>
        </div>
        
        {/* Main Expanded Table Container Card */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden w-full flex-1 flex flex-col">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-[1000px]">
              <thead>
                <tr className="bg-surface-container-low/60 border-b border-surface-container">
                  <th className="px-6 py-4 font-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                    Budget Name
                  </th>
                  <th className="px-6 py-4 font-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                    Analytic Account
                  </th>
                  <th className="px-6 py-4 font-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                    Responsible
                  </th>
                  <th className="px-6 py-4 font-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-4 font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-right">
                    Committed (₹)
                  </th>
                  <th className="px-6 py-4 font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-right">
                    Achieved (₹)
                  </th>
                  <th className="px-6 py-4 font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-right">
                    Variance (₹)
                  </th>
                  <th className="px-6 py-4 font-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 font-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                    Utilization
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center text-on-surface-variant">
                      Loading budget report...
                    </td>
                  </tr>
                ) : filteredBudgets.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center text-on-surface-variant">
                      <p className="font-semibold text-body-lg">No budget records found</p>
                      <p className="text-body-sm mt-1">Try adjusting your filters or create a new analytical budget.</p>
                    </td>
                  </tr>
                ) : (
                  filteredBudgets.map(budget => {
                    const committed = parseFloat(budget.committedAmount) || 0;
                    const achieved = parseFloat(budget.achievedAmount) || 0;
                    const variance = committed - achieved;
                    const pct = committed > 0 ? (achieved / committed) * 100 : 0;
                    const isOver = achieved > committed;
                    const chartColor = isOver ? "#EF4444" : pct >= 80 ? "#F59E0B" : "#14B8A6";
                    
                    return (
                      <tr 
                        key={budget.id} 
                        className="hover:bg-surface-container-low/50 transition-colors cursor-pointer group" 
                        onClick={() => navigate("/analytical-budget/new")}
                      >
                        <td className="px-6 py-4 text-primary font-semibold group-hover:underline">
                          {budget.budgetName}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container text-xs font-semibold text-on-surface">
                            {budget.analyticAccount?.name || "General"}
                            {budget.analyticAccount?.type && (
                              <span className="text-[10px] text-on-surface-variant">({budget.analyticAccount.type})</span>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-on-surface font-medium text-sm">
                          {budget.responsiblePerson?.name || budget.responsiblePerson?.loginId || "Admin"}
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant text-sm">
                          {new Date(budget.periodStart).toLocaleDateString()} – {new Date(budget.periodEnd).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right font-mono font-semibold text-on-surface">
                          ₹{committed.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4 text-right font-mono font-semibold text-secondary">
                          ₹{achieved.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className={`px-6 py-4 text-right font-mono font-semibold ${variance < 0 ? "text-error" : "text-emerald-700"}`}>
                          {variance < 0 ? "-" : "+"}₹{Math.abs(variance).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                            budget.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' :
                            budget.status === 'REVISED' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {budget.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <MiniDonut percent={parseFloat(pct.toFixed(1))} color={chartColor} />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-surface-container bg-surface-container-lowest flex items-center justify-between text-on-surface-variant font-body-sm px-6">
            <span>Showing {filteredBudgets.length} of {budgets.length} budget records</span>
            <span className="text-xs">Click any record to inspect or adjust</span>
          </div>
        </div>

      </main>
    </div>
  );
}
