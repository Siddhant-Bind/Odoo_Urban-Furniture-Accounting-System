/**
 * MOCK DATA — Contacts / Customers / Vendors
 * ─────────────────────────────────────────────────────────────────────────────
 * When the backend is ready, DELETE this file and replace all imports with
 * real API calls (e.g. GET /api/contacts).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const MOCK_CONTACTS = [
  { id: "c001", name: "Acme Corp", type: "Customer", email: "contact@acme.com", phone: "+91-9000000001", city: "Mumbai" },
  { id: "c002", name: "TechNova", type: "Customer", email: "info@technova.in", phone: "+91-9000000002", city: "Bangalore" },
  { id: "c003", name: "Global Retail", type: "Vendor", email: "vendor@globalretail.com", phone: "+91-9000000003", city: "Delhi" },
  { id: "c004", name: "Home Furnishings Inc", type: "Vendor", email: "ops@homefurnish.com", phone: "+91-9000000004", city: "Chennai" },
  { id: "c005", name: "Jane Doe", type: "Customer", email: "jane.doe@gmail.com", phone: "+91-9000000005", city: "Pune" },
];

export const CONTACT_NAMES = MOCK_CONTACTS.map((c) => c.name);
export const CUSTOMER_NAMES = MOCK_CONTACTS.filter((c) => c.type === "Customer").map((c) => c.name);
export const VENDOR_NAMES = MOCK_CONTACTS.filter((c) => c.type === "Vendor").map((c) => c.name);
