"use client"

import type React from "react"
import { Check, MapPin, Trash2, Package, FileCheck, Calendar, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  completed: boolean
  current: boolean
}

interface StepIndicatorProps {
  currentStep: number
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps: Step[] = [
    { id: "postcode", title: "Postcode", icon: MapPin, completed: currentStep > 1, current: currentStep === 1 },
    { id: "waste-type", title: "Waste Type", icon: Trash2, completed: currentStep > 2, current: currentStep === 2 },
    { id: "select-skip", title: "Select Skip", icon: Package, completed: currentStep > 3, current: currentStep === 3 },
    {
      id: "permit-check",
      title: "Permit Check",
      icon: FileCheck,
      completed: currentStep > 4,
      current: currentStep === 4,
    },
    { id: "choose-date", title: "Choose Date", icon: Calendar, completed: currentStep > 5, current: currentStep === 5 },
    { id: "payment", title: "Payment", icon: CreditCard, completed: currentStep > 6, current: currentStep === 6 },
  ]

  return (
    <div className="w-full bg-white border-b border-green-200 px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between space-x-4">
            {steps.map((step, stepIdx) => (
              <li key={step.id} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                      step.completed
                        ? "border-green-600 bg-green-600 text-white"
                        : step.current
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-gray-300 bg-white text-gray-400",
                    )}
                  >
                    {step.completed ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                  </div>
                  <div className="ml-3">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        step.completed || step.current ? "text-gray-900" : "text-gray-500",
                      )}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>
                {stepIdx !== steps.length - 1 && (
                  <div className="flex-1 mx-4 h-0.5 bg-gray-200">
                    <div
                      className={cn(
                        "h-full bg-green-600 transition-all duration-300",
                        step.completed ? "w-full" : "w-0",
                      )}
                    />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  )
}
