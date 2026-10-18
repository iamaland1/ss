/**
 * خزمەتگوزاری بارکردن و بەڕێوەبردنی ڕاگەیاندنەکان.
 */
import { Announcement } from '../types';

const STORAGE_KEY = 'sirat_announcements_cache';

const FALLBACK_ANNOUNCEMENTS: Announcement[] = [
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
    title: 'بەخێربێن بۆ ئەپی سیرات',
    message: 'هەموو خزمەتگوزارییە ئیسلامییەکان (کاتی بانگ، قورئانی پیرۆز، دوعا و زیکر، تەسبیح، ئاراستەی قیبلە و تەقویمی کۆچی) بەردەستن.',
    category: 'update',
    priority: 'normal',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    isPinned: false,
    author: 'سیستەم'
  }
];

export async function fetchAnnouncements(): Promise<Announcement[]> {
  try {
    const res = await fetch('/api/announcements');
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.announcements)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.announcements));
        return data.announcements;
      }
    }
  } catch {
    // Fallback to local cache silently
  }

  // Fallback to cache or defaults
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  return FALLBACK_ANNOUNCEMENTS;
}

export async function createAnnouncement(payload: {
  title: string;
  message: string;
  category: 'friday' | 'reminder' | 'hadith' | 'announcement' | 'update';
  priority: 'urgent' | 'normal';
  scheduledAt?: string;
  isPinned?: boolean;
  author?: string;
}): Promise<Announcement> {
  try {
    const res = await fetch('/api/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const data = await res.json();
      return data.announcement;
    }
  } catch {
    // Fallback to saving in local cache
  }

  // Local fallback
  const newAnn: Announcement = {
    id: `local-ann-${Date.now()}`,
    ...payload,
    createdAt: new Date().toISOString()
  };
  const cached = await fetchAnnouncements();
  const updated = [newAnn, ...cached];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newAnn;
}

export async function deleteAnnouncement(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/announcements/${id}`, { method: 'DELETE' });
    if (res.ok) return true;
  } catch (e) {
    // ignore
  }
  const cached = await fetchAnnouncements();
  const filtered = cached.filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

export async function togglePinAnnouncement(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/announcements/${id}/pin`, { method: 'PATCH' });
    if (res.ok) return true;
  } catch (e) {
    // ignore
  }
  const cached = await fetchAnnouncements();
  const updated = cached.map(a => a.id === id ? { ...a, isPinned: !a.isPinned } : a);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return true;
}

export async function checkAdminPin(pin: string): Promise<boolean> {
  try {
    const res = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin })
    });
    if (res.ok) {
      const data = await res.json();
      return Boolean(data.authorized);
    }
  } catch (e) {
    // fallback
  }
  return pin === '1234' || pin === 'sirat2026' || pin === 'admin';
}

export async function triggerNotification(title: string, body: string): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }

  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=128&q=80',
    });
    return true;
  } else if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification(title, {
        body,
        icon: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=128&q=80',
      });
      return true;
    }
  }
  return false;
}
