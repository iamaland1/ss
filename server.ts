import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Persistent Announcements File Path
const DATA_DIR = path.join(__dirname, 'data');
const ANNOUNCEMENTS_FILE = path.join(DATA_DIR, 'announcements.json');

if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    console.error('Failed to create data dir', e);
  }
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  category: 'friday' | 'reminder' | 'hadith' | 'announcement' | 'update';
  priority: 'urgent' | 'normal';
  createdAt: string;
  scheduledAt?: string;
  isPinned?: boolean;
  author?: string;
}

const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'بیرخستنەوەی ڕۆژی جومعە',
    message: 'زۆرکردنی دروود و سڵاوات لەسەر پێغەمبەری خودا ﷺ لەم ڕۆژە پیرۆزەدا و خوێندنی سوورەتی الکهف لەبیر مەکەن.',
    category: 'friday',
    priority: 'urgent',
    createdAt: new Date().toISOString(),
    isPinned: true,
    author: 'بەڕێوەبەری سیرات'
  },
  {
    id: 'ann-2',
    title: 'فەرموودەی پیرۆزی پێغەمبەر ﷺ',
    message: 'قال رسول الله ﷺ: «مَنْ قَرَأَ حَرْفًا مِنْ كِتَابِ اللَّهِ فَلَهُ بِهِ حَسَنَةٌ، وَالحَسَنَةُ بِعَشْرِ أَمْثَالِهَا».',
    category: 'hadith',
    priority: 'normal',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    isPinned: false,
    author: 'بەڕێوەبەری سیرات'
  },
  {
    id: 'ann-3',
    title: 'نوێکردنەوەی ئەپی سیرات',
    message: 'بەخێربێن بۆ وەشانە نوێیەکەی ئەپی سیرات بە زیادکردنی هەموو خزمەتگوزارییەکان: کاتی بانگ، قورئان بە دەنگ، تەسبیح، دوعا و زیکر، قیبلە و تەقویمی کۆچی.',
    category: 'update',
    priority: 'normal',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    isPinned: false,
    author: 'سیستەم'
  }
];

function loadAnnouncements(): Announcement[] {
  try {
    if (fs.existsSync(ANNOUNCEMENTS_FILE)) {
      const data = fs.readFileSync(ANNOUNCEMENTS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not read announcements file, using defaults:', err);
  }
  saveAnnouncements(DEFAULT_ANNOUNCEMENTS);
  return DEFAULT_ANNOUNCEMENTS;
}

function saveAnnouncements(items: Announcement[]) {
  try {
    fs.writeFileSync(ANNOUNCEMENTS_FILE, JSON.stringify(items, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save announcements to file:', err);
  }
}

// In-memory cache synced with disk
let announcements: Announcement[] = loadAnnouncements();

// --- API Endpoints ---
app.get('/api/announcements', (_req: Request, res: Response) => {
  res.json({ success: true, announcements });
});

app.post('/api/announcements', (req: Request, res: Response) => {
  const { title, message, category, priority, scheduledAt, isPinned, author } = req.body;
  if (!title || !message) {
    return res.status(400).json({ success: false, error: 'Title and message are required' });
  }

  const newAnnouncement: Announcement = {
    id: `ann-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: String(title).trim(),
    message: String(message).trim(),
    category: category || 'announcement',
    priority: priority || 'normal',
    createdAt: new Date().toISOString(),
    scheduledAt: scheduledAt || undefined,
    isPinned: Boolean(isPinned),
    author: author || 'بەڕێوەبەری سیرات'
  };

  announcements = [newAnnouncement, ...announcements];
  saveAnnouncements(announcements);

  res.status(201).json({ success: true, announcement: newAnnouncement });
});

app.delete('/api/announcements/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLength = announcements.length;
  announcements = announcements.filter(a => a.id !== id);
  if (announcements.length === initialLength) {
    return res.status(404).json({ success: false, error: 'Announcement not found' });
  }
  saveAnnouncements(announcements);
  res.json({ success: true, message: 'Deleted successfully' });
});

app.patch('/api/announcements/:id/pin', (req: Request, res: Response) => {
  const { id } = req.params;
  const target = announcements.find(a => a.id === id);
  if (!target) {
    return res.status(404).json({ success: false, error: 'Announcement not found' });
  }
  target.isPinned = !target.isPinned;
  saveAnnouncements(announcements);
  res.json({ success: true, announcement: target });
});

// Admin verification endpoint
app.post('/api/admin/verify', (req: Request, res: Response) => {
  const { pin } = req.body;
  // Default PIN is 1234 or sirat2026
  if (pin === '1234' || pin === 'sirat2026' || pin === 'admin') {
    return res.json({ success: true, authorized: true });
  }
  res.status(401).json({ success: false, error: 'Invalid PIN' });
});

// Mount Vite or serve static dist
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sirat server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
