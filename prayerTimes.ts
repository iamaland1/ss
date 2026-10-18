/**
 * خزمەتگوزاری حیسابکردن و ڕێکخستنی کاتی نوێژەکان.
 */
import { PrayerTimings, CityInfo } from '../types';

/**
 * Astronomical offline prayer times calculation fallback
 */
function degToRad(deg: number): number {
  return (deg * Math.PI) / 180.0;
}

function radToDeg(rad: number): number {
  return (rad * 180.0) / Math.PI;
}

// Compute Julian Date
function getJulianDate(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  return (
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day +
    b -
    1524.5
  );
}

// Solar coordinates
function getSunCoordinates(julianDate: number) {
  const d = julianDate - 2451545.0;
  const g = 357.529 + 0.98560028 * d;
  const q = 280.459 + 0.98564736 * d;
  const L = q + 1.915 * Math.sin(degToRad(g)) + 0.02 * Math.sin(degToRad(2 * g));
  const e = 23.439 - 0.00000036 * d;

  const ra = radToDeg(
    Math.atan2(Math.cos(degToRad(e)) * Math.sin(degToRad(L)), Math.cos(degToRad(L)))
  ) / 15.0;
  const dRa = (ra + 24) % 24;
  const sinDec = Math.sin(degToRad(e)) * Math.sin(degToRad(L));
  const dec = radToDeg(Math.asin(sinDec));
  const eqt = q / 15.0 - dRa;

  return { declination: dec, equationOfTime: eqt };
}

// Offline prayer time estimation (Muslim World League / Awqaf Kurdistan parameters)
export function calculateOfflinePrayers(date: Date, city: CityInfo): PrayerTimings {
  const jd = getJulianDate(date);
  const { declination, equationOfTime } = getSunCoordinates(jd);
  const lat = city.latitude;
  const lng = city.longitude;

  // Timezone offset in hours (Iraq / Kurdistan is UTC+3)
  const tz = 3;

  // Midday (Dhuhr)
  const dhuhrTime = 12 + tz - lng / 15.0 - equationOfTime;

  // Fajr angle (-18 deg)
  const fajrAngle = 18;
  const fajrHourAngle =
    (1 / 15.0) *
    radToDeg(
      Math.acos(
        (-Math.sin(degToRad(fajrAngle)) -
          Math.sin(degToRad(lat)) * Math.sin(degToRad(declination))) /
          (Math.cos(degToRad(lat)) * Math.cos(degToRad(declination)))
      )
    );
  const fajrTime = dhuhrTime - fajrHourAngle;

  // Sunrise (0.833 deg depression)
  const sunriseHourAngle =
    (1 / 15.0) *
    radToDeg(
      Math.acos(
        (-Math.sin(degToRad(0.833)) -
          Math.sin(degToRad(lat)) * Math.sin(degToRad(declination))) /
          (Math.cos(degToRad(lat)) * Math.cos(degToRad(declination)))
      )
    );
  const sunriseTime = dhuhrTime - sunriseHourAngle;
  const maghribTime = dhuhrTime + sunriseHourAngle;

  // Asr (Shafi'i / Standard: shadow length = 1)
  const asrAlt = radToDeg(
    Math.atan(1 / (1 + Math.tan(degToRad(Math.abs(lat - declination)))))
  );
  const asrHourAngle =
    (1 / 15.0) *
    radToDeg(
      Math.acos(
        (Math.sin(degToRad(asrAlt)) -
          Math.sin(degToRad(lat)) * Math.sin(degToRad(declination))) /
          (Math.cos(degToRad(lat)) * Math.cos(degToRad(declination)))
      )
    );
  const asrTime = dhuhrTime + asrHourAngle;

  // Isha (-17 deg)
  const ishaAngle = 17;
  const ishaHourAngle =
    (1 / 15.0) *
    radToDeg(
      Math.acos(
        (-Math.sin(degToRad(ishaAngle)) -
          Math.sin(degToRad(lat)) * Math.sin(degToRad(declination))) /
          (Math.cos(degToRad(lat)) * Math.cos(degToRad(declination)))
      )
    );
  const ishaTime = dhuhrTime + ishaHourAngle;

  const formatHours = (hours: number, offsetMinutes = 0): string => {
    let totalMins = Math.round(hours * 60 + offsetMinutes);
    while (totalMins < 0) totalMins += 24 * 60;
    while (totalMins >= 24 * 60) totalMins -= 24 * 60;
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  const offsets = city.offsetMinutes || {};

  return {
    fajr: formatHours(fajrTime, offsets.fajr || 0),
    sunrise: formatHours(sunriseTime, 0),
    dhuhr: formatHours(dhuhrTime, offsets.dhuhr || 0),
    asr: formatHours(asrTime, offsets.asr || 0),
    maghrib: formatHours(maghribTime, offsets.maghrib || 0),
    isha: formatHours(ishaTime, offsets.isha || 0),
  };
}

/**
 * Fetch prayer times from AlAdhan API with automatic fallback
 */
export async function getPrayerTimes(date: Date, city: CityInfo): Promise<PrayerTimings> {
  const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${city.latitude}&longitude=${city.longitude}&method=3`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data.timings) {
        const timings = json.data.timings;
        const cleanTime = (t: string) => t.split(' ')[0].substring(0, 5);

        return {
          fajr: cleanTime(timings.Fajr),
          sunrise: cleanTime(timings.Sunrise),
          dhuhr: cleanTime(timings.Dhuhr),
          asr: cleanTime(timings.Asr),
          maghrib: cleanTime(timings.Maghrib),
          isha: cleanTime(timings.Isha),
        };
      }
    }
  } catch {
    // Graceful silent fallback to astronomical calculation
  }

  return calculateOfflinePrayers(date, city);
}

/**
 * Determine next prayer and time remaining
 */
export function getNextPrayerInfo(timings: PrayerTimings, now = new Date()) {
  const prayerOrder = [
    { key: 'fajr', time: timings.fajr },
    { key: 'sunrise', time: timings.sunrise },
    { key: 'dhuhr', time: timings.dhuhr },
    { key: 'asr', time: timings.asr },
    { key: 'maghrib', time: timings.maghrib },
    { key: 'isha', time: timings.isha },
  ];

  const currentMinutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

  for (let i = 0; i < prayerOrder.length; i++) {
    const p = prayerOrder[i];
    const [h, m] = p.time.split(':').map(Number);
    const prayerMinutes = h * 60 + m;

    if (prayerMinutes > currentMinutes) {
      const diffSecs = Math.max(0, Math.floor((prayerMinutes - currentMinutes) * 60));
      const hoursLeft = Math.floor(diffSecs / 3600);
      const minsLeft = Math.floor((diffSecs % 3600) / 60);
      const secsLeft = diffSecs % 60;

      // Previous prayer for progress
      const prevPrayer = i > 0 ? prayerOrder[i - 1] : prayerOrder[prayerOrder.length - 1];
      const prevMins = i > 0 ? Number(prevPrayer.time.split(':')[0]) * 60 + Number(prevPrayer.time.split(':')[1]) : 0;
      const totalInterval = prayerMinutes - prevMins;
      const elapsed = currentMinutes - prevMins;
      const progress = totalInterval > 0 ? Math.min(100, Math.max(0, (elapsed / totalInterval) * 100)) : 0;

      return {
        nextKey: p.key,
        nextTime: p.time,
        previousKey: prevPrayer.key,
        hoursLeft,
        minsLeft,
        secsLeft,
        progress,
        isTomorrow: false,
      };
    }
  }

  // After Isha, next is tomorrow's Fajr
  const [fH, fM] = prayerOrder[0].time.split(':').map(Number);
  const fajrTomorrowMinutes = 24 * 60 + (fH * 60 + fM);
  const diffSecs = Math.max(0, Math.floor((fajrTomorrowMinutes - currentMinutes) * 60));

  return {
    nextKey: 'fajr',
    nextTime: prayerOrder[0].time,
    previousKey: 'isha',
    hoursLeft: Math.floor(diffSecs / 3600),
    minsLeft: Math.floor((diffSecs % 3600) / 60),
    secsLeft: diffSecs % 60,
    progress: 0,
    isTomorrow: true,
  };
}

/**
 * Calculate distance in km to the Holy Kaaba (21.4225 N, 39.8262 E)
 */
export function getDistanceToKaaba(lat: number, lng: number): number {
  const kaabaLat = 21.422487;
  const kaabaLng = 39.826206;
  const R = 6371; // Earth radius in km

  const dLat = degToRad(kaabaLat - lat);
  const dLng = degToRad(kaabaLng - lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat)) *
      Math.cos(degToRad(kaabaLat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Calculate Qibla bearing from True North (0-360 degrees)
 */
export function getQiblaAngle(lat: number, lng: number): number {
  const kaabaLat = degToRad(21.422487);
  const kaabaLng = degToRad(39.826206);
  const phi = degToRad(lat);
  const lambda = degToRad(lng);

  const y = Math.sin(kaabaLng - lambda);
  const x =
    Math.cos(phi) * Math.tan(kaabaLat) -
    Math.sin(phi) * Math.cos(kaabaLng - lambda);

  let qibla = radToDeg(Math.atan2(y, x));
  qibla = (qibla + 360) % 360;
  return Math.round(qibla);
}
