/**
 * MOCK DATA — Invoices / Sales / Purchase
 * ─────────────────────────────────────────────────────────────────────────────
 * When the backend is ready, DELETE this file and replace all imports with
 * real API calls (e.g. GET /api/invoices, GET /api/sales-orders).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const MOCK_INVOICES = [
  { id: "INV-2025-0001", customer: "Acme Corp", date: "2025-09-01", due: "2025-09-15", total: 45000, status: "Paid" },
  { id: "INV-2025-0002", customer: "TechNova", date: "2025-09-02", due: "2025-09-16", total: 12000, status: "Confirmed" },
  { id: "INV-2025-0003", customer: "Global Retail", date: "2025-09-04", due: "2025-09-18", total: 8500, status: "Draft" },
  { id: "INV-2025-0004", customer: "Jane Doe", date: "2025-09-05", due: "2025-09-19", total: 22000, status: "Confirmed" },
];

export const MOCK_SALES = [
  { id: "S00001", date: "2025-09-01", customer: "Acme Corp", product: "Air Conditioner", qty: 2, amount: 70000, status: "Invoiced", period: "This Month" },
  { id: "S00002", date: "2025-09-02", customer: "TechNova", product: "Refrigerator", qty: 1, amount: 22000, status: "Confirmed", period: "This Month" },
  { id: "S00003", date: "2025-09-04", customer: "Global Retail", product: "Washing Machine", qty: 3, amount: 54000, status: "Cancelled", period: "This Month" },
  { id: "S00004", date: "2025-09-05", customer: "Jane Doe", product: "LED TV", qty: 1, amount: 45000, status: "Invoiced", period: "This Month" },
  { id: "S00005", date: "2025-08-15", customer: "Home Furnishings Inc", product: "Office Chair", qty: 5, amount: 40000, status: "Invoiced", period: "Last Month" },
  { id: "S00006", date: "2025-08-20", customer: "Acme Corp", product: "LED TV", qty: 2, amount: 90000, status: "Confirmed", period: "Last Month" },
];

export const MOCK_PURCHASE_ORDERS = [
  { id: "P00001", vendor: "Global Retail", date: "2025-09-01", total: 85000, status: "Confirmed" },
  { id: "P00002", vendor: "Home Furnishings Inc", date: "2025-09-03", total: 42000, status: "Draft" },
];

export const MOCK_BUDGET_ANALYTICS = [
  "Marketing - Online Ads",
  "Sales - Software Licenses",
  "Annual R&D Allocation",
  "Operations Budget",
];

export const MOCK_CHART_OF_ACCOUNTS = [
  "Bank A/c",
  "Purchase Expense A/c",
  "Debtors A/c",
  "Creditors A/c",
  "Sales Income A/c",
  "Cash A/c",
  "Other Expense A/c",
  "Capital A/c",
];

export const MOCK_FINANCIALS = {
  "2025": {
    income: { sales: 1250000, other: 45000 },
    expenses: { purchases: 450000, rent: 120000, utilities: 35000, salaries: 300000, marketing: 85000, other: 25000 },
  },
  "2024": {
    income: { sales: 1050000, other: 30000 },
    expenses: { purchases: 380000, rent: 110000, utilities: 30000, salaries: 270000, marketing: 65000, other: 20000 },
  },
  "2023": {
    income: { sales: 890000, other: 22000 },
    expenses: { purchases: 320000, rent: 100000, utilities: 28000, salaries: 240000, marketing: 50000, other: 18000 },
  },
};
