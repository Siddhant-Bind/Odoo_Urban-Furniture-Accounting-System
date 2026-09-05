import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes.js';
import contactsRoutes from './modules/contacts/contacts.routes.js';
import productsRoutes from './modules/products/products.routes.js';
import accountRoutes from './modules/accounting/account.routes.js';
import journalRoutes from './modules/accounting/journal.routes.js';
import journalEntryRoutes from './modules/accounting/journalEntry.routes.js';
import purchaseRoutes from './modules/purchase/purchase.routes.js';
import salesRoutes from './modules/sales/sales.routes.js';
import reportsRoutes from './modules/reports/reports.routes.js';
import budgetRoutes from './modules/budget/budget.routes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('src/uploads'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/journals', journalRoutes);
app.use('/api/journal-entries', journalEntryRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/budgets', budgetRoutes);

app.use(errorHandler); // must be last

export default app;
