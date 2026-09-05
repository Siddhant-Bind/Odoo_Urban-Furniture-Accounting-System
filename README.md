server/
├── prisma/
│   ├── schema.prisma                    # single source of truth — all 17 tables
│   ├── migrations/                      # auto-generated, don't hand-edit
│   └── seed.js                          # demo data (Rahul Sharma, Nimesh Pathak, Office Chair...)
│
├── src/
│   ├── config/
│   │   ├── prisma.js                    # single shared PrismaClient instance
│   │   └── env.js                       # loads/validates .env vars
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js            # verifies JWT, attaches req.user
│   │   ├── roleMiddleware.js            # restricts by ADMIN / INVOICING_USER / CONTACT
│   │   ├── uploadMiddleware.js          # multer config for local image storage
│   │   └── errorHandler.js              # centralized error → JSON response
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.controller.js       # login, signup
│   │   │   └── auth.service.js          # bcrypt hashing, JWT signing/verifying
│   │   │
│   │   ├── contacts/
│   │   │   ├── contact.routes.js
│   │   │   └── contact.controller.js    # CRUD; uses uploadMiddleware for profileImage
│   │   │
│   │   ├── products/
│   │   │   ├── product.routes.js
│   │   │   └── product.controller.js
│   │   │
│   │   ├── accounting/                  # Chart of Accounts + Journals + the ledger engine
│   │   │   ├── account.routes.js
│   │   │   ├── account.controller.js
│   │   │   ├── journal.routes.js
│   │   │   ├── journal.controller.js
│   │   │   ├── journalEntry.routes.js
│   │   │   ├── journalEntry.controller.js   # list/view posted & draft entries
│   │   │   └── ledger.service.js        # ⭐ core double-entry posting engine — imported by purchase & sales modules
│   │   │
│   │   ├── purchase/
│   │   │   ├── purchase.routes.js
│   │   │   ├── purchaseOrder.controller.js
│   │   │   ├── vendorBill.controller.js     # on confirm → calls ledger.service.js
│   │   │   └── billPayment.controller.js
│   │   │
│   │   ├── sales/
│   │   │   ├── sales.routes.js
│   │   │   ├── salesOrder.controller.js
│   │   │   ├── customerInvoice.controller.js # on confirm → calls ledger.service.js
│   │   │   └── invoicePayment.controller.js
│   │   │
│   │   ├── budget/
│   │   │   ├── budget.routes.js
│   │   │   ├── budget.controller.js         # Draft/Confirm/Revise/Cancel lifecycle
│   │   │   └── analyticAccount.controller.js
│   │   │
│   │   └── reports/
│   │       ├── reports.routes.js
│   │       ├── balanceSheet.controller.js   # reads JournalEntryLine grouped by Account.type
│   │       ├── profitLoss.controller.js
│   │       └── budgetReport.controller.js
│   │
│   ├── uploads/                          # local image storage (gitignored, keep .gitkeep)
│   │   ├── contacts/
│   │   └── products/
│   │
│   ├── utils/
│   │   ├── generateSequence.js          # PO/Bill/Invoice auto-numbering (P00001, Bill/2026/0001...)
│   │   └── validators.js                # request payload validation helpers
│   │
│   ├── app.js                            # Express app: middleware + all module routes mounted
│   └── server.js                         # entry point — app.listen()
│
├── .env                                   # DATABASE_URL="file:./dev.db", JWT_SECRET=...
├── .gitignore                             # node_modules, uploads/*, dev.db, .env
└── package.json