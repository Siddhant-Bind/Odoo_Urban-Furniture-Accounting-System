import React, { useState, useEffect } from "react";
import { ArrowLeft, ChevronDown, Kanban, List, Printer, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchClient } from "../utils/api";

// Helper component for inline donut chart
const MiniDonut = ({ percent, color = "#14B8A6" }) => {
  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex items-center gap-2">
      <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 24 24">
        {/* Background Circle */}
        <circle
          cx="12"
          cy="12"
          r={radius}
          stroke="#E2E8F0"
          strokeWidth="3"
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx="12"
          cy="12"
          r={radius}
          stroke={color}
          strokeWidth="3"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <span className="font-label-sm font-semibold text-on-surface-variant">
        {percent}%
      </span>
    </div>
  );
};

export default function BudgetReportList() {
  const navigate = useNavigate();
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetchClient('/budgets').then(data => {
      // Group by budgetName if needed, but since our UI shows individual budgets, we can just display them
      setBudgets(data);
    }).catch(console.error);
  }, []);

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen relative overflow-x-hidden flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-surface-container shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-headline-sm font-bold text-on-surface">
              Budget Report
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/analytical-budget/new")}
            className="px-4 py-2 rounded-full font-label-md font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-colors shadow-sm cursor-pointer inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>New</span>
          </button>

          <div className="relative">
            <select className="appearance-none bg-surface-container-low border border-transparent hover:border-surface-container-high focus:border-primary text-on-surface h-10 px-4 pr-10 rounded-lg font-label-md font-semibold outline-none cursor-pointer transition-all">
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
          </div>
          
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-full font-label-md font-semibold bg-surface-container-high text-on-surface hover:bg-surface-container transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>

          {/* View Toggle */}
          <div className="flex items-center bg-surface-container-low p-1 rounded-lg ml-2">
            <button className="p-1.5 rounded bg-surface-container-lowest shadow-sm text-on-surface cursor-default">
              <List className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate("/budget-report/kanban")}
              className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer"
            >
              <Kanban className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 flex-1 flex flex-col">
        
        {/* Table Container */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="px-6 py-4 font-label-md font-bold text-on-surface-variant border-b border-surface-container">
                    Budget Name
                  </th>
                  <th className="px-6 py-4 font-label-md font-bold text-on-surface-variant border-b border-surface-container">
                    Start Date
                  </th>
                  <th className="px-6 py-4 font-label-md font-bold text-on-surface-variant border-b border-surface-container">
                    End Date
                  </th>
                  <th className="px-6 py-4 font-label-md font-bold text-on-surface-variant border-b border-surface-container">
                    Status
                  </th>
                  <th className="px-6 py-4 font-label-md font-bold text-on-surface-variant border-b border-surface-container">
                    Achieved
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {budgets.map(budget => {
                  const committed = parseFloat(budget.committedAmount) || 0;
                  const achieved = parseFloat(budget.achievedAmount) || 0;
                  const pct = committed > 0 ? (achieved / committed) * 100 : 0;
                  
                  return (
                    <tr key={budget.id} className="hover:bg-surface-container-low/50 transition-colors cursor-pointer group" onClick={() => navigate("/analytical-budget/new")}>
                      <td className="px-6 py-4 text-primary font-semibold group-hover:underline">
                        {budget.budgetName} ({budget.analyticAccount?.name})
                      </td>
                      <td className="px-6 py-4 text-on-surface">{new Date(budget.periodStart).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-on-surface">{new Date(budget.periodEnd).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                          budget.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' :
                          budget.status === 'REVISED' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {budget.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <MiniDonut percent={pct.toFixed(0)} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-surface-container bg-surface-container-lowest text-center">
            <span className="font-body-sm text-on-surface-variant">Showing {budgets.length} records</span>
          </div>
        </div>

      </main>
    </div>
  );
}
