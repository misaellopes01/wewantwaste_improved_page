"use client"

import { StepIndicator } from "@/components/step-indicator"
import { SkipSelection } from "@/components/skip-selection"

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <StepIndicator currentStep={3} />
      <SkipSelection />
    </div>
  )
}
