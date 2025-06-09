"use client"

import type React from "react"
import { useState } from "react"
import { Check, MapPin, Trash2, Package, FileCheck, Calendar, CreditCard, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

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
  const [isOpen, setIsOpen] = useState(false)

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

  const currentStepData = steps.find((step) => step.current)
  const completedSteps = steps.filter((step) => step.completed).length

  return (
    <>
      {/* Desktop Version - Hidden on mobile */}
      <div className="hidden lg:block w-full bg-gradient-to-r from-white to-green-50/30 border-b border-green-200/50 px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <nav aria-label="Progress">
            <ol className="flex items-center justify-between">
              {steps.map((step, stepIdx) => (
                <li key={step.id} className="relative flex-1">
                  <div className="flex items-center">
                    <div className="relative flex items-center justify-center">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300",
                          step.completed
                            ? "border-green-600 bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                            : step.current
                              ? "border-green-500 bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                              : "border-gray-300 bg-white text-gray-400 hover:border-green-300",
                        )}
                      >
                        {step.completed ? <Check className="h-6 w-6" /> : <step.icon className="h-6 w-6" />}
                      </div>
                    </div>
                    <div className="ml-4 min-w-0 flex-1">
                      <p
                        className={cn(
                          "text-sm font-semibold transition-colors",
                          step.completed || step.current ? "text-gray-800" : "text-gray-500",
                        )}
                      >
                        {step.title}
                      </p>
                    </div>
                    {stepIdx !== steps.length - 1 && (
                      <div className="absolute top-6 left-12 w-full h-1 bg-gray-200 rounded-full">
                        <div
                          className={cn(
                            "h-full bg-gradient-to-r from-green-600 to-emerald-600 rounded-full transition-all duration-500",
                            step.completed ? "w-full" : "w-0",
                          )}
                        />
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {/* Tablet Version - Hidden on mobile and desktop */}
      <div className="hidden md:block lg:hidden w-full bg-gradient-to-r from-white to-green-50/30 border-b border-green-200/50 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <nav aria-label="Progress">
            <ol className="grid grid-cols-3 gap-4">
              {steps.map((step, stepIdx) => (
                <li key={step.id} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 mb-2",
                        step.completed
                          ? "border-green-600 bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                          : step.current
                            ? "border-green-500 bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                            : "border-gray-300 bg-white text-gray-400",
                      )}
                    >
                      {step.completed ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                    </div>
                    <p
                      className={cn(
                        "text-xs font-medium transition-colors",
                        step.completed || step.current ? "text-gray-800" : "text-gray-500",
                      )}
                    >
                      {step.title}
                    </p>
                  </div>
                  {stepIdx < steps.length - 1 && stepIdx % 3 === 2 && (
                    <div className="absolute top-8 left-full w-4 h-0.5 bg-gray-200">
                      <div
                        className={cn(
                          "h-full bg-gradient-to-r from-green-600 to-emerald-600 transition-all duration-500",
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

      {/* Mobile Version - Collapsible */}
      <div className="block md:hidden w-full bg-gradient-to-r from-white to-green-50/30 border-b border-green-200/50">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          {/* Current Step Display */}
          <div className="px-4 py-4">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-between p-0 h-auto hover:bg-transparent"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2",
                      currentStepData?.completed
                        ? "border-green-600 bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                        : currentStepData?.current
                          ? "border-green-500 bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                          : "border-gray-300 bg-white text-gray-400",
                    )}
                  >
                    {currentStepData?.completed ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      currentStepData && <currentStepData.icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">
                      Step {currentStep} of {steps.length}
                    </p>
                    <p className="text-xs text-gray-600">{currentStepData?.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-gray-500">
                    {completedSteps}/{steps.length} completed
                  </div>
                  <ChevronDown
                    className={cn("h-4 w-4 text-gray-500 transition-transform duration-200", isOpen && "rotate-180")}
                  />
                </div>
              </Button>
            </CollapsibleTrigger>

            {/* Progress Bar */}
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedSteps / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Expanded Steps List */}
          <CollapsibleContent className="px-4 pb-4">
            <div className="space-y-3 pt-2 border-t border-green-200/50">
              {steps.map((step, stepIdx) => (
                <div key={step.id} className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300",
                      step.completed
                        ? "border-green-600 bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                        : step.current
                          ? "border-green-500 bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          : "border-gray-300 bg-white text-gray-400",
                    )}
                  >
                    {step.completed ? <Check className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p
                      className={cn(
                        "text-sm font-medium transition-colors",
                        step.completed || step.current ? "text-gray-800" : "text-gray-500",
                      )}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {step.completed ? "Completed" : step.current ? "Current step" : "Pending"}
                    </p>
                  </div>
                  {step.completed && <Check className="h-4 w-4 text-green-600" />}
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  )
}
