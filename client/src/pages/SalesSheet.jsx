import React, { useState, useEffect } from "react";
import { ArrowLeft, Download, Calendar, ChevronDown, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchClient } from "../utils/api";

export default function SalesSheet() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState("This Month");
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    Promise.all([
      fetchClient('/sales/orders'),
      fetchClient('/products')
    ]).then(([ordersData, productsData]) => {
      const prodMap = productsData.reduce((acc, p) => ({ ...acc, [p.id]: p.name }), {});
      
      const flattenedSales = [];
      ordersData.forEach(order => {
        const orderDate = new Date(order.orderDate);
        const currentMonth = new Date().getMonth();
        const orderMonth = orderDate.getMonth();
        let salePeriod = "All Time";
        if (orderMonth === currentMonth) salePeriod = "This Month";
        else if (orderMonth === currentMonth - 1) salePeriod = "Last Month";

        if (order.lines && order.lines.length > 0) {
          order.lines.forEach(line => {
            flattenedSales.push({
              id: order.soNumber,
              date: orderDate.toISOString().split('T')[0],
              customer: order.customer?.name || "Unknown",
              product: prodMap[line.productId] || "Unknown",
              qty: parseFloat(line.quantity),
              amount: parseFloat(line.total),
              status: order.status === 'DRAFT' ? 'Draft' : order.status === 'CONFIRMED' ? 'Confirmed' : 'Cancelled',
              period: salePeriod
            });
          });
        }
      });
      setSales(flattenedSales);
    }).catch(console.error);
  }, []);

  const filteredSales = sales.filter((s) => period === "All Time" || s.period === period);

  const totalSales = filteredSales
    .filter((s) => s.status !== "Cancelled")
    .reduce((sum, s) => sum + s.amount, 0);

  const statusColors = {
    Confirmed: "bg-emerald-100 text-emerald-800",
    Invoiced: "bg-blue-100 text-blue-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  const handleDownloadCSV = () => {
    const csvRows = [
      ["Sales Sheet Report", period],
      ["Date", "Customer", "Product", "Qty", "Amount (INR)", "Status"],
      ...filteredSales.map((s) => [s.date, `"${s.customer}"`, `"${s.product}"`, s.qty, s.amount, s.status]),
      ["Total Sales", "", "", "", totalSales, ""],
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Sales_Sheet_${period.replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 print:hidden">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col gap-1">
            <h1 className="text-headline-md font-bold text-on-surface">Sales Sheet</h1>
            <p className="text-body-sm text-on-surface-variant">Detailed log of all sales transactions</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowPeriodDropdown((prev) => !prev)}
              className="h-10 px-4 rounded-full border border-surface-container-high bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex items-center gap-2 text-on-surface-variant text-sm font-semibold shadow-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{period}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showPeriodDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-surface-container-lowest border border-surface-container rounded-xl shadow-lg z-20 overflow-hidden py-1">
                {["This Month", "Last Month", "All Time"].map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPeriod(p);
                      setShowPeriodDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-surface-container-low transition-colors ${period === p ? "text-primary font-bold bg-primary/5" : "text-on-surface"}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-full font-label-md font-semibold bg-surface-container-high text-on-surface hover:bg-surface-container transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
            title="Print / Save PDF"
          >
            <Printer className="w-4 h-4" />
            Print / PDF
          </button>

          <button
            onClick={handleDownloadCSV}
            className="px-5 py-2.5 rounded-full font-label-md font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            title="Download CSV"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </header>

      {/* Data Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden print:border-none print:shadow-none">
        {/* Printable Header */}
        <div className="hidden print:block p-6 border-b border-surface-container text-center">
          <h1 className="text-2xl font-bold text-on-surface">UrbanMart - Sales Sheet</h1>
          <p className="text-sm text-on-surface-variant mt-1">Period: {period}</p>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-surface-container-low/50">
                {["Date", "Customer", "Product", "Qty", "Amount (₹)", "Status"].map((h) => (
                  <th key={h} className="px-6 py-4 font-label-sm font-bold text-on-surface-variant border-b border-surface-container tracking-wider uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="px-6 py-4 text-on-surface-variant text-sm">{sale.date}</td>
                  <td className="px-6 py-4 font-semibold text-on-surface">{sale.customer}</td>
                  <td className="px-6 py-4 text-on-surface">{sale.product}</td>
                  <td className="px-6 py-4 text-on-surface text-center w-16">{sale.qty}</td>
                  <td className="px-6 py-4 font-semibold text-on-surface w-32">₹{sale.amount.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4 w-32">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${statusColors[sale.status]}`}>
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredSales.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-on-surface-variant">
                    No sales records found for this period.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Total Sales Row */}
        <div className="bg-primary/5 p-6 flex justify-between items-center border-t border-surface-container">
          <span className="font-title-lg font-bold text-on-surface uppercase tracking-wider pl-4">Total Sales</span>
          <span className="text-headline-sm font-bold text-primary pr-28">₹{totalSales.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
  );
}
