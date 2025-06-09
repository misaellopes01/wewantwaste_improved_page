"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ArrowRight, Clock, Leaf, Recycle, Weight, Ban, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Skip } from "@/types/skip"

interface SkipCardProps {
  skip: Skip
  onSelect: (id: number) => void
  selected?: boolean
}

export function SkipCard({ skip, onSelect, selected = false }: SkipCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Calculate total price including VAT
  const totalPrice = Math.round(skip.price_before_vat * (1 + skip.vat / 100))
  const vatAmount = totalPrice - skip.price_before_vat

  // Check if skip is available
  const isAvailable = !skip.forbidden

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 cursor-pointer border-0 bg-gray-50",
        !isAvailable && "opacity-60 cursor-not-allowed",
        selected && isAvailable
          ? "border-green-500 ring-2 ring-green-200 shadow-lg "
          : isAvailable
            ? "border-0 hover:border-green-300 hover:shadow-xl"
            : "border-0 ",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => isAvailable && onSelect(skip.id)}
    >
      <CardContent className="p-0">
        <div className="relative">
          {/* Header with eco badge */}
          <div
            className={cn(
              "absolute top-0 left-0 right-0 p-4 z-10",
              isAvailable
                ? "bg-gradient-to-r from-green-600 to-emerald-600"
                : "bg-gradient-to-r from-gray-500 to-gray-600",
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                {isAvailable ? (
                  <>
                    <Recycle className="h-5 w-5" />
                    <span className="font-semibold text-sm">Eco-Friendly Disposal</span>
                  </>
                ) : (
                  <>
                    <Ban className="h-5 w-5" />
                    <span className="font-semibold text-sm">Currently Unavailable</span>
                  </>
                )}
              </div>
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-white/30 hover:bg-white/30 font-bold px-3 py-1"
              >
                {skip.size} Yards
              </Badge>
            </div>
          </div>

          {/* Image section */}
          <div className="aspect-[4/3] bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden pt-14">
            <div className="relative h-full">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt={`${skip.size} Yard Skip`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Eco overlay pattern */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/10 to-transparent" />

              {/* Road restriction warning */}
              {!skip.allowed_on_road && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-gray-800 text-yellow-500 px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-medium shadow-lg">
                    <AlertTriangle className="h-4 w-4" />
                    Private Property Only
                  </div>
                </div>
              )}

              {/* Forbidden overlay */}
              {skip.forbidden && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="bg-red-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold">
                    <Ban className="h-5 w-5" />
                    Not Available
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content section */}
          <div className="p-6 bg-gray-50">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{skip.size} Yard Skip</h3>
                <div className="flex items-center gap-2 text-green-700">
                  <Leaf className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {skip.postcode} {skip.area && `- ${skip.area}`}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  £{totalPrice}
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  Inc. £{vatAmount} VAT ({skip.vat}%)
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="text-sm">{skip.hire_period_days} day hire period</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Recycle className="h-4 w-4 text-green-600" />
                <span className="text-sm">95% waste recycled</span>
              </div>
              {skip.allows_heavy_waste && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Weight className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Heavy waste accepted</span>
                </div>
              )}
              {skip.allowed_on_road && (
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Road placement allowed</span>
                </div>
              )}
            </div>

            {/* Price breakdown */}
            <div className="mb-6 p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border border-green-200">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-gray-700">
                  <span>Base price:</span>
                  <span>£{skip.price_before_vat}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>VAT ({skip.vat}%):</span>
                  <span>£{vatAmount}</span>
                </div>
                <div className="flex justify-between font-bold text-green-800 border-t border-green-200 pt-1">
                  <span>Total:</span>
                  <span>£{totalPrice}</span>
                </div>
              </div>
            </div>

            <Button
              className={cn(
                "w-full transition-all duration-300 font-semibold py-3 rounded-xl",
                !isAvailable && "cursor-not-allowed opacity-50",
                selected && isAvailable
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                  : isAvailable
                    ? "bg-green-800 hover:bg-green-900 text-white hover:shadow-lg"
                    : "bg-gray-400 text-gray-600",
              )}
              onClick={(e) => {
                e.stopPropagation()
                if (isAvailable) {
                  onSelect(skip.id)
                }
              }}
              disabled={!isAvailable}
            >
              {!isAvailable ? (
                <>
                  <Ban className="mr-2 h-4 w-4" />
                  Not Available
                </>
              ) : selected ? (
                <>
                  <Leaf className="mr-2 h-4 w-4" />
                  Selected - Eco Choice
                </>
              ) : (
                <>
                  Choose This Skip
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
