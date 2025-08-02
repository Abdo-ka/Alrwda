"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Navigation, ExternalLink } from "lucide-react";

interface InteractiveMapProps {
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export default function InteractiveMap({ address, coordinates }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  // For this example, I'll use Google Maps coordinates for Aleppo, Syria
  // Plus code: 643R+R72 corresponds to approximate coordinates
  const location = coordinates || {
    lat: 36.204708,
    lng: 37.140884
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const appleMapsUrl = `http://maps.apple.com/?q=${encodeURIComponent(address)}`;

  useEffect(() => {
    // Create embedded Google Maps iframe using place embed
    if (mapRef.current) {
      const iframe = document.createElement('iframe');
      
      // Using Google Maps place embed for better location display
      const encodedAddress = encodeURIComponent(address);
      iframe.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dQWTzus-6POk6Y&q=${encodedAddress}&center=${location.lat},${location.lng}&zoom=15`;
      
      // Fallback to search embed if place embed doesn't work
      const fallbackSrc = `https://www.google.com/maps/embed/v1/search?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dQWTzus-6POk6Y&q=${encodedAddress}`;
      
      // Use a more compatible embed URL without API key requirement
      iframe.src = `https://maps.google.com/maps?q=${location.lat},${location.lng}&hl=en&z=15&output=embed`;
      
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.style.border = '0';
      iframe.style.borderRadius = '0.5rem';
      iframe.allowFullscreen = true;
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.title = 'Alrwda Islamic Clocks Location - Google Maps';

      // Clear existing content and add iframe
      mapRef.current.innerHTML = '';
      mapRef.current.appendChild(iframe);
    }
  }, [address, location]);

  const openInGoogleMaps = () => {
    window.open(googleMapsUrl, '_blank');
  };

  const openInAppleMaps = () => {
    window.open(appleMapsUrl, '_blank');
  };

  const getDirections = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    window.open(directionsUrl, '_blank');
  };

  return (
    <div className="space-y-4">
      {/* Interactive Map Container */}
      <div ref={mapRef} className="aspect-video w-full rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900 dark:to-emerald-800">
        {/* Loading fallback while iframe loads */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
              <Navigation className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Alrwda Islamic Clocks</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Loading Interactive Map...</p>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={getDirections}
          className="flex-1 min-w-[120px] bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Navigation className="w-4 h-4 mr-2" />
          Get Directions
        </Button>
        <Button 
          onClick={openInGoogleMaps}
          variant="outline"
          className="flex-1 min-w-[120px]"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Google Maps
        </Button>
        <Button 
          onClick={openInAppleMaps}
          variant="outline"
          className="flex-1 min-w-[120px]"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Apple Maps
        </Button>
      </div>

      {/* Location Details */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-semibold text-foreground mb-2">Location Details</h4>
        <p className="text-sm text-muted-foreground">{address}</p>
        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
          <span>Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}</span>
        </div>
      </div>
    </div>
  );
}
