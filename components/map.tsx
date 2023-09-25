'use client'

import 'mapbox-gl/dist/mapbox-gl.css'

import { useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

type MapProps = {
  center?: [number, number]
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string

export default function Map({ center }: MapProps) {
  useEffect(() => {
    const centerCoordinates: [number, number] = center
      ? [center[1], center[0]]
      : [-99.29011, 39.39172]

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: centerCoordinates,
      zoom: 3,
    })

    map.addControl(new mapboxgl.NavigationControl())
    new mapboxgl.Marker({ color: '#ff5a5f' }).setLngLat(centerCoordinates).addTo(map)
  }, [center])

  return <div id="map" className="h-[40vh] rounded-lg" />
}
