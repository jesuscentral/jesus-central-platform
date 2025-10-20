import mapboxgl from 'mapbox-gl'

export const createMarkerElement = (
  feature: { properties: { name: string } } & GeoJSON.Feature,
  map: mapboxgl.Map,
) => {
  const el = document.createElement('div')
  el.className = 'custom-marker'
  el.style.backgroundImage = 'url(/favicon.svg)'
  el.style.backgroundSize = 'contain'
  el.style.backgroundRepeat = 'no-repeat'
  el.style.backgroundPosition = 'center'
  el.style.width = '48px'
  el.style.height = '48px'
  el.style.cursor = 'pointer'
  el.style.filter =
    'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'

  const popup = new mapboxgl.Popup({
    offset: 25,
    closeButton: true,
    closeOnClick: false,
    className: 'custom-popup',
  }).setHTML(`
          <div style="padding: 8px; font-family: var(--font-body), sans-serif;">
            <h3 style="margin: 0 0 4px 0; font-family: var(--font-heading), sans-serif; font-size: 16px; font-weight: 700; color: #161615;">${feature.properties.name || 'Jesus Central Church'}</h3>
          </div>
        `)

  const marker = new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    // @ts-expect-error typing issue in mapbox-gl
    .setLngLat(feature.geometry.coordinates as mapboxgl.LngLatLike)
    .setPopup(popup)
    .addTo(map)

  setTimeout(() => {
    popup.addTo(map)
  }, 500)

  return marker
}
