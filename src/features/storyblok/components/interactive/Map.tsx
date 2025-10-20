'use client'
import MapboxMap from '@/components/ui/organisms/MapboxMap'
import { SbMap } from '@storyblok/types/287435740670216/storyblok-components'
import { SbBlokData } from '@storyblok/react'
import { storyblokEditable } from '@storyblok/react/rsc'

export default function Map({ blok }: { blok: SbMap }) {
  const geojson = blok.geojson
    ? (JSON.parse(blok.geojson as string) as GeoJSON.FeatureCollection)
    : undefined

  return (
    <div
      {...storyblokEditable(blok as SbBlokData)}
      className="h-full w-full overflow-hidden rounded-lg"
    >
      <MapboxMap
        center={[Number(blok.longitude), Number(blok.latitude)]}
        zoom={Number(blok.zoom)}
        geojson={geojson}
      />
    </div>
  )
}
