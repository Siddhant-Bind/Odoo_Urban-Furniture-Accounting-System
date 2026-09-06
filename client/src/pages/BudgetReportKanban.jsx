import React, { useState, useEffect } from "react";
import { ArrowLeft, ChevronDown, Kanban, List, Printer, Plus, Search, PieChart, DollarSign, TrendingUp, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchClient } from "../utils/api";

// Helper component for large donut chart
const LargeDonut = ({ percent, color = "#14B8A6" }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const clampedPercent = Math.min(Math.max(percent, 0), 100);
  const strokeDashoffset = circumference - (clampedPercent / 100) * circumference;

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90 absolute top-0 left-0" viewBox="0 0 80 80">
        {/* Background Circle */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="#F1F5F9"
          strokeWidth="7"
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke={color}
          strokeWidth="7"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="z-10 flex flex-col items-center">
        <span className={`font-headline-sm font-bold leading-tight ${percent > 100 ? "text-error" : "text-on-surface"}`}>
          {percent}%
        </span>
      </div>
    </div>
  );
};

export default function BudgetReportKanban() {
  const navigate = useNavigate();
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    setLoading(true);
    fetchClient('/budgets').then(data => {
      setBudgets(data);
      setLoading(false);
    }).catch(err => {
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
            <p className="text-body-sm text-on-surface-variant">Analytical performance cards</p>
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
            <button 
              onClick={() => navigate("/budget-report")}
              className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer"
              title="List View"
            >
              <List className="w-5 h-5" />
            </button>
            <button className="p-1.5 rounded bg-surface-container-lowest shadow-sm text-primary cursor-default" title="Kanban View">
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

        {loading ? (
          <div className="text-center py-16 text-on-surface-variant">Loading budget cards...</div>
        ) : filteredBudgets.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-2xl border border-surface-container p-12 text-center text-on-surface-variant">
            <p className="font-semibold text-body-lg">No budget records found</p>
            <p className="text-body-sm mt-1">Try adjusting your filters or create a new analytical budget.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBudgets.map(budget => {
              const committed = parseFloat(budget.committedAmount) || 0;
              const achieved = parseFloat(budget.achievedAmount) || 0;
              const variance = committed - achieved;
              const pct = committed > 0 ? (achieved / committed) * 100 : 0;
              const isOver = achieved > committed;
              const chartColor = isOver ? "#EF4444" : pct >= 80 ? "#F59E0B" : "#14B8A6";
              const statusClass = budget.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' :
                                  budget.status === 'REVISED' ? 'bg-blue-100 text-blue-800' :
                                  'bg-yellow-100 text-yellow-800';

              return (
                <div 
                  key={budget.id}
                  onClick={() => navigate("/analytical-budget/new")}
                  className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-6 hover:shadow-md hover:border-surface-container-high transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                       <span className="inline-flex items-center px-2 py-0.5 rounded bg-surface-container text-[11px] font-semibold text-on-surface-variant">
                         {budget.analyticAccount?.name || "General"}
                       </span>
                       <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusClass}`}>
                         {budget.status}
                       </span>
                    </div>

                    <h3 className="font-label-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                      {budget.budgetName}
                    </h3>
                    <p className="font-body-sm text-on-surface-variant text-xs mt-1">
                      {new Date(budget.periodStart).toLocaleDateString()} – {new Date(budget.periodEnd).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center py-5">
                    <LargeDonut percent={parseFloat(pct.toFixed(1))} color={chartColor} />
                  </div>
                  
                  <div className="border-t border-surface-container pt-3 flex flex-col gap-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-on-surface-variant">Committed Target:</span>
                      <span className="font-mono font-bold text-on-surface">₹{committed.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-on-surface-variant">Achieved Total:</span>
                      <span className="font-mono font-bold text-secondary">₹{achieved.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-on-surface-variant">Variance:</span>
                      <span className={`font-mono font-bold ${variance < 0 ? "text-error" : "text-emerald-700"}`}>
                        {variance < 0 ? "-" : "+"}₹{Math.abs(variance).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>
    </div>
  );
}
