/**
 * خزمەتگوزاری کاتەکانی بانگ بە بەکارهێنانی APIـی AlAdhan.
 * https://api.aladhan.com/v1
 */
import { CityInfo } from '../types';

export interface AlAdhanTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
  Firstthird: string;
  Lastthird: string;
}

export interface AlAdhanResponse {
  code: number;
  status: string;
  data: {
    timings: AlAdhanTimings;
    date: {
      readable: string;
      timestamp: string;
      hijri: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string; ar: string };
        month: { number: number; en: string; ar: string; days: number };
        year: string;
        designation: { abbreviated: string; expanded: string };
        holidays: string[];
        adjustedHolidays: string[];
        method: string;
      };
      gregorian: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string };
        month: { number: number; en: string };
        year: string;
        designation: { abbreviated: string; expanded: string };
        lunarSighting: boolean;
      };
    };
    meta: {
      latitude: number;
      longitude: number;
      timezone: string;
      method: {
        id: number;
        name: string;
        params: { Fajr: number; Isha: number };
        location: { latitude: number; longitude: number };
      };
      latitudeAdjustmentMethod: string;
      midnightMode: string;
      school: string;
      offset: Record<string, number>;
    };
  };
}

export interface PrayerTimings {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  [key: string]: string;
}

/**
 * وەرگرتنی کاتەکانی بانگ بۆ شارێکی دیاریکراو لە APIـی AlAdhan.
 */
export async function fetchPrayerTimes(
  city: CityInfo,
  date?: Date
): Promise<PrayerTimings | null> {
  try {
    // بەرواری ئەمڕۆ بە شێوەی DD-MM-YYYY
    const now = date || new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const dateStr = `${day}-${month}-${year}`;

    // داواکاری بۆ API
    const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${city.latitude}&longitude=${city.longitude}&method=3&school=0`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: AlAdhanResponse = await response.json();

    if (data.code !== 200 || !data.data?.timings) {
      throw new Error('Invalid API response');
    }

    const timings = data.data.timings;

    return {
      fajr: timings.Fajr,
      sunrise: timings.Sunrise,
      dhuhr: timings.Dhuhr,
      asr: timings.Asr,
      maghrib: timings.Maghrib,
      isha: timings.Isha,
    };
  } catch (error) {
    console.error('Failed to fetch prayer times:', error);
    return null;
  }
}

/**
 * وەرگرتنی کاتەکانی بانگ بۆ شارێک بە ناو (بەبێ پێویست بە کۆئۆردینات).
 */
export async function fetchPrayerTimesByCity(
  cityName: string,
  country: string = 'Iraq',
  date?: Date
): Promise<PrayerTimings | null> {
  try {
    const now = date || new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const dateStr = `${day}-${month}-${year}`;

    const url = `https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=${encodeURIComponent(cityName)}&country=${encodeURIComponent(country)}&method=3&school=0`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: AlAdhanResponse = await response.json();

    if (data.code !== 200 || !data.data?.timings) {
      throw new Error('Invalid API response');
    }

    const timings = data.data.timings;

    return {
      fajr: timings.Fajr,
      sunrise: timings.Sunrise,
      dhuhr: timings.Dhuhr,
      asr: timings.Asr,
      maghrib: timings.Maghrib,
      isha: timings.Isha,
    };
  } catch (error) {
    console.error('Failed to fetch prayer times by city:', error);
    return null;
  }
}