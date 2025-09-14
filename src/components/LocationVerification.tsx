'use client';

import { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface LocationData {
  country: string;
  state?: string;
  city?: string;
  isUS: boolean;
  isRestricted: boolean;
  restrictedReason?: string;
}

const RESTRICTED_STATES = ['AL', 'AK', 'HI', 'NV', 'UT'];

export default function LocationVerification() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    verifyLocation();
  }, []);

  const verifyLocation = async () => {
    try {
      setIsLoading(true);
      
      // Try to get location from IP geolocation
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      const locationData: LocationData = {
        country: data.country_code,
        state: data.region_code,
        city: data.city,
        isUS: data.country_code === 'US',
        isRestricted: data.country_code === 'US' && 
                     data.region_code && 
                     RESTRICTED_STATES.includes(data.region_code),
        restrictedReason: data.country_code === 'US' && 
                         data.region_code && 
                         RESTRICTED_STATES.includes(data.region_code) 
                         ? 'Service not available in your state due to local regulations'
                         : undefined
      };
      
      setLocation(locationData);
    } catch (err) {
      console.error('Location verification failed:', err);
      setError('Unable to verify location. Please ensure you are accessing from the United States.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-blue-800 font-medium">Verifying your location...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <XCircle className="h-5 w-5 text-red-600" />
          <div>
            <p className="text-red-800 font-medium">Location Verification Failed</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!location) {
    return null;
  }

  // Not in US
  if (!location.isUS) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <XCircle className="h-5 w-5 text-red-600" />
          <div>
            <p className="text-red-800 font-medium">Service Not Available</p>
            <p className="text-red-600 text-sm">
              GanaFácil is currently only available to residents of the United States. 
              You are accessing from {location.country}.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // In US but restricted state
  if (location.isRestricted) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <div>
            <p className="text-yellow-800 font-medium">Service Restricted in Your State</p>
            <p className="text-yellow-600 text-sm">
              {location.restrictedReason}
            </p>
            <p className="text-yellow-600 text-sm mt-1">
              We apologize for the inconvenience. Please check back later or contact support for more information.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // All good - in US and not restricted
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-3">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <div>
          <p className="text-green-800 font-medium">Location Verified</p>
          <p className="text-green-600 text-sm">
            Welcome! You are accessing from {location.city}, {location.state}, United States. 
            All services are available in your location.
          </p>
        </div>
      </div>
    </div>
  );
}

// Hook for location verification
export function useLocationVerification() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyLocation = async () => {
      try {
        setIsLoading(true);
        
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        const locationData: LocationData = {
          country: data.country_code,
          state: data.region_code,
          city: data.city,
          isUS: data.country_code === 'US',
          isRestricted: data.country_code === 'US' && 
                       data.region_code && 
                       RESTRICTED_STATES.includes(data.region_code),
          restrictedReason: data.country_code === 'US' && 
                           data.region_code && 
                           RESTRICTED_STATES.includes(data.region_code) 
                           ? 'Service not available in your state due to local regulations'
                           : undefined
        };
        
        setLocation(locationData);
      } catch (err) {
        console.error('Location verification failed:', err);
        setError('Unable to verify location');
      } finally {
        setIsLoading(false);
      }
    };

    verifyLocation();
  }, []);

  return { location, isLoading, error };
}
