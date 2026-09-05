# Odoo Urban Furniture API Endpoints

This document outlines all the available API endpoints for the Odoo Urban Furniture Accounting System.

## Base Configuration

**Allowed Origins (CORS):**
- `http://localhost:5000`
- `https://b82wq2xh-5000.inc1.devtunnels.ms`
- `http://localhost:5173`
- `https://b82wq2xh-5173.inc1.devtunnels.ms`

**Base API Path:** `/api`

---

## 1. Authentication
- `POST /auth/register` : Register a new user.
- `POST /auth/login` : Authenticate user and return JWT token.
- `GET /auth/me` : Get current authenticated user details.

## 2. Contacts (Customers/Vendors)
- `GET /contacts` : List all contacts.
- `POST /contacts` : Create a new contact.
- `GET /contacts/:id` : Retrieve contact details by ID.
- `PUT /contacts/:id` : Update an existing contact.

## 3. Products/Services
- `GET /products` : List all products.
- `POST /products` : Create a new product.
- `GET /products/:id` : Retrieve product details by ID.
- `PUT /products/:id` : Update an existing product.

## 4. Accounting (Chart of Accounts & Journals)
- `GET /accounts` : List all chart of accounts.
- `POST /accounts` : Create a new account.
- `GET /accounts/:id` : Retrieve account details by ID.
- `PUT /accounts/:id` : Update an account.
- `GET /journals` : List all journals.
- `POST /journals` : Create a new journal.
- `GET /journals/:id` : Retrieve journal details by ID.
- `PUT /journals/:id` : Update a journal.

## 5. Journal Entries
- `GET /journal-entries` : List all journal entries.
- `POST /journal-entries` : Create a new manual journal entry.
- `GET /journal-entries/:id` : Retrieve journal entry details by ID.
- `PUT /journal-entries/:id` : Update a draft journal entry.
- `POST /journal-entries/:id/post` : Post a draft journal entry to the general ledger.

## 6. Purchase Cycle
- `GET /purchase/orders` : List all purchase orders.
- `POST /purchase/orders` : Create a new purchase order.
- `GET /purchase/orders/:id` : Retrieve a purchase order.
- `POST /purchase/orders/:id/confirm` : Confirm a purchase order.
- `GET /purchase/bills` : List all vendor bills.
- `POST /purchase/bills` : Create a vendor bill.
- `POST /purchase/bills/:id/pay` : Register payment for a vendor bill.

## 7. Sales Cycle
- `GET /sales/orders` : List all sales orders.
- `POST /sales/orders` : Create a new sales order.
- `GET /sales/orders/:id` : Retrieve a sales order.
- `POST /sales/orders/:id/confirm` : Confirm a sales order.
- `GET /sales/invoices` : List all customer invoices.
- `POST /sales/invoices` : Create a customer invoice.
- `POST /sales/invoices/:id/pay` : Register payment for a customer invoice.

## 8. Budgeting & Analytic Accounts
- `GET /budgets/analytic-accounts` : List analytic accounts.
- `POST /budgets/analytic-accounts` : Create an analytic account.
- `GET /budgets/analytic-accounts/:id` : Retrieve analytic account details.
- `PUT /budgets/analytic-accounts/:id` : Update an analytic account.
- `GET /budgets` : List all budgets.
- `POST /budgets` : Create a new budget.
- `POST /budgets/:id/confirm` : Confirm a draft budget.
- `POST /budgets/:id/revise` : Revise an existing budget.
- `POST /budgets/:id/cancel` : Cancel a budget.

## 9. Reports
- `GET /reports/balance-sheet` : Generate and retrieve the balance sheet.
- `GET /reports/profit-loss` : Generate and retrieve the profit and loss (income) statement.
