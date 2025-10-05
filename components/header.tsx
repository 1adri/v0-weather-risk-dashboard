"use client"

import { ThemeToggle } from "./theme-toggle"

interface HeaderProps {
  mockMode: boolean
  onMockModeChange: (enabled: boolean) => void
}

export function Header({ mockMode, onMockModeChange }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground text-balance">Weather Risk Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              NASA Space Apps Challenge • Extreme Weather Probability Assessment
            </p>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={mockMode}
                onChange={(e) => onMockModeChange(e.target.checked)}
                className="w-4 h-4 rounded border-border bg-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              />
              <span className="text-muted-foreground">Mock Mode</span>
            </label>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
