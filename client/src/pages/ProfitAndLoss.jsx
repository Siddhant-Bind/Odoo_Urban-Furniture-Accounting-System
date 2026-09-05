import React, { useState, useEffect } from "react";
import { ArrowLeft, Printer, Calendar, ChevronDown, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchClient } from "../utils/api";

export default function ProfitAndLoss() {
  const navigate = useNavigate();
  const [year, setYear] = useState("2025");
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [reportData, setReportData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netIncome: 0,
    details: { INCOME: [], EXPENSE: [] }
  });

  useEffect(() => {
    // Note: The backend currently doesn't filter by year, but we'll fetch anyway
    fetchClient('/reports/profit-loss')
      .then(data => setReportData(data))
      .catch(console.error);
  }, [year]);

  const { totalIncome, totalExpense: totalExpenses, netIncome, details } = reportData;
  const incomeItems = details.INCOME || [];
  const expenseItems = details.EXPENSE || [];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCSV = () => {
    const csvRows = [
      ["Profit and Loss Report", `FY ${year}`],
      ["Account", "Balance (INR)"],
      ["INCOME"],
      ["Income Accounts", ""],
      ...incomeItems.map(i => [i.name, i.balance]),
      ["Total Income", totalIncome],
      ["EXPENSES"],
      ["Expense Accounts", ""],
      ...expenseItems.map(e => [e.name, e.balance]),
      ["Total Expenses", totalExpenses],
      ["NET INCOME", netIncome],
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Profit_and_Loss_FY${year}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col p-4 md:p-6 lg:p-8 max-w-5xl mx-auto w-full">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 print:hidden">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col gap-1">
            <h1 className="text-headline-md font-bold text-on-surface">Profit and Loss Report</h1>
            <p className="text-body-sm text-on-surface-variant">Financial statement for the selected fiscal year</p>
          </div>
        </div>
        <div className="flex items-center gap-3 relative">
          <div className="relative">
            <button
              onClick={() => setShowYearDropdown((prev) => !prev)}
              className="h-10 px-4 rounded-full border border-surface-container-high bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex items-center gap-2 text-on-surface-variant text-sm font-semibold shadow-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>FY {year}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showYearDropdown && (
              <div className="absolute right-0 mt-2 w-36 bg-surface-container-lowest border border-surface-container rounded-xl shadow-lg z-20 overflow-hidden py-1">
                {["2025", "2024", "2023"].map((y) => (
                  <button
                    key={y}
                    onClick={() => {
                      setYear(y);
                      setShowYearDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-surface-container-low transition-colors ${year === y ? "text-primary font-bold bg-primary/5" : "text-on-surface"}`}
                  >
                    FY {y}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleDownloadCSV}
            className="px-4 py-2.5 rounded-full font-label-md font-semibold bg-surface-container-high text-on-surface hover:bg-surface-container transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
            title="Download CSV"
          >
            <Download className="w-4 h-4" />
            CSV
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-full font-label-md font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            title="Print / Save PDF"
          >
            <Printer className="w-4 h-4" />
            Print / PDF
          </button>
        </div>
      </header>

      {/* Report Statement */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden print:border-none print:shadow-none">
        {/* Printable Title Block */}
        <div className="hidden print:block p-6 border-b border-surface-container text-center">
          <h1 className="text-2xl font-bold text-on-surface">UrbanMart - Profit and Loss Statement</h1>
          <p className="text-sm text-on-surface-variant mt-1">Fiscal Year {year}</p>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-2 px-6 py-4 bg-surface-container-low/50 border-b border-surface-container">
          <span className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider">Account</span>
          <span className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-right">Balance (₹)</span>
        </div>

        <div className="p-6 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h3 className="font-title-md font-bold text-primary mb-2 border-b border-surface-container-high pb-2">Income</h3>
            {incomeItems.length === 0 && (
              <div className="px-4 py-2 text-on-surface-variant text-sm">No posted income entries.</div>
            )}
            {incomeItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center px-4 hover:bg-surface-container-low/40 rounded transition-colors py-1">
                <span className="font-body-md text-on-surface">{item.name}</span>
                <span className="font-semibold text-on-surface">₹{item.balance.toLocaleString("en-IN")}</span>
              </div>
            ))}
            <div className="flex justify-between items-center px-4 pt-3 mt-2 border-t border-surface-container-high">
              <span className="font-label-md font-bold text-on-surface-variant uppercase tracking-wider">Total Income</span>
              <span className="font-title-md font-bold text-on-surface">₹{totalIncome.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Expenses Section */}
          <div className="flex flex-col gap-3">
            <h3 className="font-title-md font-bold text-error mb-2 border-b border-surface-container-high pb-2">Expenses</h3>
            {expenseItems.length === 0 && (
              <div className="px-4 py-2 text-on-surface-variant text-sm">No posted expense entries.</div>
            )}
            {expenseItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center px-4 hover:bg-surface-container-low/40 rounded transition-colors py-1">
                <span className="font-body-md text-on-surface">{item.name}</span>
                <span className="font-semibold text-on-surface">₹{item.balance.toLocaleString("en-IN")}</span>
              </div>
            ))}
            <div className="flex justify-between items-center px-4 pt-3 mt-2 border-t border-surface-container-high">
              <span className="font-label-md font-bold text-on-surface-variant uppercase tracking-wider">Total Expenses</span>
              <span className="font-title-md font-bold text-on-surface">₹{totalExpenses.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* Net Income Row */}
        <div className="bg-primary/10 border-t-2 border-primary p-6 flex justify-between items-center">
          <span className="font-title-lg font-bold text-primary uppercase tracking-wider">Net Income</span>
          <span className="text-headline-sm font-bold text-primary">₹{netIncome.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
  );
}
