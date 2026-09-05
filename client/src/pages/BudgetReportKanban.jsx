import React from "react";
import { ArrowLeft, ChevronDown, Kanban, List, Printer, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Helper component for large donut chart
const LargeDonut = ({ percent, color = "#14B8A6" }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90 absolute top-0 left-0" viewBox="0 0 80 80">
        {/* Background Circle */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="#F1F5F9"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="z-10 flex flex-col items-center">
        <span className="font-headline-sm font-bold text-on-surface leading-tight">
          {percent}%
        </span>
      </div>
    </div>
  );
};

export default function BudgetReportKanban() {
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
            <button 
              onClick={() => navigate("/budget-report")}
              className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer"
            >
              <List className="w-5 h-5" />
            </button>
            <button className="p-1.5 rounded bg-surface-container-lowest shadow-sm text-on-surface cursor-default">
              <Kanban className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 flex-1 flex flex-col">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div 
            onClick={() => navigate("/analytical-budget/new")}
            className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-6 hover:shadow-md hover:border-surface-container-high transition-all cursor-pointer group flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
               <div>
                 <h3 className="font-label-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                   Q1 Operational Budget
                 </h3>
                 <p className="font-body-sm text-on-surface-variant mt-1">Jan 01 - Mar 31, 2025</p>
               </div>
               <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                 Confirmed
               </span>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center py-4">
              <LargeDonut percent={85} />
            </div>
            
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-surface-container">
               <div className="flex-1 flex flex-col">
                 <span className="font-label-sm text-on-surface-variant text-[11px] uppercase tracking-wider">Achieved</span>
                 <span className="font-numeric-md font-bold text-on-surface mt-1">$42,500</span>
               </div>
               <div className="w-px h-8 bg-surface-container mx-1"></div>
               <div className="flex-1 flex flex-col text-center">
                 <span className="font-label-sm text-on-surface-variant text-[11px] uppercase tracking-wider">Budget</span>
                 <span className="font-numeric-md font-bold text-on-surface mt-1">$50,000</span>
               </div>
               <div className="w-px h-8 bg-surface-container mx-1"></div>
               <div className="flex-1 flex flex-col text-right">
                 <span className="font-label-sm text-on-surface-variant text-[11px] uppercase tracking-wider">Committed</span>
                 <span className="font-numeric-md font-bold text-on-surface mt-1">$50,000</span>
               </div>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => navigate("/analytical-budget/revised")}
            className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-6 hover:shadow-md hover:border-surface-container-high transition-all cursor-pointer group flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
               <div>
                 <h3 className="font-label-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                   Q2 Marketing Budget - Revised
                 </h3>
                 <p className="font-body-sm text-on-surface-variant mt-1">Apr 01 - Jun 30, 2025</p>
               </div>
               <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 shrink-0 ml-2">
                 Revised
               </span>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center py-4">
              <LargeDonut percent={42} />
            </div>
            
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-surface-container">
               <div className="flex-1 flex flex-col">
                 <span className="font-label-sm text-on-surface-variant text-[11px] uppercase tracking-wider">Achieved</span>
                 <span className="font-numeric-md font-bold text-on-surface mt-1">$73,500</span>
               </div>
               <div className="w-px h-8 bg-surface-container mx-1"></div>
               <div className="flex-1 flex flex-col text-center">
                 <span className="font-label-sm text-on-surface-variant text-[11px] uppercase tracking-wider">Budget</span>
                 <span className="font-numeric-md font-bold text-on-surface mt-1">$175,000</span>
               </div>
               <div className="w-px h-8 bg-surface-container mx-1"></div>
               <div className="flex-1 flex flex-col text-right">
                 <span className="font-label-sm text-on-surface-variant text-[11px] uppercase tracking-wider">Committed</span>
                 <span className="font-numeric-md font-bold text-on-surface mt-1">$175,000</span>
               </div>
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => navigate("/analytical-budget/new")}
            className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-6 hover:shadow-md hover:border-surface-container-high transition-all cursor-pointer group flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
               <div>
                 <h3 className="font-label-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                   Annual R&D Allocation
                 </h3>
                 <p className="font-body-sm text-on-surface-variant mt-1">Jan 01 - Dec 31, 2025</p>
               </div>
               <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-yellow-100 text-yellow-800 shrink-0 ml-2">
                 Draft
               </span>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center py-4">
              <LargeDonut percent={15} />
            </div>
            
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-surface-container">
               <div className="flex-1 flex flex-col">
                 <span className="font-label-sm text-on-surface-variant text-[11px] uppercase tracking-wider">Achieved</span>
                 <span className="font-numeric-md font-bold text-on-surface mt-1">$30,000</span>
               </div>
               <div className="w-px h-8 bg-surface-container mx-1"></div>
               <div className="flex-1 flex flex-col text-center">
                 <span className="font-label-sm text-on-surface-variant text-[11px] uppercase tracking-wider">Budget</span>
                 <span className="font-numeric-md font-bold text-on-surface mt-1">$200,000</span>
               </div>
               <div className="w-px h-8 bg-surface-container mx-1"></div>
               <div className="flex-1 flex flex-col text-right">
                 <span className="font-label-sm text-on-surface-variant text-[11px] uppercase tracking-wider">Committed</span>
                 <span className="font-numeric-md font-bold text-on-surface mt-1">$200,000</span>
               </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
