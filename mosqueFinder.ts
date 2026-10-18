/**
 * خزمەتگوزاری دۆزینەوەی نزیکترین مزگەوتەکان بە بەکارهێنانی OpenStreetMap و Overpass API.
 */

export interface Mosque {
  id: string;
  name: string;
  nameAr?: string;
  latitude: number;
  longitude: number;
  distance: number; // بە کیلۆمەتر
  address?: string;
}

interface OverpassElement {
  type: 'node' | 'way';
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

interface OverpassResponse {
  elements?: OverpassElement[];
}

/**
 * حیسابکردنی دووری نێوان دوو خاڵ بە فۆرمولەی Haversine (بە کیلۆمەتر).
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // نیوەتیرەی زەوی بە کیلۆمەتر
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * دۆزینەوەی مزگەوتەکان لە دەوروبەری شوێنێکی دیاریکراو.
 */
export async function findNearbyMosques(
  latitude: number,
  longitude: number,
  radiusKm: number = 5
): Promise<Mosque[]> {
  try {
    // داڕشتنی داواکاری بۆ Overpass API
    // ئەمە مزگەوتەکان دەدۆزێتەوە کە لە ناوچەی دیاریکراودان
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="place_of_worship"]["religion"="muslim"](around:${radiusKm * 1000},${latitude},${longitude});
        way["amenity"="place_of_worship"]["religion"="muslim"](around:${radiusKm * 1000},${latitude},${longitude});
      );
      out center;
    `;

    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: `data=${encodeURIComponent(query)}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error(`Overpass API error: ${response.status}`);
    }

    const data: OverpassResponse = await response.json();

    if (!data.elements || !Array.isArray(data.elements)) {
      return [];
    }

    // گۆڕینی داتاکان بۆ فۆرماتی خۆمان
    const mosques: Mosque[] = data.elements
      .map((element): Mosque | null => {
        // دۆزینەوەی کۆئۆردیناتەکان (بۆ node یان way)
        let lat: number | undefined;
        let lon: number | undefined;

        if (element.type === 'node') {
          lat = element.lat;
          lon = element.lon;
        } else if (element.type === 'way' && element.center) {
          lat = element.center.lat;
          lon = element.center.lon;
        }

        if (lat === undefined || lon === undefined) {
          return null;
        }

        // دۆزینەوەی ناو
        const tags = element.tags || {};
        const name =
          tags['name:ku'] ||
          tags['name:ar'] ||
          tags.name ||
          tags['name:en'] ||
          'مزگەوت';

        const nameAr = tags['name:ar'] || undefined;

        // دۆزینەوەی ناونیشان
        const address =
          tags['addr:street'] ||
          tags['addr:city'] ||
          tags['addr:full'] ||
          undefined;

        return {
          id: `${element.type}/${element.id}`,
          name,
          nameAr,
          latitude: lat,
          longitude: lon,
          distance: calculateDistance(latitude, longitude, lat, lon),
          address,
        };
      })
      .filter((mosque): mosque is Mosque => mosque !== null)
      // ڕێکخستن بەپێی دووری (نزیکترین یەکەم)
      .sort((a, b) => a.distance - b.distance);

    return mosques;
  } catch (error) {
    console.error('Failed to find nearby mosques:', error);
    return [];
  }
}