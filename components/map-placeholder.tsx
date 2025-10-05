import { Card } from "@/components/ui/card"

interface MapPlaceholderProps {
  lat: number
  lon: number
  locationName: string
}

export function MapPlaceholder({ lat, lon, locationName }: MapPlaceholderProps) {
  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Location Map</h3>
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,30 50,50 T100,50" stroke="rgb(var(--color-primary))" fill="none" strokeWidth="0.5" />
            <path d="M0,60 Q25,40 50,60 T100,60" stroke="rgb(var(--color-primary))" fill="none" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="3" fill="rgb(var(--color-primary))" />
          </svg>
        </div>
        <div className="text-center space-y-2 z-10">
          <div className="text-4xl mb-2">📍</div>
          <p className="text-sm font-medium text-foreground">{locationName}</p>
          <p className="text-xs text-muted-foreground font-mono">
            {lat.toFixed(4)}°, {lon.toFixed(4)}°
          </p>
          <p className="text-xs text-muted-foreground mt-4">Interactive map coming soon</p>
        </div>
      </div>
    </Card>
  )
}
