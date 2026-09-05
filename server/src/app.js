import express from 'express';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('src/uploads'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
// other modules mount here in later phases

app.use(errorHandler); // must be last

export default app;