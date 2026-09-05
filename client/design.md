# UrbanMart — UI Prototype Design Brief for Google Stitch

**App name:** UrbanMart (internal accounting / operations web app)
**Total screens:** 29
**Mode:** Light mode only
**Palette:** Turquoise-led, modern & airy
**Source:** Based on the hand-drawn flow (Excalidraw wireframe) covering Auth → Dashboard → Master Data → Budgeting → Purchase/Sales Data Entry → Reports

---

## 0. How to use this document with Google Stitch

Stitch generates best results when it builds on a consistent design system and is fed **one focused prompt per screen, in a logical sequence**, instead of one giant prompt. This brief is organized into **9 development phases**. Work through them **in order**, one screen at a time:

1. Open a new Stitch project and start with the **Global Design System Prompt** in Section 1 below — this locks in the look & feel (do this once, before Phase 1, or fold it into your very first screen prompt).
2. For every phase, generate the screens **in the order listed**. Each screen's prompt already restates the palette + style so Stitch stays consistent even across separate generations.
3. After each screen is generated, say "keep the same header, sidebar, colors and typography as the previous screen" before generating the next one — this is the single biggest lever for visual consistency in Stitch.
4. Treat each phase as a milestone: finish and sanity-check all screens in a phase before moving to the next. This mirrors how the product itself is built (auth → shell → masters → transactions → reports).
5. Every prompt below intentionally says **"leave an empty placeholder where the logo goes — do not generate a logo"** — a real logo will be dropped in later, so Stitch should only render a neutral placeholder box/shape.

### Phase map (29 screens total)

| Phase | Theme | Screens | Count |
|---|---|---|---|
| 1 | Authentication & Landing | Landing, Login, Sign Up | 3 |
| 2 | Core Shell & Admin | Dashboard, Create User (Admin-only) | 2 |
| 3 | Master Data — Contacts | List, Kanban, Form | 3 |
| 4 | Master Data — Products | List, Kanban, Form | 3 |
| 5 | Master Data — Accounting Setup | Chart of Accounts (List + Form), Journals (List + Form), Journal Entries (List + Form) | 6 |
| 6 | Budgeting | Budget Form, Budget Revised, Budget Report List, Budget Report Kanban | 4 |
| 7 | Data Input — Purchase Cycle | Purchase Order, Vendor Bill, Bill Payment | 3 |
| 8 | Data Input — Sales Cycle | Sales Order, Customer Invoice, Invoice Register | 3 |
| 9 | Reports | Profit & Loss (downloadable), Sales Sheet (downloadable) | 2 |
| **Total** | | | **29** |

### Roles (used throughout — mention in prompts where relevant)
- **Admin** — full access to everything, incl. user management (the only role that sees "Create User").
- **Accountant** — creates master data, records transactions, manages contacts/vendors, accesses the accounting dashboard, creates journal entries, invoices, bills and payments.
- **User** — restricted: can only view their own invoices/bills (paid/unpaid) and pay dues directly from a portal view.

---

## 1. Global Design System Prompt (run first)

Paste this once at the very start of the Stitch project so every later screen inherits it. If Stitch doesn't have a persistent "theme" step in your version, paste this paragraph at the top of **every** screen prompt below.

```
Design a modern, light-mode-only web application UI called "UrbanMart". This is a clean, professional business/accounting tool, not a consumer app — prioritize clarity, data density done tastefully, and calm confidence over flashiness.

Color palette (turquoise-led, light mode):
- Primary / brand: turquoise #14B8A6, hover/active state #0F766E, primary-tint background #CCFBF1
- Secondary accent: soft teal #99F6E4 for highlights, chips and selected states
- Page background: #F8FAFC (very light cool gray), card/surface background: #FFFFFF
- Borders/dividers: #E2E8F0
- Primary text: #0F172A, secondary/muted text: #64748B
- Status colors: Draft = gray #94A3B8, Confirmed/Posted = turquoise #14B8A6, Paid/Success = green #22C55E, Overdue/Error = red #EF4444, Warning = amber #F59E0B

Typography: a clean modern sans-serif (Inter or Google Sans style), medium-weight headings, generous line height, comfortable letter spacing.

Layout language: rounded corners (12–16px radius) on cards, buttons and inputs; soft subtle drop shadows instead of hard borders where possible; generous white space; 8px-grid spacing; left-aligned data tables with sticky headers; primary actions as solid turquoise pill/rounded buttons, secondary actions as outlined turquoise buttons, destructive actions in red outline.

Component style: top navigation bar with a left-aligned empty rectangular logo placeholder (do NOT draw an actual logo — just a neutral placeholder box, since a real logo will be added later), simple line-style icons (not filled), List/Kanban toggle as a small icon switch, search bars with rounded pill shape, tables with zebra-free clean rows and light hover highlight, status values shown as small rounded "pill" badges colored per status.

Keep every screen in this same design system for visual consistency across the whole app.
```

---

## Phase 1 — Authentication & Landing (3 screens)

### Screen 1 — Landing Page
**Purpose:** First screen a visitor sees; offers a clear choice to Log In or Sign Up.
**Stitch prompt:**
```
Create the Landing Page for "UrbanMart", a modern turquoise-and-white business web app (light mode). Center layout: an empty logo placeholder box at the top, a short bold headline (e.g. "Run your business operations in one place"), a one-line supporting subtext, and two clear call-to-action buttons side by side: a solid turquoise "Log In" button and an outlined turquoise "Sign Up" button. Add a minimal, tasteful abstract background illustration or soft geometric shapes in turquoise tints to avoid an empty look. Keep it clean, spacious, and modern — this is the very first impression of the product.
```
**Navigation:** "Log In" → Screen 2, "Sign Up" → Screen 3.

### Screen 2 — Login Page
**Purpose:** Existing user authentication.
**Stitch prompt:**
```
Create a Login Page for UrbanMart, light mode, turquoise palette, matching the landing page style. Centered card on the page with: an empty logo placeholder at the top of the card, a "Login Id" text input, a "Password" input (masked), a full-width solid turquoise "Sign In" button below, and a small text row underneath with two links separated by a divider: "Forgot Password" and "Sign Up". Keep the card minimal with soft shadow and rounded corners on a very light background.
```
**Key notes:** Login Id and Password are required; show inline error text below the fields for invalid credentials ("Invalid Login Id or Password").
**Navigation:** Sign In → Screen 4 (Dashboard). "Sign Up" link → Screen 3.

### Screen 3 — Sign Up Page
**Purpose:** New user registration.
**Stitch prompt:**
```
Create a Sign Up Page for UrbanMart, light mode, turquoise palette, matching the Login page layout exactly (same card style, same empty logo placeholder position). Centered card with fields in order: "Login Id", "Email Id", "Password" (masked), "Re-enter Password" (masked), followed by a full-width solid turquoise "Sign Up" button, and below it a small text row with "Forgot Password" and "Sign Up" links separated by a divider, same as the login page.
```
**Key notes:** Login Id must be unique, 6–12 characters; Email must not be a duplicate; Password must contain lowercase, uppercase and a special character, minimum 8 characters; show these as helper text under the password field.
**Navigation:** Sign Up (success) → Screen 4 (Dashboard).

---

## Phase 2 — Core Shell & Admin (2 screens)

### Screen 4 — App Dashboard
**Purpose:** Main landing screen after login; role-aware home base and navigation hub.
**Stitch prompt:**
```
Create the main App Dashboard for UrbanMart, light mode, turquoise palette, consistent with the previous screens. Top bar: empty logo placeholder on the left, four top-level nav tabs — "Sales", "Purchase", "Account", "Report" — centered or left-aligned next to the logo, and a user profile avatar with a dropdown on the top right. Next to the profile avatar, show a solid turquoise "+ Create User" button — visually flagged as admin-only (e.g. small "Admin" tag or lock icon beside it).

Below the top bar, show a row of summary cards:
- A "Sales" card with a small turquoise "New" button in its header, and three small status pill tabs underneath showing counts: "All (3)", "Confirmed (0)", "Draft (3)"
- A "Purchase" card, same layout: "New" button, tabs "All (3)", "Confirmed (0)", "Draft (2)"
- A "Budget Reports" card with a turquoise "Report" button in its header, and three status tabs: "Achieved (3)", "Budget (2)", "Committed (4)"

On the far right (or as a slide-out panel triggered from the nav), show a compact navigation menu grouped by the four top tabs:
- Sales: Sales Order, Sale Invoice, Receipt
- Purchase: Purchase Order, Purchase Bill, Payment
- Account: Contact, Product, Analyticals, Analytical Budget, Chart of Account, Journals, Journal Entries
- Report: Balance Sheet, Profit and Loss, Budget Report

Keep everything inside clean white rounded cards on the light gray page background, spacious padding, modern SaaS dashboard feel.
```
**Key notes:** "Create User" button only renders/functions for the Admin role — call this out as a conditional element. Clicking any item in the grouped menu routes to that master/transaction screen.
**Navigation:** "Create User" → Screen 5. Sales/Purchase "New" → relevant transaction form (Phase 7/8). Menu items → their respective master screens (Phase 3–6, 9).

### Screen 5 — Create User (Admin only)
**Purpose:** Admin-exclusive screen to provision new system users with a role.
**Stitch prompt:**
```
Create a "Create User" form screen for UrbanMart, light mode, turquoise palette, reached only by an Admin. Centered card with an empty logo placeholder at top, then fields: "Name", "Login Id", "E-mail Id", a "Role" selector shown as radio buttons or segmented control with two options — "Accountant", "Administrator" — followed by "Password" and "Re-Enter Password" (masked). Below the fields, two buttons side by side: a solid turquoise "Create" button and an outlined gray "Cancel" button. Add small helper/validation text under the relevant fields: Login Id must be unique and 6–12 characters, Email must not be a duplicate, Password must be unique with lowercase, uppercase and a special character, minimum 8 characters.
```
**Key notes:** Roles map to: Admin (full access), Accountant (masters + transactions + reports), User (view/pay own invoices only).
**Navigation:** Create (success) → back to Screen 4 with a success toast. Cancel → Screen 4.

---

## Phase 3 — Master Data: Contacts (3 screens)

### Screen 6 — Contact List View
**Stitch prompt:**
```
Create a "Contacts" List View screen for UrbanMart, light mode, turquoise palette, consistent app shell (top bar with empty logo placeholder, back button). Header row: a solid turquoise "New" button, a rounded pill search bar, a "Back" button, and a small icon toggle on the right to switch between List and Kanban view. Below, a clean data table with columns: checkbox select, small circular contact photo/avatar, "Name", "Email", "Phone". Show a few sample rows with turquoise-tinted row hover state.
```
**Navigation:** "New" → Screen 8 (blank form). Clicking a row → Screen 8 (pre-filled). Kanban icon → Screen 7.

### Screen 7 — Contact Kanban View
**Stitch prompt:**
```
Create a "Contacts" Kanban View screen for UrbanMart, light mode, turquoise palette, same header pattern as the Contact List View (New button, search bar, Back button, List/Kanban toggle icon on the right — but now toggled to Kanban). Show contacts as a horizontal row/grid of rounded white cards, each with a circular avatar photo, contact name in bold, email and phone underneath in muted text.
```
**Navigation:** "New" → Screen 8. Clicking a card → Screen 8 (pre-filled). List icon → Screen 6.

### Screen 8 — Contact Form View (New / Edit)
**Stitch prompt:**
```
Create a "Contact" Form View screen for UrbanMart, light mode, turquoise palette. Header buttons: "New", solid turquoise "Confirm", and "Back". Form fields: "Contact Name", "Email" (marked as must be unique), "Phone", "Address" broken into "Street", "City", "State", "Country" as stacked sub-fields, and an "Upload Image" box/button on the right side for a contact photo.
```
**Navigation:** Confirm (save) → Screen 6. Back → Screen 6.

---

## Phase 4 — Master Data: Products (3 screens)

### Screen 9 — Product Master List View
**Stitch prompt:**
```
Create a "Products" List View screen for UrbanMart, light mode, turquoise palette, same header pattern as other master list screens (New button, search bar, Back button, List/Kanban toggle). Data table columns: checkbox select, "Product Name", "Category", "Type", "Sales Price", "Cost". Include a couple of sample rows (e.g. Air Conditioner / Electronics / Goods, Refrigerator / Electronics / Goods).
```
**Navigation:** "New" → Screen 11. Row click → Screen 11 (pre-filled). Kanban icon → Screen 10.

### Screen 10 — Product Master Kanban View
**Stitch prompt:**
```
Create a "Products" Kanban View screen for UrbanMart, light mode, turquoise palette, same header as the Product List View but toggled to Kanban. Show products as a grid of rounded white cards, each with a product image placeholder, product name in bold, and "Sales Price" / "Cost" shown as two small stat lines underneath.
```
**Navigation:** "New" → Screen 11. Card click → Screen 11. List icon → Screen 9.

### Screen 11 — Product Master Form View (New / Edit)
**Stitch prompt:**
```
Create a "Product" Form View screen for UrbanMart, light mode, turquoise palette. Fields: "Product Name", "Product Type" as a dropdown (Goods / Service / Combo), "Category" as a searchable dropdown that also allows creating a new category inline on the fly, "Sales Price" and "Cost" as currency inputs, and an "Upload Image" box for the product photo. Include header actions "Confirm" (solid turquoise) and "Back".
```
**Navigation:** Confirm → Screen 9. Back → Screen 9.

---

## Phase 5 — Master Data: Accounting Setup (6 screens)

### Screen 12 — Chart of Accounts List View
**Stitch prompt:**
```
Create a "Chart of Accounts" List View screen for UrbanMart, light mode, turquoise palette. Header buttons: "New", "Confirm", "Archived", "Back". A simple two-column data table: "Account Name" and "Type", pre-populated with standard accounts such as Bank A/c (Assets), Purchase Expense A/c (Expenses), Debtors A/c (Assets), Creditors A/c (Liability), Sales Income A/c (Income), Cash A/c (Assets), Other Expense A/c (Expenses), Capital A/c (Capital). Show these as mostly locked/pre-configured rows with a subtle "system default" tag, since most accounts are pre-configured out of the box.
```
**Navigation:** "New" → Screen 13 (opens as a separate window/screen, not inline). Back → Screen 4.

### Screen 13 — Chart of Accounts Form View (New Account — separate window)
**Stitch prompt:**
```
Create a small, focused "New Account" form screen for UrbanMart, light mode, turquoise palette, styled as a separate modal-like window opened from the Chart of Accounts list. Fields: "Account Name" and "Type" as a dropdown grouped by category — Balance Sheet types (Asset, Liability, Bank, Capital, Cash) and Profit & Loss types (Income, Expenses, Other Expenses). Include "Save" (solid turquoise) and "Cancel" buttons.
```
**Navigation:** Save → back to Screen 12 with the new row added. Cancel → Screen 12.

### Screen 14 — Journals List View
**Stitch prompt:**
```
Create a "Journals" List View screen for UrbanMart, light mode, turquoise palette. Header buttons: "New", "Back". Data table with columns "Journal Name", "Journal Type", "Default Account", pre-populated with rows: Sales / Sales / Sales Income A/c, Purchase / Purchase / Purchase Expense A/c, Bank / Bank / Bank A/c, Cash / Cash / Cash A/c.
```
**Navigation:** "New" → Screen 15 (separate window). Back → Screen 4.

### Screen 15 — Journal Form View (New Journal — separate window)
**Stitch prompt:**
```
Create a small "New Journal" form screen for UrbanMart, light mode, turquoise palette, opened as a separate window from the Journals list. Fields: "Journal Name" (text), "Journal Type" as a dropdown (Sales / Purchase / Bank / Cash), "Default Account" as a searchable dropdown sourced from the Chart of Accounts. Include "Save" and "Cancel" buttons.
```
**Navigation:** Save → Screen 14 (new row added). Cancel → Screen 14.

### Screen 16 — Journal Entries List View
**Stitch prompt:**
```
Create a "Journal Entries" List View screen for UrbanMart, light mode, turquoise palette. Header buttons: "New", "Back". Data table columns: "Date", "Number", "Partner", "Journal", "Total", "Status" (shown as colored pill badges — gray "Draft", turquoise "Posted"). Include two sample rows, one Posted and one Draft, to show both states clearly.
```
**Navigation:** "New" → Screen 17 (separate window). Row click → Screen 17 (pre-filled, read view if Posted). Back → Screen 4.

### Screen 17 — Journal Entry Form View (New / Post Entry — separate window)
**Stitch prompt:**
```
Create a "Journal Entry" form screen for UrbanMart, light mode, turquoise palette, opened as a separate window from the Journal Entries list. Header buttons: solid turquoise "Post", outlined "Cancel", and "Back". Fields: "Accounting Date" and "Journal" (dropdown). Below, a multi-line table with columns "Account" (dropdown from Chart of Accounts), "Partner" (dropdown from Contacts), "Debit", "Credit" — allow multiple rows. Show a subtle red inline warning banner reading "Debit and Credit totals don't match" as an example of a validation state, since the entry can only post when debit and credit totals are equal.
```
**Navigation:** Post → Screen 16 (entry now shows Posted). Cancel/Back → Screen 16.

---

## Phase 6 — Budgeting (4 screens)

### Screen 18 — Budget Form View (Original Budget)
**Stitch prompt:**
```
Create a "Budget" form screen for UrbanMart, light mode, turquoise palette. Header shows a horizontal status stepper: Draft → Confirmed → Revised → Cancelled, with the current stage highlighted in turquoise. Header buttons: "New", "Confirm", "Revise", "Cancel". Fields at the top: "Budget Name", "Budget Period" as a Start Date / End Date range, "Responsible" as a dropdown sourced from Contacts. Below, a line-items table titled by an "Analytics" section with columns: "Analytic Account", "Type" (Income/Expense pill), "Committed Amount", "Achieved Amount", "Achieved %", "Amount to Achieve" — with Achieved % and Amount to Achieve shown as computed/read-only fields.
```
**Navigation:** Confirm → status moves to Confirmed. Revise → Screen 19. Cancel → status moves to Cancelled.

### Screen 19 — Budget Revised Form View
**Stitch prompt:**
```
Create a "Budget (Revised)" form screen for UrbanMart, light mode, turquoise palette, visually identical to the original Budget form but with its status stepper now on "Revised", and two extra reference fields near the top: "Revised With" and "Revised Budget" showing a link back to the original budget. Keep the same Analytics line-items table (Analytic Account, Type, Committed Amount, Achieved Amount, Achieved %, Amount to Achieve) and the same header buttons (Draft/Confirm/Revise/Cancel) styled consistently.
```
**Navigation:** Confirm → Screen 20/21 flow (report). Back → Screen 4.

### Screen 20 — Budget Report List View
**Stitch prompt:**
```
Create a "Budget Report" List View screen for UrbanMart, light mode, turquoise palette. Header: a turquoise "Print" button, a year selector input, and a "Back" button. Data table columns: "Budget Name" (or Start Date), "End Date", "Status", and a small inline pie/donut chart per row showing Achieved vs Remaining in turquoise and light gray. Include a small icon toggle on the right to switch to Kanban view.
```
**Navigation:** Kanban icon → Screen 21. Row click → Screen 18/19 (that budget's form). Back → Screen 4.

### Screen 21 — Budget Report Kanban View
**Stitch prompt:**
```
Create a "Budget Report" Kanban View screen for UrbanMart, light mode, turquoise palette, same header as the Budget Report List View but toggled to Kanban. Show budgets as rounded white cards, each containing a donut/pie chart (turquoise vs light gray) and three small stat chips underneath: "Achieved", "Budget", "Committed", each with a count/amount.
```
**Navigation:** List icon → Screen 20. Card click → relevant Budget form (Screen 18/19).

---

## Phase 7 — Data Input: Purchase Cycle (3 screens)

### Screen 22 — Purchase Order Form
**Stitch prompt:**
```
Create a "Purchase Order" form screen for UrbanMart, light mode, turquoise palette. Header: "PO No." shown as an auto-generated read-only field (e.g. "P00001"), "New", "Confirm", "Create Bill", "Cancel", "Back" buttons. Fields: "Vendor Name" (dropdown from Contacts), "PO Date". Below, a line-items table: "Product" (dropdown from Product Master), "Budget Analytics" (dropdown), "Qty", "Unit Price", "Total" — with an auto-computed grand "Total" row at the bottom.
```
**Navigation:** Confirm → status updates. "Create Bill" → Screen 23 (pre-filled from this PO). Back → Screen 4.

### Screen 23 — Vendor Bill Form
**Stitch prompt:**
```
Create a "Vendor Bill" form screen for UrbanMart, light mode, turquoise palette. Header: "New", "Confirm", solid turquoise "Pay" buttons, plus small reference chips labeled "PO" and "Budget" that link back to the source documents. Fields: auto-generated "Vendor Bill No.", "Bill Reference", "Vendor Name", a status pill selector (Draft / Posted / Paid), "Bill Date", "Due Date". Below, a line-items table: "Product" (linked from Product Master), "Chart of Account" (defaulted to Purchase Expense), "Budget Analytics", "Qty", "Unit Price", "Total". Footer shows "Paid via Cash", "Paid via Bank", "Amount Due" and a computed grand Total. Include a small collapsed/side panel showing the auto-generated, balanced Journal Entry preview (e.g. Purchase Expense A/c Dr / Creditors A/c Cr) as a read-only reference.
```
**Navigation:** Pay → Screen 24. Back → Screen 4.

### Screen 24 — Bill Payment Form
**Stitch prompt:**
```
Create a "Bill Payment" form screen for UrbanMart, light mode, turquoise palette, styled as a small focused panel/modal. Header buttons: solid turquoise "Confirm", "Cancel". Fields: "Payment Type" as a radio choice (Paid / Received), "Partner" (from Contacts), "Date", "Amount", "Payment Via" as a dropdown (Cash / Bank), and a "Note" text field.
```
**Navigation:** Confirm → back to Screen 23 with status now "Paid". Cancel → Screen 23.

---

## Phase 8 — Data Input: Sales Cycle (3 screens)

### Screen 25 — Sales Order Form
**Stitch prompt:**
```
Create a "Sales Order" form screen for UrbanMart, light mode, turquoise palette, mirroring the Purchase Order screen's layout for consistency. Header: auto-generated "SO No." (e.g. "S00001"), a solid turquoise "Create Invoice" button. Fields: "Customer Name" (dropdown from Contacts), "SO Date". Below, a line-items table: "Product", "Budget Analytics", "Qty", "Unit Price", "Total", with a computed grand Total row.
```
**Navigation:** "Create Invoice" → Screen 26 (pre-filled from this SO).

### Screen 26 — Customer Invoice Form
**Stitch prompt:**
```
Create a "Customer Invoice" form screen for UrbanMart, light mode, turquoise palette, mirroring the Vendor Bill screen's layout. Header: "New", "Confirm", solid turquoise "Pay" buttons, plus reference chips "SO" and "Budget". Fields: auto-generated "Customer Invoice No.", "Invoice Reference", "Customer Name", a status pill selector (Draft / Confirmed / Paid), "Invoice Date", "Due Date". Below, a line-items table: "Product", "Chart of Account" (defaulted to Sales Income), "Budget Analytics", "Qty", "Unit Price", "Total". Footer shows "Paid via Cash", "Paid via Bank", "Amount Due" and grand Total. Include a small read-only Journal Entry preview panel (e.g. Debtors A/c Dr / Sales Income A/c Cr).
```
**Navigation:** Pay → records payment inline (status becomes Paid) or routes to a payment step. Back → Screen 27.

### Screen 27 — Invoice Register (List View)
**Stitch prompt:**
```
Create an "Invoice Register" List View screen for UrbanMart, light mode, turquoise palette. Header: solid turquoise "New" button, a rounded search bar, a date-range filter, and status filter tabs — "All", "Draft", "Confirmed", "Paid" — each with a count. Data table columns: "Invoice No.", "Customer", "Invoice Date", "Due Date", "Total", "Status" (colored pill), and an "Actions" column with a small "Pay" button for unpaid rows.
```
**Navigation:** "New" → Screen 26 (blank). Row click → Screen 26 (pre-filled). "Pay" action → inline payment.

---

## Phase 9 — Reports (2 screens)

### Screen 28 — Profit and Loss Report (downloadable)
**Stitch prompt:**
```
Create a "Profit and Loss Report" screen for UrbanMart, light mode, turquoise palette. Header: a solid turquoise "Print" (download as PDF) button, a year selector, and a "Back" button. Below, a clean statement-style layout with two grouped sections: "Income" (with a sub-line "Income from Sales") and "Expenses" (with sub-lines "Purchase Expense" and "Other Expense"), each showing amounts right-aligned in a "Balance" column. At the bottom, a highlighted "Net Income" row computed as Income minus Expenses, shown in a bold turquoise-tinted row.
```
**Navigation:** Print/Download → triggers a PDF download of this report. Back → Screen 4.

### Screen 29 — Sales Sheet (downloadable)
**Stitch prompt:**
```
Create a "Sales Sheet" report screen for UrbanMart, light mode, turquoise palette, consistent with the Profit and Loss report's header style. Header: a solid turquoise "Download" button (Excel/PDF), a date-range filter, and a "Back" button. Below, a data table listing all sales for the period with columns: "Date", "Customer", "Product", "Qty", "Amount", "Status" (colored pill), and a bold summary "Total Sales" row at the bottom.
```
**Navigation:** Download → exports the sheet. Back → Screen 4.

---

## Assumptions & notes (read before building)

- The 29 screens above map to every module explicitly requested: Landing, Login, Sign Up, Dashboard, Create User, Contacts (List/Kanban/Form), Products (List/Kanban/Form), Chart of Accounts (List + separate New window), Journals (List + separate New window), Journal Entries (List + separate New window), Budget, Budget Revised, Budget Report (List + Kanban), Purchase Order, Vendor Bill, Bill Payment, Sales Order, Customer Invoice, Invoice Register, Profit & Loss, Sales Sheet.
- To keep the count at exactly 29, an "Invoice Payment" screen and a stand-alone "Analytical Account master" screen were **not** made separate windows — the invoice's own "Pay" action and the Budget form's "Analytic Account" dropdown cover that functionality without adding two extra screens. A "Balance Sheet" report was omitted for the same reason since it wasn't in your explicit list — flag if you'd like it swapped in for one of the 29.
- Every screen deliberately reuses the same header/shell pattern (logo placeholder, buttons, search) so Stitch treats them as one connected app rather than 29 disconnected mockups.
- Wherever "App LoGo" appeared in the original wireframe, the prompts above say "empty logo placeholder" on purpose — swap in the real logo asset after export.
