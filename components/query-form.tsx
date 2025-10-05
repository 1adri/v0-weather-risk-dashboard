"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import type { QueryParams } from "@/types"

interface QueryFormProps {
  onSubmit: (params: QueryParams) => void
  loading: boolean
}

export function QueryForm({ onSubmit, loading }: QueryFormProps) {
  const [locationInput, setLocationInput] = useState("")
  const [locationName, setLocationName] = useState("")
  const [lat, setLat] = useState("37.77")
  const [lon, setLon] = useState("-121.97")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [startDate, setStartDate] = useState("2025-10-04")
  const [endDate, setEndDate] = useState("")
  const [showRange, setShowRange] = useState(false)
  const [unitsTemp, setUnitsTemp] = useState<"C" | "F">("F")
  const [unitsWind, setUnitsWind] = useState<"MS" | "MPH">("MPH")
  const [showThresholds, setShowThresholds] = useState(false)
  const [thresholds, setThresholds] = useState({
    hot: 35,
    cold: 0,
    windy: 10,
    wet: 10,
    uncomfortable: 32,
  })

  // Mock location suggestions
  const mockSuggestions = [
    { name: "San Ramon, CA, USA", lat: 37.77, lon: -121.97 },
    { name: "San Francisco, CA, USA", lat: 37.77, lon: -122.42 },
    { name: "San Diego, CA, USA", lat: 32.72, lon: -117.16 },
    { name: "San Jose, CA, USA", lat: 37.34, lon: -121.89 },
  ]

  const filteredSuggestions =
    locationInput.length > 2
      ? mockSuggestions.filter((s) => s.name.toLowerCase().includes(locationInput.toLowerCase()))
      : []

  const handleLocationSelect = (suggestion: (typeof mockSuggestions)[0]) => {
    setLocationInput(suggestion.name)
    setLocationName(suggestion.name)
    setLat(suggestion.lat.toString())
    setLon(suggestion.lon.toString())
    setShowSuggestions(false)
  }

  const handleUseMyLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude.toFixed(2))
          setLon(position.coords.longitude.toFixed(2))
          setLocationName(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`)
          setLocationInput(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`)
        },
        (error) => {
          alert("Unable to get your location: " + error.message)
        },
      )
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!lat || !lon) {
      alert("Please select a valid location")
      return
    }

    onSubmit({
      locationName: locationName || locationInput,
      lat: Number.parseFloat(lat),
      lon: Number.parseFloat(lon),
      startDate,
      endDate: showRange ? endDate : undefined,
      unitsTemp,
      unitsWind,
      thresholds,
    })
  }

  const handleReset = () => {
    setLocationInput("")
    setLocationName("")
    setLat("37.77")
    setLon("-121.97")
    setStartDate("2025-10-04")
    setEndDate("")
    setShowRange(false)
    setUnitsTemp("F")
    setUnitsWind("MPH")
    setThresholds({
      hot: 35,
      cold: 0,
      windy: 10,
      wet: 10,
      uncomfortable: 32,
    })
  }

  return (
    <Card className="p-6 bg-card border-border">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4 text-foreground">Query Parameters</h2>

          {/* Location */}
          <div className="space-y-2 mb-4">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <Input
                id="location"
                placeholder="Enter address or place..."
                value={locationInput}
                onChange={(e) => {
                  setLocationInput(e.target.value)
                  setShowSuggestions(true)
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-48 overflow-auto">
                  {filteredSuggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleLocationSelect(suggestion)}
                      className="w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground text-sm"
                    >
                      {suggestion.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleUseMyLocation}
              className="w-full mt-2 bg-transparent"
            >
              📍 Use my location
            </Button>
          </div>

          {/* Lat/Lon Display */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="space-y-2">
              <Label htmlFor="lat" className="text-xs">
                Latitude
              </Label>
              <Input
                id="lat"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                disabled={!showAdvanced}
                className="text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lon" className="text-xs">
                Longitude
              </Label>
              <Input
                id="lon"
                value={lon}
                onChange={(e) => setLon(e.target.value)}
                disabled={!showAdvanced}
                className="text-sm"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs text-primary hover:underline mb-4"
          >
            {showAdvanced ? "− Hide" : "+ Show"} Advanced (manual lat/lon)
          </button>

          {/* Date */}
          <div className="space-y-2 mb-4">
            <Label htmlFor="startDate">Date</Label>
            <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={showRange}
                onChange={(e) => setShowRange(e.target.checked)}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-muted-foreground">Date range</span>
            </label>
            {showRange && (
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End date" />
            )}
          </div>

          {/* Units */}
          <div className="space-y-3 mb-4">
            <Label>Units</Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="unitsTemp" className="text-xs text-muted-foreground">
                  Temperature
                </Label>
                <select
                  id="unitsTemp"
                  value={unitsTemp}
                  onChange={(e) => setUnitsTemp(e.target.value as "C" | "F")}
                  className="w-full mt-1 px-3 py-2 bg-input border border-border rounded-md text-sm"
                >
                  <option value="C">°C</option>
                  <option value="F">°F</option>
                </select>
              </div>
              <div>
                <Label htmlFor="unitsWind" className="text-xs text-muted-foreground">
                  Wind
                </Label>
                <select
                  id="unitsWind"
                  value={unitsWind}
                  onChange={(e) => setUnitsWind(e.target.value as "MS" | "MPH")}
                  className="w-full mt-1 px-3 py-2 bg-input border border-border rounded-md text-sm"
                >
                  <option value="MS">m/s</option>
                  <option value="MPH">mph</option>
                </select>
              </div>
            </div>
          </div>

          {/* Thresholds */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowThresholds(!showThresholds)}
              className="text-sm font-medium text-foreground hover:text-primary mb-2"
            >
              {showThresholds ? "▼" : "▶"} Thresholds (Advanced)
            </button>
            {showThresholds && (
              <div className="space-y-3 pl-4 border-l-2 border-border">
                <div className="space-y-1">
                  <Label htmlFor="thresholdHot" className="text-xs">
                    Very Hot &gt;
                  </Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="thresholdHot"
                      type="number"
                      value={thresholds.hot}
                      onChange={(e) => setThresholds({ ...thresholds, hot: Number.parseFloat(e.target.value) })}
                      className="text-sm"
                    />
                    <span className="text-xs text-muted-foreground">°{unitsTemp}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="thresholdCold" className="text-xs">
                    Very Cold &lt;
                  </Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="thresholdCold"
                      type="number"
                      value={thresholds.cold}
                      onChange={(e) => setThresholds({ ...thresholds, cold: Number.parseFloat(e.target.value) })}
                      className="text-sm"
                    />
                    <span className="text-xs text-muted-foreground">°{unitsTemp}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="thresholdWindy" className="text-xs">
                    Very Windy &gt;
                  </Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="thresholdWindy"
                      type="number"
                      value={thresholds.windy}
                      onChange={(e) => setThresholds({ ...thresholds, windy: Number.parseFloat(e.target.value) })}
                      className="text-sm"
                    />
                    <span className="text-xs text-muted-foreground">{unitsWind === "MS" ? "m/s" : "mph"}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="thresholdWet" className="text-xs">
                    Very Wet &gt;
                  </Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="thresholdWet"
                      type="number"
                      value={thresholds.wet}
                      onChange={(e) => setThresholds({ ...thresholds, wet: Number.parseFloat(e.target.value) })}
                      className="text-sm"
                    />
                    <span className="text-xs text-muted-foreground">mm</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? "Assessing..." : "Run Assessment"}
          </Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>
    </Card>
  )
}
