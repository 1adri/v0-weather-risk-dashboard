import { type NextRequest, NextResponse } from "next/server"
import type { ApiResponse } from "@/types"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const lat = Number.parseFloat(searchParams.get("lat") || "0")
  const lon = Number.parseFloat(searchParams.get("lon") || "0")
  const startDate = searchParams.get("startDate") || new Date().toISOString().split("T")[0]
  const endDate = searchParams.get("endDate") || startDate
  const unitsTemp = (searchParams.get("unitsTemp") || "F") as "C" | "F"
  const unitsWind = (searchParams.get("unitsWind") || "MPH") as "MS" | "MPH"

  // TODO: Implement real data fetching from Earth observation datasets
  // This would involve:
  // 1. Fetching historical climate data for the location
  // 2. Computing probabilities based on threshold exceedance
  // 3. Calculating heat index, wind chill, etc.
  // 4. Determining confidence levels based on data quality

  // Mock response for now
  const mockResponse: ApiResponse = {
    meta: {
      locationName: `Location at ${lat.toFixed(2)}, ${lon.toFixed(2)}`,
      lat,
      lon,
      startDate,
      endDate,
      units: {
        temp: unitsTemp,
        wind: unitsWind,
      },
    },
    risks: [
      { type: "very_hot", label: "Very Hot", probability: Math.random() * 0.5, confidence: "medium" },
      { type: "very_cold", label: "Very Cold", probability: Math.random() * 0.3, confidence: "high" },
      { type: "very_windy", label: "Very Windy", probability: Math.random() * 0.4, confidence: "low" },
      { type: "very_wet", label: "Very Wet", probability: Math.random() * 0.3, confidence: "medium" },
      {
        type: "very_uncomfortable",
        label: "Very Uncomfortable",
        probability: Math.random() * 0.5,
        confidence: "medium",
      },
    ],
    drivers: [
      {
        name: "Max Temp",
        value: unitsTemp === "F" ? 85 + Math.random() * 20 : 29 + Math.random() * 11,
        unit: `°${unitsTemp}`,
      },
      {
        name: "Min Temp",
        value: unitsTemp === "F" ? 50 + Math.random() * 20 : 10 + Math.random() * 11,
        unit: `°${unitsTemp}`,
      },
      {
        name: "Mean Wind",
        value: unitsWind === "MPH" ? 8 + Math.random() * 10 : 3.6 + Math.random() * 4.5,
        unit: unitsWind === "MPH" ? "MPH" : "m/s",
      },
      {
        name: "Gusts",
        value: unitsWind === "MPH" ? 20 + Math.random() * 15 : 8.9 + Math.random() * 6.7,
        unit: unitsWind === "MPH" ? "MPH" : "m/s",
      },
      { name: "Daily Precip", value: Math.random() * 0.5, unit: unitsTemp === "F" ? "in" : "mm" },
      {
        name: "Heat Index",
        value: unitsTemp === "F" ? 90 + Math.random() * 15 : 32 + Math.random() * 8,
        unit: `°${unitsTemp}`,
      },
      { name: "RH", value: 40 + Math.random() * 40, unit: "%" },
    ],
    explanation:
      "Probabilities are derived from historical and/or Earth observation data for the selected date window.",
    disclaimer: "Prototype for Space Apps; not for operational forecasting.",
  }

  return NextResponse.json(mockResponse)
}
