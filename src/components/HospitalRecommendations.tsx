import { useState, useEffect } from 'react';
import { MapPin, Phone, Navigation, Building2 } from 'lucide-react';
import type { LocationData, Hospital } from '../services/locationService';
import { findNearbyHospitals } from '../services/locationService';

interface HospitalRecommendationsProps {
  show: boolean;
  userLocation: LocationData | null;
}

export function HospitalRecommendations({ show, userLocation }: HospitalRecommendationsProps) {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (show) {
      setLoading(true);
      // Use default location if not available
      const location = userLocation || {
        latitude: 0,
        longitude: 0,
        city: 'your area',
        state: '',
        country: '',
        source: 'ip' as const
      };

      findNearbyHospitals(location)
        .then(setHospitals)
        .finally(() => setLoading(false));
    }
  }, [show, userLocation]);

  if (!show) return null;

  return (
    <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-6">
      <div className="flex items-start gap-3 mb-4">
        <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-400 mb-2">
            Healthcare Near You
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-300/80 mb-4">
            For your convenience, here are nearby pulmonology specialists and respiratory health clinics where you can get professional medical consultation if needed.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full"></div>
        </div>
      ) : hospitals.length > 0 ? (
        <div className="space-y-3">
          {hospitals.map((hospital, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-blue-200 dark:border-blue-900/50"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                    {hospital.name}
                  </h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>{hospital.address}</span>
                    </div>
                    {hospital.phone && (
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <a
                          href={`tel:${hospital.phone}`}
                          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {hospital.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-xs text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                        <Navigation className="w-3 h-3" />
                        {hospital.distance.toFixed(1)} km away
                      </span>
                      <span className="inline-flex items-center text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                        {hospital.type}
                      </span>
                    </div>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(
                    hospital.name + ' ' + hospital.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors whitespace-nowrap"
                >
                  <MapPin className="w-4 h-4" />
                  Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-blue-700 dark:text-blue-400">
          <p className="text-sm font-medium mb-2">
            Nearby healthcare facilities
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-500">
            Search for pulmonology specialists or occupational health clinics in your area for professional consultation.
          </p>
        </div>
      )}

      {userLocation && (
        <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-900/50">
          <p className="text-xs text-blue-700 dark:text-blue-400">
            <strong>Location:</strong> {userLocation.city || 'Unknown'}, {userLocation.state || userLocation.country || 'Location detected'} ({userLocation.source === 'gps' ? 'GPS' : 'IP-based'})
          </p>
        </div>
      )}
    </div>
  );
}
