"use client";

import { createMarkerElement } from "@/lib/mapbox";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";

interface MapboxMapProps {
  center?: [number, number];
  zoom?: number;
  style?: string;
  geojson?: GeoJSON.FeatureCollection;
}

export default function MapboxMap({
  center = [4.68635902, 52.02057661],
  zoom = 18,
  style = "mapbox://styles/mapbox/standard",
  geojson,
}: MapboxMapProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Guard: Prevent multiple initializations
    if (mapRef.current) return;

    // Set access token
    mapboxgl.accessToken = process.env
      .NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

    if (!mapContainerRef.current) return;

    // Initialize map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
      style: style,
      attributionControl: false,
      preserveDrawingBuffer: false,
      antialias: true,
      maxZoom: 20,
      minZoom: 10,
    });

    mapRef.current = map;

    // Add controls with positioning
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.addControl(
      new mapboxgl.FullscreenControl({
        container: mapContainerRef.current,
      }),
      "top-right"
    );
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      "top-right"
    );
    map.addControl(new mapboxgl.ScaleControl(), "bottom-right");
    map.addControl(
      new mapboxgl.AttributionControl({
        compact: true,
      }),
      "bottom-left"
    );

    // Wait for map to load before adding markers
    map.on("load", () => {
      setMapLoaded(true);

      if (geojson) {
        map.addSource("geojson", {
          type: "geojson",
          data: geojson,
        });

        map.addLayer({
          id: "geojson",
          type: "building",
          source: "geojson",
        });

        for (const feature of geojson.features) {
          createMarkerElement(feature, map);
        }
      }
    });

    // Cleanup function
    return () => {
      // Remove all markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      // Remove map
      map.remove();
      mapRef.current = null;
      setMapLoaded(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount - prop changes handled in separate useEffect

  // Handle prop changes without recreating the map
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    mapRef.current.setCenter(center);
    mapRef.current.setZoom(zoom);

    // Update marker position
    if (markersRef.current[0]) {
      markersRef.current[0].setLngLat(center);
    }
  }, [center, zoom, mapLoaded]);

  return (
    <div
      ref={mapContainerRef}
      className="h-full w-full min-h-[200px] min-w-[200px] rounded-lg overflow-hidden"
      style={{
        minHeight: "200px",
        minWidth: "200px",
      }}
    />
  );
}
