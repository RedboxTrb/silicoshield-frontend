export interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  country?: string;
  source: 'gps' | 'ip';
}

export async function requestUserLocation(): Promise<LocationData | null> {
  // First, try to get GPS location with user permission
  if ('geolocation' in navigator) {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
          enableHighAccuracy: false
        });
      });

      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        source: 'gps'
      };
    } catch (error) {
      console.log('GPS location denied or unavailable, falling back to IP geolocation');
    }
  }

  // Fallback to IP-based geolocation
  try {
    // Try ip-api.com first (free, no rate limit for non-commercial use)
    const response = await fetch('http://ip-api.com/json/');
    if (!response.ok) {
      // Fallback to ipapi.co
      const response2 = await fetch('https://ipapi.co/json/');
      if (!response2.ok) throw new Error('All IP geolocation services failed');

      const data = await response2.json();
      return {
        latitude: data.latitude,
        longitude: data.longitude,
        city: data.city,
        state: data.region,
        country: data.country_name,
        source: 'ip'
      };
    }

    const data = await response.json();

    if (data.status === 'fail') throw new Error('Geolocation failed');

    return {
      latitude: data.lat,
      longitude: data.lon,
      city: data.city,
      state: data.regionName,
      country: data.country,
      source: 'ip'
    };
  } catch (error) {
    console.error('Failed to get location:', error);
    return null;
  }
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export interface Hospital {
  name: string;
  address: string;
  phone?: string;
  distance: number;
  type: string;
}

export async function findNearbyHospitals(location: LocationData): Promise<Hospital[]> {
  // Use Google Places API or similar service
  // For now, returning mock data based on location

  // In production, you would call an API like:
  // const response = await fetch(`/api/hospitals?lat=${location.latitude}&lng=${location.longitude}`);

  // Mock hospitals for demonstration
  const mockHospitals: Hospital[] = [
    {
      name: 'Pulmonary Care Center',
      address: `Near ${location.city || 'your location'}`,
      phone: '+1-XXX-XXX-XXXX',
      distance: 2.3,
      type: 'Pulmonology Specialist'
    },
    {
      name: 'City Medical Center - Respiratory Unit',
      address: `${location.city || 'Local'} Medical District`,
      phone: '+1-XXX-XXX-XXXX',
      distance: 4.7,
      type: 'General Hospital'
    },
    {
      name: 'Occupational Health Clinic',
      address: `Downtown ${location.city || 'area'}`,
      phone: '+1-XXX-XXX-XXXX',
      distance: 5.2,
      type: 'Occupational Medicine'
    }
  ];

  return mockHospitals.sort((a, b) => a.distance - b.distance);
}
