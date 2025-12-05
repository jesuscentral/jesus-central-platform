/* eslint-disable react-hooks/immutability */
'use client'

import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { SbAnimatedMap } from '@storyblok/types/287435740670216/storyblok-components'
import { storyblokEditable } from '@storyblok/react/rsc'
import { SbBlokData } from '@storyblok/react'

// Hardcoded demo points
const points = [
  {
    name: 'Jesus Central Church',
    coord: [4.68635902, 52.02057661],
    img: '/images/map/church.png',
  },
  {
    name: 'Groenhovenbad',
    coord: [4.690384467183321, 52.02297983173702],
    img: '/images/map/groenhovenbad.png',
  },
]

export default function AnimatedMap({ blok }: { blok: SbAnimatedMap }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const popupRef = useRef<mapboxgl.Popup | null>(null)
  const tourTimerRef = useRef<NodeJS.Timer | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Set your Mapbox token here
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

  useEffect(() => {
    function fitToAllPoints(map: mapboxgl.Map) {
      if (!points.length) return
      if (points.length === 1) {
        flyToPoint(points[0] as unknown as { coord: [number, number] }, map)
        return
      }
      const bounds = new mapboxgl.LngLatBounds()
      points.forEach((p) => bounds.extend(p.coord as [number, number]))
      map.fitBounds(bounds, {
        padding: 80,
        duration: 1200,
        maxZoom: 14,
      })
    }

    function addMarkers(map: mapboxgl.Map) {
      markersRef.current = points.map((p, idx) => {
        const el = document.createElement('div')
        el.style.width = '25px'
        el.style.height = '25px'
        el.style.borderRadius = '9999px'
        el.style.backgroundImage = `url(${p.img})`
        el.style.backgroundSize = 'contain'
        el.style.backgroundRepeat = 'no-repeat'
        el.style.backgroundPosition = 'center'
        el.style.boxShadow = '0 0 0 2px white, 0 0 0 4px rgba(0, 0, 0, .3)'
        el.style.cursor = 'pointer'
        el.addEventListener('click', () => {
          cleanupTour()
          setActiveIndex(idx)
          flyToPoint(p as unknown as { coord: [number, number] }, map)
          openPopup(
            p as unknown as { name: string; coord: [number, number] },
            map,
          )
        })
        return new mapboxgl.Marker({ element: el })
          .setLngLat(p.coord as [number, number])
          .addTo(map)
      })
    }

    function startTour() {
      if (!mapRef.current || !points.length) return
      cleanupTour()
      let i = 0
      setActiveIndex(i)
      flyToPoint(
        points[i] as unknown as { coord: [number, number] },
        mapRef.current,
      )
      const firstTimeout = window.setTimeout(() => {
        if (mapRef.current)
          openPopup(
            points[i] as unknown as { name: string; coord: [number, number] },
            mapRef.current,
          )
      }, 950)
      // @ts-expect-error typing issue in mapbox-gl
      tourTimerRef.firstTimeout = firstTimeout
      tourTimerRef.current = setInterval(() => {
        i = (i + 1) % points.length
        setActiveIndex(i)
        flyToPoint(
          points[i] as unknown as { coord: [number, number] },
          mapRef.current as mapboxgl.Map,
        )
        window.setTimeout(() => {
          if (mapRef.current)
            openPopup(
              points[i] as unknown as { name: string; coord: [number, number] },
              mapRef.current,
            )
        }, 1200)
      }, 3000)
    }

    if (!containerRef.current || mapRef.current) return

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      projection: 'globe',
      attributionControl: false,
    })

    map.addControl(
      new mapboxgl.NavigationControl({ visualizePitch: true }),
      'top-right',
    )

    map.on('load', () => {
      addMarkers(map)
      fitToAllPoints(map)
    })

    mapRef.current = map

    if (blok.animated) {
      startTour()
    }

    return () => {
      cleanupTour()
      markersRef.current.forEach((m) => m.remove())
      popupRef.current?.remove()
      map.remove()
      mapRef.current = null
    }
  }, [blok.animated])

  function openPopup(
    p: { name: string; coord: [number, number] },
    map: mapboxgl.Map,
  ) {
    popupRef.current?.remove()
    popupRef.current = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: true,
    })
      .setLngLat(p.coord)
      .setHTML(
        `<div style="padding: 8px; font-family: var(--font-body), sans-serif;">
            <h3 style="margin: 0 0 4px 0; font-family: var(--font-heading), sans-serif; font-size: 16px; font-weight: 700; color: #161615;">${p.name || 'Jesus Central Church'}</h3>
          </div>`,
      )
      .addTo(map)
  }

  function flyToPoint(p: { coord: [number, number] }, map: mapboxgl.Map) {
    map.stop()
    map.flyTo({
      center: p.coord,
      zoom: 15,
      pitch: 45,
      bearing: 10,
      duration: 1200,
      speed: 1.2,
      curve: 1.42,
    })
  }

  function cleanupTour() {
    if (tourTimerRef.current) {
      // @ts-expect-error typing issue in mapbox-gl
      clearInterval(tourTimerRef.current)
      tourTimerRef.current = null
    }
    // @ts-expect-error typing issue in mapbox-gl
    if (tourTimerRef.firstTimeout) {
      // @ts-expect-error typing issue in mapbox-gl
      clearTimeout(tourTimerRef.firstTimeout)
      // @ts-expect-error typing issue in mapbox-gl
      tourTimerRef.firstTimeout = null
    }
  }

  return (
    <div className="w-full" {...storyblokEditable(blok as SbBlokData)}>
      {blok.animated && (
        <div className="mb-3 flex items-center gap-2">
          {typeof activeIndex === 'number' && (
            <span className="ml-2 text-sm text-gray-600">
              Locatie: {points[activeIndex]?.name}
            </span>
          )}
        </div>
      )}
      <div
        ref={containerRef}
        className="h-[480px] w-full overflow-hidden rounded-2xl"
      />
    </div>
  )
}
