/**
 * MOCK DATA — Products
 * ─────────────────────────────────────────────────────────────────────────────
 * When the backend is ready, DELETE this file and replace all imports with
 * real API calls (e.g. GET /api/products).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const MOCK_PRODUCTS = [
  { id: "p001", name: "Air Conditioner", sku: "AC-001", category: "Electronics", price: 35000, stock: 45 },
  { id: "p002", name: "Refrigerator", sku: "RF-002", category: "Electronics", price: 22000, stock: 30 },
  { id: "p003", name: "Washing Machine", sku: "WM-003", category: "Electronics", price: 18000, stock: 25 },
  { id: "p004", name: "LED TV", sku: "TV-004", category: "Electronics", price: 45000, stock: 60 },
  { id: "p005", name: "Office Chair", sku: "CH-005", category: "Furniture", price: 8000, stock: 120 },
];

export const PRODUCT_NAMES = MOCK_PRODUCTS.map((p) => p.name);

/** Lookup price for a given product name */
export function getProductPrice(name) {
  return MOCK_PRODUCTS.find((p) => p.name === name)?.price ?? 0;
}
