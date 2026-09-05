import React from "react";
import { ArrowLeft, ChevronDown, Kanban, List, Printer, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
                <tr className="hover:bg-surface-container-low/50 transition-colors cursor-pointer group" onClick={() => navigate("/analytical-budget/new")}>
                  <td className="px-6 py-4 text-primary font-semibold group-hover:underline">
                    Q1 Operational Budget
                  </td>
                  <td className="px-6 py-4 text-on-surface">Jan 01, 2025</td>
                  <td className="px-6 py-4 text-on-surface">Mar 31, 2025</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      Confirmed
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <MiniDonut percent={85} />
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low/50 transition-colors cursor-pointer group" onClick={() => navigate("/analytical-budget/revised")}>
                  <td className="px-6 py-4 text-primary font-semibold group-hover:underline">
                    Q2 Marketing Budget - Revised
                  </td>
                  <td className="px-6 py-4 text-on-surface">Apr 01, 2025</td>
                  <td className="px-6 py-4 text-on-surface">Jun 30, 2025</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      Revised
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <MiniDonut percent={42} />
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low/50 transition-colors cursor-pointer group" onClick={() => navigate("/analytical-budget/new")}>
                  <td className="px-6 py-4 text-primary font-semibold group-hover:underline">
                    Annual R&D Allocation
                  </td>
                  <td className="px-6 py-4 text-on-surface">Jan 01, 2025</td>
                  <td className="px-6 py-4 text-on-surface">Dec 31, 2025</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                      Draft
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <MiniDonut percent={15} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-surface-container bg-surface-container-lowest text-center">
            <span className="font-body-sm text-on-surface-variant">Showing 3 records</span>
          </div>
        </div>

      </main>
    </div>
  );
}
