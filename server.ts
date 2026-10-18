/**
 * سێرڤەری سەرەکی ئەپەکە بۆ خزمەتکردنی فایلەکانی ستاتیک و API.
 */
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ڕێگەپێدان بە JSON
app.use(express.json());

// خزمەتکردنی فایلەکانی ستاتیک
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// هەر ڕێگایەکی تر بگەڕێنەوە بۆ index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// دەستپێکردنی سێرڤەر
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});