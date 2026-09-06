# 🛋️ UrbanMart Enterprise Accounting & ERP System

An enterprise-grade, double-entry Accounting & Business Management System designed for **UrbanMart (Odoo Urban Furniture)**. Modeled after Odoo ERP principles, this application provides an end-to-end suite for managing Sales Cycles, Purchase Cycles, Double-Entry General Ledger, Analytic Budgeting, Financial Reporting, and Customer Portal Access.

---

## 🌟 Key Highlights & Core Features

### 📊 1. Executive Workspace & Live Dashboard
- **Unified Global Search Bar**: Real-time lookup across Sales Orders, Purchase Orders, Customer Invoices, Vendor Bills, Chart of Accounts, and System Directory modules with instant keyboard navigation.
- **Dual View Modes**: Seamless toggle between **List Grid View** and **Kanban Board View** for visual operational tracking.
- **Bento Summary Cards**: Real-time tracking of Sales Pipeline Volume, Purchase Payable Commitments, and Net AR vs AP Position (Accounts Receivable vs Accounts Payable).
- **Treasury & Audit Control**: Live monitoring of Bank Balance, Cash Float, Pending Draft Journal Entries, and **Ledger Balance Health Check** (real-time validation that total Debits equal total Credits).

---

### 🛍️ 2. Sales Cycle Management
- **Sales Orders**: Create, view, and manage customer sales orders with status lifecycles (`DRAFT`, `CONFIRMED`, `BILLED`, `CANCELLED`).
- **Customer Invoices**: Generate and post customer invoices from Sales Orders or as standalone documents.
- **Ledger Integration**: Auto-posts double-entry journal entries upon invoice confirmation (Debit: Accounts Receivable, Credit: Sales Income).
- **Invoice Payments & Receipts**: Record customer payments via Bank or Cash with real-time balance updates.
- **Customer Portal (`/my-invoices`)**: Dedicated portal for users with the `CONTACT` role to view personal invoices and download payment receipts.

---

### 🚚 3. Purchase & Vendor Management
- **Purchase Orders**: Manage vendor procurement orders with complete itemization, quantity, unit price, and status workflows.
- **Vendor Bills**: Convert confirmed Purchase Orders into posted Vendor Bills.
- **Automated Ledger Posting**: Instant posting to General Ledger on bill confirmation (Debit: Expense/Inventory Account, Credit: Accounts Payable).
- **Bill Payments**: Register full or partial vendor bill payments via Bank or Cash.

---

### ⚖️ 4. Double-Entry Accounting & General Ledger
- **Chart of Accounts (CoA)**: Manage hierarchical accounts across 5 primary financial types:
  - `ASSET`
  - `LIABILITY`
  - `INCOME`
  - `EXPENSE`
  - `CAPITAL`
- **Journals Engine**: Pre-configured & custom journals (`SALES`, `PURCHASE`, `BANK`, `CASH`).
- **Manual Journal Entries**: Create custom debit/credit ledger postings with automated balanced entry checks ($Debits = Credits$).
- **Automated Posting Service**: Centralized `ledger.service.js` engine that guarantees consistent double-entry integrity across all financial operations.

---

### 📈 5. Analytical Budgeting & Revisions
- **Analytic Accounts**: Categorize revenues and expenses by cost center, department, or project (`INCOME` / `EXPENSE`).
- **Budget Management**: Set target budgets tied to analytic accounts and responsible team members.
- **Budget Lifecycle**: Support for `DRAFT`, `CONFIRMED`, `REVISED`, and `CANCELLED` statuses.
- **Budget Revisions**: Track historical budget revisions linked to original budget baselines.
- **Variance Analysis**: Compare Committed Amounts vs Achieved Amounts with visual progress indicators and Kanban boards.

---

### 📊 6. Financial Reports
- **Balance Sheet**: Comprehensive financial statement listing total Assets vs total Liabilities & Equity.
- **Profit & Loss (P&L)**: Real-time income statement breaking down Revenues, Operating Expenses, and Net Margin.
- **Budget Reports**: Detailed variance and performance metrics for analytical cost centers.

---

### 👥 7. Master Data & Security (RBAC)
- **Contacts Directory**: Unified repository for **Customers** and **Vendors** with profile image upload capability.
- **Product Catalog**: Manage Goods, Services, and Combo products with sales prices and cost tracking.
- **Role-Based Access Control (RBAC)**:
  - 🛡️ **`ADMIN`**: Complete administrative rights, user creation (`/create-user`), full system configuration, and financial reports.
  - 💼 **`INVOICING_USER`**: Access to sales, purchase, invoicing, and standard accounting workflows.
  - 👤 **`CONTACT`**: Restricted access strictly isolated to the Customer Self-Service Portal (`/my-invoices`).

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18, React Router v6 |
| **Styling & Icons** | Tailwind CSS, Lucide React Icons |
| **Build Tool** | Vite |
| **Backend Runtime** | Node.js, Express.js |
| **Database & ORM** | MySQL, Prisma ORM |
| **Authentication** | JWT (JSON Web Tokens), bcryptjs |
| **File Uploads** | Multer |

---

## 📁 Repository Directory Structure

```
Odoo_Urban_Furniture/
├── client/                              # React Frontend Application
│   ├── public/                          # Static public assets
│   ├── src/
│   │   ├── assets/                      # Styling tokens & global CSS
│   │   ├── context/
│   │   │   └── AuthContext.jsx          # Auth state management & token verification
│   │   ├── layouts/
│   │   │   ├── AuthLayout.jsx           # Main navigation layout for logged-in users
│   │   │   └── PublicLayout.jsx         # Guest layout for landing, login & signup
│   │   ├── pages/                       # All Application Views & Dashboards
│   │   │   ├── Dashboard.jsx            # Unified ERP Workspace & Search
│   │   │   ├── SalesOrderList.jsx       # Sales Order directory
│   │   │   ├── SalesOrderForm.jsx       # Sales Order creation & view
│   │   │   ├── CustomerInvoiceForm.jsx  # Sale Invoice creation & posting
│   │   │   ├── InvoiceRegister.jsx      # Customer Invoices register
│   │   │   ├── InvoicePaymentForm.jsx   # Customer Payment receipt form
│   │   │   ├── PurchaseOrderList.jsx    # Purchase Order directory
│   │   │   ├── PurchaseOrderForm.jsx    # Purchase Order creation
│   │   │   ├── VendorBillList.jsx       # Vendor Bills directory
│   │   │   ├── VendorBillForm.jsx       # Vendor Bill posting
│   │   │   ├── BillPaymentForm.jsx      # Vendor Bill payment form
│   │   │   ├── ChartOfAccounts.jsx      # Chart of Accounts management
│   │   │   ├── NewAccount.jsx           # Account creation
│   │   │   ├── Journals.jsx             # Journal configuration
│   │   │   ├── JournalEntries.jsx       # General Ledger entries
│   │   │   ├── BudgetForm.jsx           # Analytical budget creation
│   │   │   ├── BudgetReportList.jsx     # Budget report list view
│   │   │   ├── BudgetReportKanban.jsx   # Budget report kanban view
│   │   │   ├── BalanceSheet.jsx         # Financial Balance Sheet
│   │   │   ├── ProfitAndLoss.jsx        # Financial Income Statement
│   │   │   ├── ContactList.jsx          # Contact directory (List)
│   │   │   ├── ContactKanban.jsx        # Contact directory (Kanban)
│   │   │   ├── ProductList.jsx          # Product catalog
│   │   │   ├── MyInvoices.jsx           # Customer Portal view
│   │   │   └── CreateUser.jsx           # Admin user management
│   │   ├── utils/
│   │   │   └── api.js                   # Axios/Fetch HTTP client wrapper
│   │   ├── App.jsx                      # Route declarations & Auth Guarding
│   │   └── main.jsx                     # React DOM entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── server/                              # Node.js Express Backend API
    ├── prisma/
    │   ├── schema.prisma                # Database Schema & Model Definitions
    │   ├── seed.js                      # Database Seeding Script (Initial Demo Data)
    │   └── migrations/                  # Prisma Database Migrations
    ├── src/
    │   ├── config/
    │   │   ├── prisma.js                # Prisma Client Singleton Instance
    │   │   └── env.js                   # Environment Variable Loader
    │   ├── middleware/
    │   │   ├── authMiddleware.js        # JWT Validation Middleware
    │   │   ├── roleMiddleware.js        # RBAC Authorization Middleware
    │   │   ├── uploadMiddleware.js      # Multer File Upload Config
    │   │   └── errorHandler.js          # Centralized Global Error Handler
    │   ├── modules/
    │   │   ├── auth/                    # Login, Signup, Auth Controllers & Services
    │   │   ├── contacts/                # Customer & Vendor CRUD APIs
    │   │   ├── products/                # Product Catalog APIs
    │   │   ├── accounting/              # Accounts, Journals, Ledger Engine (`ledger.service.js`)
    │   │   ├── purchase/                # Purchase Orders, Vendor Bills & Payments APIs
    │   │   ├── sales/                   # Sales Orders, Invoices & Customer Receipts APIs
    │   │   ├── budget/                  # Analytic Accounts & Budgeting APIs
    │   │   └── reports/                 # Balance Sheet, P&L, & Budget Analytics APIs
    │   ├── utils/
    │   │   ├── generateSequence.js      # Auto-Numbering Engine (PO/0001, INV/2026/001...)
    │   │   └── validators.js            # Payload Validation Utilities
    │   ├── app.js                       # Express Application Setup
    │   └── server.js                    # HTTP Server Entry Point
    ├── .env                             # Environment Variables Config
    └── package.json
```

---

## ⚡ Quick Start & Installation Guide

### Prerequisites
- **Node.js**: `v18.x` or higher
- **MySQL Database Server**: `v8.0` or higher (or compatible MariaDB)
- **npm** or **yarn**

---

### Step 1: Clone & Configure Server (Backend)

1. Open terminal and navigate to the `server/` directory:
   ```bash
   cd server
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables (`server/.env`):
   Create a `.env` file in the `server` directory with the following variables:
   ```env
   PORT=5000
   DATABASE_URL="mysql://root:password@localhost:3306/odoo_urban_furniture"
   JWT_SECRET="your_secure_jwt_secret_key_here"
   JWT_EXPIRES_IN="7d"
   ```

4. Run Prisma Database Migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Seed Initial Demo Data (Admin, Accounts, Products, Demo Contacts):
   ```bash
   npm run seed
   ```

6. Start the Backend API Server:
   ```bash
   npm run dev
   ```
   *The server will run on `http://localhost:5000`.*

---

### Step 2: Configure Client (Frontend)

1. Open a new terminal window and navigate to the `client/` directory:
   ```bash
   cd client
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the Vite Development Server:
   ```bash
   npm run dev
   ```
   *The client app will launch at `http://localhost:5173`.*

---

## 🔐 Credentials & Default Demo Accounts

Upon running `npm run seed`, the system initializes the following default accounts:

| User Role | Login ID | Default Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin` | `Admin@123` | Full ERP System Access & User Creation |
| **Invoicing User** | `accountant` | `User@123` | Sales, Purchase, Invoicing & Ledger Access |
| **Contact (Customer)** | `customer1` | `Customer@123` | Isolated Customer Portal (`/my-invoices`) |

---

## 🌐 API Endpoint Matrix

### 🔐 Authentication Module (`/api/auth`)
- `POST /api/auth/login` - Authenticate user & receive JWT token
- `POST /api/auth/signup` - Register a new user account
- `POST /api/auth/create-user` - Admin endpoint to create role-assigned users

### 💼 Sales Module (`/api/sales`)
- `GET /api/sales/orders` - Fetch all sales orders
- `POST /api/sales/orders` - Create a new sales order
- `POST /api/sales/invoices` - Create and post customer invoice
- `POST /api/sales/invoices/:id/payments` - Register payment receipt for invoice

### 🚚 Purchase Module (`/api/purchase`)
- `GET /api/purchase/orders` - Fetch all purchase orders
- `POST /api/purchase/orders` - Create a new purchase order
- `POST /api/purchase/bills` - Post vendor bill
- `POST /api/purchase/bills/:id/payments` - Register vendor bill payment

### ⚖️ Accounting & Ledger Module (`/api/accounts`, `/api/journals`, `/api/journal-entries`)
- `GET /api/accounts` - Retrieve Chart of Accounts
- `POST /api/accounts` - Create new GL account
- `GET /api/journals` - Retrieve all journals
- `GET /api/journal-entries` - View posted double-entry journal entries

### 📈 Budgeting & Reports (`/api/budget`, `/api/reports`)
- `GET /api/budget` - Fetch analytical budgets
- `POST /api/budget` - Create analytical budget
- `GET /api/reports/balance-sheet` - Fetch real-time Balance Sheet statement
- `GET /api/reports/profit-loss` - Fetch real-time Profit & Loss statement

---

## 📄 License & System Ownership

© 2025 **UrbanMart Enterprise Operations**. All rights reserved.
Developed for modern furniture retail & manufacturing enterprise resource management.