"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

interface ExplanationPanelProps {
  explanation: string
  disclaimer: string
}

export function ExplanationPanel({ explanation, disclaimer }: ExplanationPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="p-6 bg-card border-border">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between text-left">
        <h3 className="text-lg font-semibold text-foreground">Methodology & Data Sources</h3>
        <span className="text-muted-foreground">{isOpen ? "▼" : "▶"}</span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4 text-sm">
          <div>
            <h4 className="font-medium text-foreground mb-2">How It Works</h4>
            <p className="text-muted-foreground leading-relaxed">{explanation}</p>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-2">Data Sources</h4>
            <ul className="space-y-1 text-muted-foreground list-disc list-inside">
              <li>NASA Earth Observations (NEO) - Temperature & Precipitation</li>
              <li>NOAA Climate Data - Historical Weather Patterns</li>
              <li>ERA5 Reanalysis - Wind Speed & Humidity</li>
              <li>MODIS - Surface Temperature & Cloud Cover</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-2">Calculation Method</h4>
            <ul className="space-y-1 text-muted-foreground list-disc list-inside">
              <li>Historical climatology analysis (30-year baseline)</li>
              <li>Threshold exceedance probability calculation</li>
              <li>Confidence intervals based on data quality & coverage</li>
              <li>Heat index & wind chill computed from temperature & humidity</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground italic">⚠️ {disclaimer}</p>
          </div>
        </div>
      )}
    </Card>
  )
}
