import express from 'express';
import { connectDatabase } from './config/database.js';
import { apiRouter } from './routes/api.js';
const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express.json());
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', apiBaseUrl });
});
app.use('/api', apiRouter);
app.listen(port, async () => {
    console.log(`OctoFit Tracker API listening on ${apiBaseUrl}`);
    await connectDatabase();
});
