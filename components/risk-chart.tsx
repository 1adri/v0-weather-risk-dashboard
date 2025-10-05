"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { RiskItem } from "@/types"

interface RiskChartProps {
  risks: RiskItem[]
}

export function RiskChart({ risks }: RiskChartProps) {
  const chartData = risks.map((risk) => ({
    name: risk.label,
    probability: risk.probability * 100,
  }))

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Risk Probability by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--color-border))" />
          <XAxis
            dataKey="name"
            stroke="rgb(var(--color-muted-foreground))"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke="rgb(var(--color-muted-foreground))"
            fontSize={12}
            label={{
              value: "Probability (%)",
              angle: -90,
              position: "insideLeft",
              style: { fill: "rgb(var(--color-muted-foreground))" },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(var(--color-popover))",
              border: "1px solid rgb(var(--color-border))",
              borderRadius: "0.5rem",
              color: "rgb(var(--color-foreground))",
            }}
            formatter={(value: number) => [`${value.toFixed(1)}%`, "Probability"]}
          />
          <Bar dataKey="probability" fill="rgb(var(--color-chart-1))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
