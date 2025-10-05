import { Card } from "@/components/ui/card"

interface MapPlaceholderProps {
  lat: number
  lon: number
  locationName: string
}

export function MapPlaceholder({ lat, lon, locationName }: MapPlaceholderProps) {
  const safeLocationName = (locationName ?? "").trim()
  const hasLocationName = safeLocationName.length > 0
  const query = hasLocationName ? safeLocationName : `${lat},${lon}`
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=11&output=embed`
  const coordinatesLabel = `${lat.toFixed(4)}°, ${lon.toFixed(4)}°`
  const locationLabel = hasLocationName ? safeLocationName : "Selected location"
  const titleLabel = hasLocationName ? safeLocationName : coordinatesLabel

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Location Map</h3>
      <div className="space-y-3">
        <div className="aspect-video rounded-lg overflow-hidden border border-border bg-muted">
          <iframe
            key={mapSrc}
            src={mapSrc}
            title={`Map showing ${titleLabel}`}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground">{locationLabel}</p>
          <p className="font-mono text-xs">{coordinatesLabel}</p>
        </div>
      </div>
    </Card>
  )
}
